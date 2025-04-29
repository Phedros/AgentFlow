// src/pages/Agents.jsx
import { useEffect, useState } from 'react';
import { fetchAgents, createAgent } from '../services/api';
import { AgentForm } from '../components/AgentForm';
import { AgentList } from '../components/AgentList';

export function Agents() {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    fetchAgents().then(res => setAgents(res.data));
  }, []);

  const handleCreate = async (data) => {
    const res = await createAgent(data);
    setAgents(prev => [...prev, res.data]);
  };

  return (
    <div className="space-y-6">
      <AgentForm onSubmit={handleCreate} />
      <AgentList agents={agents} />
    </div>
  );
}