#project-root/backend/app/models.py

from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from datetime import datetime
from .database import Base

class Agent(Base):
    __tablename__ = "agents"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    system_prompt = Column(Text, nullable=False)
    model =   Column(String(50), nullable=False, default="gpt-3.5-turbo")
    created_at = Column(DateTime, default=datetime.utcnow)

class Flow(Base):
    __tablename__ = "flows"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    # definición: lista de pasos [{ "agent_id": 1 }, { "agent_id": 2 }, …]
    definition = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class FlowRun(Base):
    __tablename__ = "flow_runs"
    id = Column(Integer, primary_key=True, index=True)
    flow_id = Column(Integer, nullable=False)
    input_prompt = Column(Text, nullable=False)
    output = Column(JSON, nullable=False)
    run_at = Column(DateTime, default=datetime.utcnow)
