import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { runGeminiAgent } from './gemini.js';
import { runAzureAgent } from './azure.js';

dotenv.config();

const app = express();
const port = 3010;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

function cleanJSON(text) {
  return text.replace(/```json|```/g, '').trim();
}

app.post('/api/agent', async (req, res) => {
  const { agentType, input } = req.body;
  const model = req.query.model || 'gemini';

  if (!agentType || !input) {
    return res.status(400).json({ error: 'agentType and input are required' });
  }

  try {
    const raw =
      model === 'azure'
        ? await runAzureAgent(agentType, input)
        : await runGeminiAgent(agentType, input);

    const cleaned = cleanJSON(raw);
    const parsed = JSON.parse(cleaned);
    res.json({ agentType, result: parsed });
  } catch (err) {
    console.error('Agent Error:', err.message);
    res.status(500).json({ error: `Failed to generate output from ${model} agent.` });
  }
});

app.listen(port, () => {
  console.log(`🚀 Startup Copilot running at http://localhost:${port}`);
});
