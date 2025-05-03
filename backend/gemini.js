import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const axios = (await import('axios')).default;

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
Do not add explanations or markdown.
  `,
  tech_stack: (idea) => `
You are a startup tech advisor. Recommend a tech stack for "${idea}" with:
- frontend
- backend
- database
- optionalTools (e.g. Azure, APIs)

Output in clean JSON format like:
{
  "frontend": "...",
  "backend": "...",
  "database": "...",
  "optionalTools": ["...", "..."]
}
Only output raw JSON. No comments or markdown.
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
No explanations or markdown.
  `,
  rag_case_study: (idea) => `
You are a research agent. Pull startup launch patterns similar to "${idea}" from YC or TechCrunch examples. Include:
- similarStartups
- theirStrategy
- keyLearnings

Format strictly in JSON like:
{
  "similarStartups": ["...", "..."],
  "theirStrategy": "...",
  "keyLearnings": ["...", "..."]
}
No markdown. Only raw JSON.
  `
};

export async function runGeminiAgent(agentType, idea) {
  if (!promptMap[agentType]) throw new Error('Invalid agent type');

  const prompt = promptMap[agentType](idea);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  } catch (err) {
    console.error('Gemini API Error:', err?.response?.data || err.message);
    throw err;
  }
}
