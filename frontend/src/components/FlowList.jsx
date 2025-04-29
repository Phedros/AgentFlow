// src/components/FlowList.jsx
import { Card, CardContent } from '../components/ui/card';
import { Button } from "../components/ui/button";
import React from 'react';

export function FlowList({ flows, onRun }) {
  return (
    <div className="space-y-4">
      {flows.map(f => (
        <Card key={f.id} className="p-4">
          <CardContent>
            <h3 className="text-xl font-semibold">{f.name}</h3>
            <p className="text-sm">Pasos: {f.definition.length}</p>
            <Button onClick={() => onRun(f)} className="mt-2">Ejecutar</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}