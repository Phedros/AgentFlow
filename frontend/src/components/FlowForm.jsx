// src/components/FlowForm.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function FlowForm({ agents, onSubmit }) {
  const [name, setName] = useState('');
  const [available, setAvailable] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setAvailable(agents);
    setSteps([]);
  }, [agents]);

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return;

    // De available → steps
    if (source.droppableId === 'available' && destination.droppableId === 'steps') {
      const moved = available[source.index];
      setAvailable(a => a.filter((_, i) => i !== source.index));
      setSteps(s => {
        const copy = Array.from(s);
        copy.splice(destination.index, 0, moved);
        return copy;
      });

    // Reordenar dentro de steps
    } else if (source.droppableId === 'steps' && destination.droppableId === 'steps') {
      const copy = Array.from(steps);
      const [moved] = copy.splice(source.index, 1);
      copy.splice(destination.index, 0, moved);
      setSteps(copy);

    // De steps → available
    } else if (source.droppableId === 'steps' && destination.droppableId === 'available') {
      const moved = steps[source.index];
      setSteps(s => s.filter((_, i) => i !== source.index));
      setAvailable(a => {
        const copy = Array.from(a);
        copy.splice(destination.index, 0, moved);
        return copy;
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      name,
      definition: steps.map(agent => ({ agent_id: agent.id }))
    });
    setName('');
    setSteps([]);
    setAvailable(agents);
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-800">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Crear Flujo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre del flujo */}
          <div>
            <Label htmlFor="flow-name">Nombre del flujo</Label>
            <Input
              id="flow-name"
              name="name"
              placeholder="Escribe el nombre del flujo"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Instrucciones */}
          <Label>Arrastra agentes de «Disponibles» a «Pasos»</Label>

          {/* Drag & Drop */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4">
              {/* Disponibles */}
              <Droppable droppableId="available">
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-1/2 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 min-h-[200px]"
                    aria-label="Agentes disponibles"
                  >
                    <h4 id="available-heading" className="font-semibold mb-2">Disponibles</h4>
                    {available.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No hay agentes disponibles</p>
                    )}
                    {available.map((agent, index) => (
                      <Draggable key={agent.id} draggableId={`avail-${agent.id}`} index={index}>
                        {prov => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            className="p-2 mb-2 bg-white dark:bg-gray-800 border rounded-lg cursor-move shadow-sm"
                          >
                            {agent.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Pasos */}
              <Droppable droppableId="steps">
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-1/2 p-2 border rounded-lg bg-blue-50 dark:bg-blue-900 min-h-[200px]"
                    aria-label="Pasos del flujo"
                  >
                    <h4 id="steps-heading" className="font-semibold mb-2">Pasos</h4>
                    {steps.length === 0 && (
                      <p className="text-sm text-gray-500 italic">Arrastra aquí</p>
                    )}
                    {steps.map((agent, index) => (
                      <Draggable key={agent.id} draggableId={`step-${agent.id}`} index={index}>
                        {prov => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            className="p-2 mb-2 bg-white dark:bg-gray-800 border rounded-lg cursor-move shadow-sm"
                          >
                            {agent.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>

          <Button
            type="submit"
            disabled={steps.length === 0}
            className="w-full"
          >
            Crear Flujo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
