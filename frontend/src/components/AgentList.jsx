// src/components/AgentList.jsx
import { Card, CardContent } from "./ui/card";

export function AgentList({ agents }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {agents.map(a => (
        <Card key={a.id} className="p-4">
          <CardContent>
            <h3 className="text-xl font-semibold">{a.name}</h3>
            <p className="text-sm">{a.model}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}