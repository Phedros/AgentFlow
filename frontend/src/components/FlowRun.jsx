// src/components/FlowRun.jsx
import React from 'react';

export function FlowRun({ history }) {
  return (
    <div className="space-y-2">
      {history.map((h, idx) => (
        <div key={idx} className="p-2 bg-gray-50 rounded">
          <strong>Agente {h.agent_id}:</strong> {h.response}
        </div>
      ))}
    </div>
  );
}