// backend/azure.js
import 'dotenv/config';
const axios = (await import('axios')).default;

const AZURE_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

const promptMap = {
  idea_parser: (idea) => `
You are a startup strategist. Break down the idea "${idea}" into:
- coreProblem
- targetUser
- painPoints

Respond strictly in clean JSON format like:
{
  "coreProblem": "...",
  "targetUser": "...",
  "painPoints": ["...", "..."]
}
No explanations or markdown.
`,
  tech_stack: (idea) => `
You are a startup tech advisor. Recommend a tech stack for "${idea}" with:
- frontend
- backend
- database
- optionalTools (e.g. Azure, APIs)

Respond in JSON:
{
  "frontend": "...",
  "backend": "...",
  "database": "...",
  "optionalTools": ["...", "..."]
}
`,
  gtm_plan: (idea) => `
You are a growth expert. Provide a go-to-market plan for "${idea}" with:
- earlyAdopters
- distributionChannels
- growthTactics

Respond in raw JSON format like:
{
  "earlyAdopters": "...",
  "distributionChannels": ["...", "..."],
  "growthTactics": ["...", "..."]
}
`,
  rag_case_study: (idea) => `
You are a research agent. Pull startup launch patterns similar to "${idea}" from YC or TechCrunch examples. Include:
- similarStartups
- theirStrategy
- keyLearnings

Respond in JSON format like:
{
  "similarStartups": ["...", "..."],
  "theirStrategy": "...",
  "keyLearnings": ["...", "..."]
}
`
};

export async function runAzureAgent(agentType, idea) {
  if (!promptMap[agentType]) throw new Error('Invalid agent type');

  const prompt = promptMap[agentType](idea);

  try {
    const response = await axios.post(
      `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=2025-01-01-preview`,
      {
        messages: [
          { role: 'system', content: 'You are a helpful startup planning assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_API_KEY
        }
      }
    );

    return response.data?.choices?.[0]?.message?.content || '{}';
  } catch (err) {
    console.error('Azure API Error:', err?.response?.data || err.message);
    throw err;
  }
}
