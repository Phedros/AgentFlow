// src/pages/Flows.jsx
import { useEffect, useState } from 'react';
import { fetchAgents, fetchFlows, createFlow, runFlow } from '../services/api';
import { FlowForm } from '../components/FlowForm';
import { FlowList } from '../components/FlowList';
import { FlowRun } from '../components/FlowRun';
import { Input } from "../components/ui/input";

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
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Crear Flujo</h2>
        <FlowForm agents={agents} onSubmit={handleCreateFlow} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Flujos</h2>
        <div className="mb-4">
          <Input
            label="Prompt de entrada"
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
          />
        </div>
        <FlowList flows={flows} onRun={handleRunFlow} />
      </section>

      {history.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
          <FlowRun history={history} />
        </section>
      )}
    </div>
  );
}