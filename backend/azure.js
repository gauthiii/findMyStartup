import 'dotenv/config';
const axios = (await import('axios')).default;

const API_KEY = process.env.AZURE_OPENAI_API_KEY;
const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

async function callAzure(prompt) {
  const res = await axios.post(
    `${ENDPOINT}/openai/deployments/${DEPLOYMENT}/chat/completions?api-version=2025-01-01-preview`,
    {
      messages: [
        { role: 'system', content: 'You are a helpful startup assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY
      }
    }
  );
  return res.data?.choices?.[0]?.message?.content || '{}';
}

export async function runAzureIdeaParser(idea) {
    const prompt = `
  You are a startup idea review agent with a personality. Your job is to break down the user's startup idea, extract the core problem, identify the target users, list their pain points, and assess if the idea already exists in the market.
  
  Be analytical but also witty. For the "review" section, write a longer, insightful summary with a touch of Deadpool-style humor — think smart, playful, and real — but stay respectful and avoid rudeness or profanity. Use pop culture references *only* if relevant, and stay on-topic.
  
  Also suggest improvements to the idea and alternatives if it's too generic.
  
  Startup Idea: "${idea}"
  
  Respond strictly in this JSON format:
  {
    "coreProblem": "...",
    "targetUser": "...",
    "painPoints": ["..."],
    "review": "...",               // This should be at least 5-6 sentences and witty
    "existingAlternatives": "...",
    "suggestedImprovements": "..."
  }
    `.trim();
  
    return await callAzure(prompt);
  }


  export async function runAzureRiskAnalysis(idea) {
    const prompt = `
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
  2. Calculate a final **confidenceScore** between 0.0 and 1.0, based on the strengths and weaknesses identified.
  3. If confidenceScore > 0.75:
     - Suggest if the user can move to a Go-To-Market strategy or MVP planning.
  4. If confidenceScore <= 0.75:
     - Warn about the high risk and suggest **specific strategies** to reduce the risk score.
  
  Avoid hallucinations or deviations. Be clear, realistic, and slightly witty but professional.
  
  Startup Idea: "${idea}"
  
  Respond strictly in the following JSON format:
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
  `.trim();
  
    return await callAzure(prompt);
  }
  
  
  

export async function runAzureTechStack(idea) {
  const prompt = `
Suggest tech stack for "${idea}":
{
  "frontend": "...",
  "backend": "...",
  "database": "...",
  "optionalTools": ["...", "..."]
}
Only JSON. No explanation.
`;
  return await callAzure(prompt);
}

export async function runAzureGTMPlan(idea) {
    const prompt = `
  You are a go-to-market strategist for early-stage startups.
  
  Given the startup idea below, generate a lean but complete Go-To-Market (GTM) plan. Focus on clarity, brevity, and founder-actionability. Think like a YC-backed founder — no fluff, no filler. Just the strategy.
  
  Startup Idea: "${idea}"
  
  Your response must include the following 8 sections inside a single JSON object:
  {
    "targetCustomerPersona": "...",               // Age, role, behavior, key pain points
    "marketLandscape": "...",                     // Segments, gaps, and estimated TAM
    "valueProposition": "...",                    // What’s unique and compelling about this product
    "salesChannels": ["...", "..."],              // Direct sales, product-led growth, partners, etc.
    "pricingStrategy": "...",                     // Any free trials, tiers, price levels
    "distributionModel": "...",                   // B2B, B2C, marketplaces, integrations
    "customerSupport": "...",                     // Chat, email, phone, automation, SLA
    "launchTimeline": ["...", "...", "..."]       // Milestones for first 8 weeks
  }
  
  Respond only in valid JSON.
    `.trim();
  
    return await callAzure(prompt);
  }
  
  export async function runAzureRAG(idea) {
    const prompt = `
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
    `.trim();
  
    return await callAzure(prompt);
  }
  
