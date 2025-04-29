#project-root/backend/app/main.py

import os
from openai import OpenAI
from fastapi import FastAPI, Depends, HTTPException, Path, Body
from sqlalchemy.orm import Session
from . import database, models, schemas, crud
from .schemas import FlowCreate, FlowRead, FlowRunRead
from .crud import create_flow, get_flows, get_flow
from .models import FlowRun
import json
from fastapi.middleware.cors import CORSMiddleware


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Crear todas las tablas
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="MultiAgent Manager")

# Configurar CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # puede ser ["*"] si querés permitir todo (no recomendado en producción)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para obtener sesión
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/agents", response_model=schemas.AgentRead, status_code=201)
def create_agent(agent_in: schemas.AgentCreate, db: Session = Depends(get_db)):
    # Podrías validar duplicados si hace falta
    return crud.create_agent(db, agent_in)

@app.get("/agents", response_model=list[schemas.AgentRead])
def list_agents(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return crud.get_agents(db, skip, limit)

@app.post("/flows", response_model=FlowRead, status_code=201)
def create_flow_endpoint(flow_in: FlowCreate, db: Session = Depends(get_db)):
    return create_flow(db, flow_in)

@app.get("/flows", response_model=list[FlowRead])
def list_flows(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return get_flows(db, skip, limit)

@app.post("/flows/{flow_id}/run", response_model=FlowRunRead)
def run_flow(
    flow_id: int = Path(..., gt=0),
    payload: dict = Body(...),  # espera {"input_prompt": "…"}
    db: Session = Depends(get_db)
):
    flow = get_flow(db, flow_id)
    if not flow:
        raise HTTPException(404, "Flujo no encontrado")

    prompt = payload.get("input_prompt", "")
    history = []
    current_input = prompt

    for step in flow.definition:
        agent = db.query(models.Agent).get(step["agent_id"])
        if not agent:
            raise HTTPException(404, f"Agente {step['agent_id']} no existe")

        # Llamada a OpenAI
        resp = client.chat.completions.create(
            model=agent.model,
            messages=[
                {"role": "system", "content": agent.system_prompt},
                {"role": "user", "content": current_input}
            ]
        )
        text = resp.choices[0].message.content
        history.append({"agent_id": agent.id, "response": text})
        current_input = text

    # Guardar run
    db_run = FlowRun(
        flow_id=flow.id,
        input_prompt=prompt,
        output=history
    )
    db.add(db_run)
    db.commit()
    db.refresh(db_run)
    return db_run