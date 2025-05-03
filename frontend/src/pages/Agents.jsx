// src/pages/Agents.jsx
import { useEffect, useState } from 'react';
import { fetchAgents, createAgent } from '../services/api';
import { AgentForm } from '../components/AgentForm';
import { AgentList } from '../components/AgentList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Named and default export to match imports in App.jsx
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
    <div className="container mx-auto p-4 space-y-8">
      {/* Formulario de creación de agentes */}
      <Card>
        <CardHeader>
          <CardTitle>Crear Agente</CardTitle>
        </CardHeader>
        <CardContent>
          <AgentForm onSubmit={handleCreate} />
        </CardContent>
      </Card>

      {/* Lista de agentes existentes */}
      <Card>
        <CardHeader>
          <CardTitle>Agentes</CardTitle>
        </CardHeader>
        <CardContent>
          <AgentList agents={agents} />
        </CardContent>
      </Card>
    </div>
  );
}

