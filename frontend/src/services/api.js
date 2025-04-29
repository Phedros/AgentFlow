// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchAgents = () => api.get('/agents');
export const createAgent = data => api.post('/agents', data);

export const fetchFlows = () => api.get('/flows');
export const createFlow = data => api.post('/flows', data);
export const runFlow = (id, input) => api.post(`/flows/${id}/run`, { input_prompt: input });

export default api;