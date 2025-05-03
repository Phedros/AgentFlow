// src/components/AgentForm.jsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

export function AgentForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, system_prompt: prompt, model });
    setName('');
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre del agente */}
      <div>
        <Label htmlFor="agent-name">Nombre del agente</Label>
        <Input
          id="agent-name"
          name="name"
          placeholder="Escribe el nombre del agente"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      {/* System Prompt */}
      <div>
        <Label htmlFor="system-prompt">System Prompt</Label>
        <Textarea
          id="system-prompt"
          name="system_prompt"
          placeholder="Describe brevemente el system prompt"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
        />
      </div>

      {/* Modelo */}
      <div>
        <Label htmlFor="model">Modelo</Label>
        <Input
          id="model"
          name="model"
          placeholder="gpt-3.5-turbo"
          value={model}
          onChange={e => setModel(e.target.value)}
        />
      </div>

      <Button type="submit">Crear Agente</Button>
    </form>
  );
}
