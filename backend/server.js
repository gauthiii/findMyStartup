import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { runGeminiAgent } from './gemini.js'; // ✅ Gemini stays as-is
import {
  runAzureIdeaParser,
  runAzureRiskAnalysis,
  runAzureTechStack,
  runAzureGTMPlan,
  runAzureRAG,
  runAzureFundingStrategy,
  runAzureRegulatoryScan // ← ✅ Add this line
} from './azure.js'; // ✅ Azure split per agent

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

// 🔹 Shared Gemini Agent Endpoint
app.post('/api/agent', async (req, res) => {
  const { agentType, input } = req.body;
  const model = req.query.model || 'gemini';

  if (!agentType || !input) {
    return res.status(400).json({ error: 'agentType and input are required' });
  }

  try {
    const raw = await runGeminiAgent(agentType, input);
    const cleaned = cleanJSON(raw);
    const parsed = JSON.parse(cleaned);
    res.json({ agentType, result: parsed });
  } catch (err) {
    console.error('Gemini Agent Error:', err.message);
    res.status(500).json({ error: 'Failed to generate output from Gemini agent.' });
  }
});

// 🔹 Azure-Specific Routes (clean + REST-style)
app.post('/api/azure/idea', async (req, res) => {
  try {
    const raw = await runAzureIdeaParser(req.body.input);
    res.json(JSON.parse(cleanJSON(raw)));
  } catch (err) {
    console.error('Azure Idea Error:', err.message);
    res.status(500).json({ error: 'Failed to parse idea via Azure.' });
  }
});

app.post('/api/azure/risk', async (req, res) => {
    try {
      const raw = await runAzureRiskAnalysis(req.body.input);
      res.json(JSON.parse(cleanJSON(raw)));
    } catch (err) {
      console.error('Azure Risk Agent Error:', err.message);
      res.status(500).json({ error: 'Failed to assess risk via Azure.' });
    }
  });
  

app.post('/api/azure/tech', async (req, res) => {
  try {
    const raw = await runAzureTechStack(req.body.input);
    res.json(JSON.parse(cleanJSON(raw)));
  } catch (err) {
    console.error('Azure Tech Stack Error:', err.message);
    res.status(500).json({ error: 'Failed to suggest tech stack via Azure.' });
  }
});

app.post('/api/azure/market', async (req, res) => {
  try {
    const raw = await runAzureGTMPlan(req.body.input);
    res.json(JSON.parse(cleanJSON(raw)));
  } catch (err) {
    console.error('Azure GTM Error:', err.message);
    res.status(500).json({ error: 'Failed to generate GTM plan via Azure.' });
  }
});

app.post('/api/azure/casestudy', async (req, res) => {
  try {
    const raw = await runAzureRAG(req.body.input);
    res.json(JSON.parse(cleanJSON(raw)));
  } catch (err) {
    console.error('Azure Case Study Error:', err.message);
    res.status(500).json({ error: 'Failed to get case studies via Azure.' });
  }
});


app.post('/api/azure/funding', async (req, res) => {
    try {
      const raw = await runAzureFundingStrategy(req.body.input);
      res.json(JSON.parse(cleanJSON(raw)));
    } catch (err) {
      console.error('Azure Funding Strategy Error:', err.message);
      res.status(500).json({ error: 'Failed to generate funding strategy via Azure.' });
    }
  });

  app.post('/api/azure/regulatory', async (req, res) => {
    try {
      const raw = await runAzureRegulatoryScan(req.body.input);
      res.json(JSON.parse(cleanJSON(raw)));
    } catch (err) {
      console.error('Azure Regulatory Scan Error:', err.message);
      res.status(500).json({ error: 'Failed to perform regulatory scan via Azure.' });
    }
  });
  

app.listen(port, () => {
  console.log(`🚀 Startup Copilot running at http://localhost:${port}`);
});
