#project-root/backend/app/schemas.py

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AgentCreate(BaseModel):
    name: str
    system_prompt: str
    model: Optional[str] = "gpt-3.5-turbo"

class AgentRead(AgentCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class FlowStep(BaseModel):
    agent_id: int

class FlowCreate(BaseModel):
    name: str
    definition: List[FlowStep]

class FlowRead(FlowCreate):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class FlowRunRead(BaseModel):
    id: int
    flow_id: int
    input_prompt: str
    output: List[dict]  # cada elemento: { agent_id, response }
    run_at: datetime
    class Config:
        orm_mode = True