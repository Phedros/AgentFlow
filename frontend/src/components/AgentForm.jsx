// src/components/AgentForm.jsx
import { useState } from 'react';
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Nombre" value={name} onChange={e => setName(e.target.value)} required />
      <Textarea label="System Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} required />
      <Input label="Modelo" value={model} onChange={e => setModel(e.target.value)} />
      <Button type="submit">Crear Agente</Button>
    </form>
  );
}