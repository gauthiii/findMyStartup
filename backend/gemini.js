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
  `.trim(),

  funding_strategy: (idea) => `
You are a funding advisor for early-stage founders.

Given the startup idea: "${idea}", create a funding strategy that includes:

1. Top 3–5 recommended funding sources (grants, accelerators, angels, crowdfunding, etc.)
2. For each source:
   - Funding range
   - Why it's a good fit
   - How to apply or pitch
3. Networking Advice:
   - Where to find investors (e.g., LinkedIn, communities, demo days)
   - 3 cold DM or email opener templates
   - Tips on preparing a 5-slide pitch deck
4. Checklist: “What you need to raise $25k–100k in the next 30 days”

Return only in JSON format like:
{
  "recommendedSources": [
    {
      "name": "...",
      "fundingRange": "...",
      "fit": "...",
      "howToApply": "..."
    }
  ],
  "networkingTips": {
    "investorPlaces": ["...", "..."],
    "dmTemplates": ["...", "...", "..."],
    "pitchDeckAdvice": "..."
  },
  "fundraisingChecklist": ["...", "..."]
}
  `.trim(),

  regulatory_scan: (category) => `
You are a compliance advisor for new startups.

Given the startup category: "${category}", perform a regulatory scan covering:

1. List of applicable regulations (e.g., GDPR, HIPAA, FERPA, SEC)
2. A brief compliance checklist for each
3. Common pitfalls startups face in this category
4. Suggested tools, templates, or design practices to maintain compliance (e.g., SOC2, privacy-first, DPA tools)
5. If applicable, link or cite any government or legal documents

Keep tone professional and founder-friendly. Output should strictly follow this JSON format:
{
  "regulations": [
    {
      "name": "...",
      "checklist": ["...", "..."]
    }
  ],
  "commonPitfalls": ["...", "..."],
  "suggestedPractices": ["...", "..."],
  "referenceLinks": ["...", "..."]
}
  `.trim(),

    // ✅ Add risk_analysis
    risk_analysis: (idea) => `
    You are a risk agent that reviews startup ideas and assesses the risk metric of the idea presented.
    
    Thoroughly analyze the risk factor for the startup idea below based on the following metrics:
    - Financial Risk
    - Market Risk
    - Operational Risk
    - Reputation Risk
    - Technological Risk
    - Legal Risk
    - Compliance Risk
    - Industry-specific Regulations
    - Market Opportunity
    - Any other relevant risks in the startup's target industry
    
    Your task is to:
    1. Break down and assess the idea across all these risk dimensions.
    2. Calculate a final **confidenceScore** between 0.0 and 1.0.
    3. Give a recommendation based on the score.
    
    Startup Idea: "${idea}"
    
    Respond strictly in JSON:
    {
      "financialRisk": "...",
      "marketRisk": "...",
      "operationalRisk": "...",
      "reputationRisk": "...",
      "technologicalRisk": "...",
      "legalRisk": "...",
      "complianceRisk": "...",
      "regulatoryChallenges": "...",
      "marketOpportunity": "...",
      "additionalRisks": "...",
      "confidenceScore": 0.0,
      "recommendation": "..."
    }
    `.trim(),
    
      // ✅ Add regulatory_scan
      regulatory_scan: (idea) => `
    You are a compliance advisor for new startups.
    
    Given the startup category: "${idea}", perform a regulatory scan covering:
    
    1. List of applicable regulations (e.g., GDPR, HIPAA, FERPA, SEC)
    2. A brief compliance checklist for each
    3. Common pitfalls startups face in this category
    4. Suggested tools, templates, or design practices to maintain compliance
    5. Provide credible reference links
    
    Respond in strict JSON format:
    {
      "regulations": [
        {
          "name": "...",
          "checklist": ["...", "..."]
        }
      ],
      "commonPitfalls": ["...", "..."],
      "suggestedPractices": ["...", "..."],
      "referenceLinks": ["...", "..."]
    }
    `.trim()
};

export async function runGeminiAgent(agentType, input) {
  if (!promptMap[agentType]) throw new Error('Invalid agent type');

  const prompt = promptMap[agentType](input);

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