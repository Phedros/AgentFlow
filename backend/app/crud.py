#project-root/backend/app/crud.py

from sqlalchemy.orm import Session
from . import models, schemas

def create_agent(db: Session, agent_in: schemas.AgentCreate) -> models.Agent:
    db_agent = models.Agent(
        name=agent_in.name,
        system_prompt=agent_in.system_prompt,
        model=agent_in.model,
    )
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

def get_agents(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Agent).offset(skip).limit(limit).all()


def create_flow(db: Session, flow_in: schemas.FlowCreate) -> models.Flow:
    db_flow = models.Flow(
        name=flow_in.name,
        definition=[step.dict() for step in flow_in.definition]
    )
    db.add(db_flow)
    db.commit()
    db.refresh(db_flow)
    return db_flow

def get_flows(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Flow).offset(skip).limit(limit).all()

def get_flow(db: Session, flow_id: int):
    return db.query(models.Flow).filter(models.Flow.id == flow_id).first()