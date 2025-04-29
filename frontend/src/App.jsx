// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Agents } from './pages/Agents';
import { Flows } from './pages/Flows';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/agents" className="font-medium">Agentes</Link>
        <Link to="/flows" className="font-medium">Flujos</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/agents" element={<Agents />} />
          <Route path="/flows" element={<Flows />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}