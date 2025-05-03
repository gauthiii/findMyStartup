import 'dotenv/config';
const axios = (await import('axios')).default;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const promptMap = {
  idea_parser: (idea) => `
You are a startup idea review agent with a personality. Your job is to break down the user's startup idea, extract the core problem, identify the target users, list their pain points, and assess if the idea already exists in the market.

Be analytical but also witty. For the "review" section, write a longer, insightful summary with a touch of Deadpool-style humor — think smart, playful, and real — but stay respectful and avoid rudeness or profanity. Use pop culture references *only* if relevant, and stay on-topic.

Also suggest improvements to the idea and alternatives if it's too generic.

Startup Idea: "${idea}"

Respond strictly in this JSON format:
{
  "coreProblem": "...",
  "targetUser": "...",
  "painPoints": ["..."],
  "review": "...",
  "existingAlternatives": "...",
  "suggestedImprovements": "..."
}
  `.trim(),

  tech_stack: (idea) => `
You are a startup tech advisor. Recommend a tech stack for the startup idea below, keeping in mind practicality, scalability, and simplicity for early-stage development.

Startup Idea: "${idea}"

Respond strictly in JSON:
{
  "frontend": "...",
  "backend": "...",
  "database": "...",
  "optionalTools": ["...", "..."]
}
Only JSON. No explanation.
  `.trim(),

  gtm_plan: (idea) => `
You are a go-to-market strategist for early-stage startups.

Given the startup idea below, generate a lean but complete Go-To-Market (GTM) plan. Focus on clarity, brevity, and founder-actionability. Think like a YC-backed founder — no fluff, no filler. Just the strategy.

Startup Idea: "${idea}"

Your response must include the following 8 sections inside a single JSON object:
{
  "targetCustomerPersona": "...",
  "marketLandscape": "...",
  "valueProposition": "...",
  "salesChannels": ["...", "..."],
  "pricingStrategy": "...",
  "distributionModel": "...",
  "customerSupport": "...",
  "launchTimeline": ["...", "...", "..."]
}
Only valid JSON.
  `.trim(),

  rag_case_study: (idea) => `
You are a Case Study Agent that performs deep domain research to help startup founders understand the landscape they are entering.

Given the startup idea: "${idea}", perform the following tasks:

1. Retrieve or reason about 5 similar real-world startups in the same category or problem space. For each, include:
   - Name
   - Summary
   - Funding stage or outcome (e.g., Success, Failure, Pivot)
   - Key lessons from their trajectory

2. Identify and summarize relevant case studies, whitepapers, or academic research:
   - Highlight core findings (e.g., success rates, technical viability, adoption challenges)
   - Clearly link these insights back to the startup idea

3. Evaluate the competitive landscape:
   - Major players and their strategies
   - Gaps or underserved areas
   - Dominant incumbents (if any)

4. Assess market saturation:
   - Categorize as High, Medium, or Low
   - Justify with number of startups, funding trends, and outcome patterns

5. Provide a conclusion:
   - Is this a promising opportunity space?
   - What niche or angle looks most viable?
   - What barriers to entry or resource demands should be expected?

Avoid hallucination. Use known examples, trends, or real sources where possible. If data is unclear, explicitly say so.

Return strictly in the following JSON format:
{
  "similarStartups": [
    {
      "name": "...",
      "summary": "...",
      "outcome": "...",
      "keyLesson": "..."
    }
  ],
  "researchInsights": [
    {
      "source": "...",
      "finding": "...",
      "relevance": "..."
    }
  ],
  "competitionSummary": {
    "majorPlayers": ["...", "..."],
    "marketGaps": "...",
    "dominantIncumbents": "..."
  },
  "saturationLevel": "High | Medium | Low",
  "conclusion": {
    "isPromising": true,
    "viableAngle": "...",
    "barriersToEntry": "..."
  }
}
  `.trim()
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
