// src/pages/Flows.jsx
import { useEffect, useState } from 'react';
import { fetchAgents, fetchFlows, createFlow, runFlow } from '../services/api';
import { FlowForm } from '../components/FlowForm';
import { FlowList } from '../components/FlowList';
import { FlowRun } from '../components/FlowRun';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function Flows() {
  const [agents, setAgents] = useState([]);
  const [flows, setFlows] = useState([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchAgents().then(res => setAgents(res.data));
    fetchFlows().then(res => setFlows(res.data));
  }, []);

  const handleCreateFlow = async (data) => {
    const res = await createFlow(data);
    setFlows(prev => [...prev, res.data]);
  };

  const handleRunFlow = async (flow) => {
    if (!inputPrompt) return;
    const res = await runFlow(flow.id, inputPrompt);
    setHistory(res.data.output);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Crear Flujo */}
      <Card>
        <CardHeader>
          <CardTitle>Crear Flujo</CardTitle>
        </CardHeader>
        <CardContent>
          <FlowForm agents={agents} onSubmit={handleCreateFlow} />
        </CardContent>
      </Card>

      {/* Lista de Flujos */}
      <Card>
        <CardHeader>
          <CardTitle>Flujos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Prompt de entrada"
            placeholder="Escribe tu prompt..."
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
          />
          <FlowList flows={flows} onRun={handleRunFlow} />
        </CardContent>
      </Card>

      {/* Resultados: ocupa full width en pantallas grandes */}
      {history.length > 0 && (
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <FlowRun history={history} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
