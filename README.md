# Startup-ult – Multi-Agent AI System

Startup Copilot is a multi-agent web application designed to guide founders from idea validation to execution using AI agents backed by either Azure OpenAI or Gemini (Google's model). This tool assists with reviewing startup ideas, analyzing risk, suggesting tech stacks, developing go-to-market strategies, and researching case studies.

## Features

### 1. Model Selection
Users can choose between Azure OpenAI and Gemini models on the landing screen. This selection drives all subsequent agent outputs.

### 2. Agent Screens
The project consists of multiple frontend screens for each agent:
- **Screen 1**: Idea Review Agent
- **Screen 1.1**: Risk Assessment Agent
- **Screen 2**: Tech Stack Recommendation
- **Screen 3**: Go-To-Market Strategy
- **Screen 4**: Case Study & Landscape Analysis

### 3. Agents and Functions

#### Azure Agents (in `azure.js`)
- `runAzureIdeaParser(idea)` – Reviews startup ideas and suggests improvements.
- `runAzureRiskAnalysis(idea)` – Assesses risks and provides a confidence score.
- `runAzureTechStack(idea)` – Recommends frontend, backend, and database tools.
- `runAzureGTMPlan(idea)` – Generates detailed GTM plans.
- `runAzureRAG(idea)` – Performs domain research and provides competitive insights.

#### Gemini Agents (in `gemini.js`)
- `runGeminiAgent(agentType, idea)` – Unified Gemini API using mapped prompts per agent type.

### 4. Backend
Node.js Express server (`server.js`) routes API requests to Azure or Gemini agents, and serves static frontend files.

### 5. Frontend
- Tailwind CSS-powered UI with responsive design.
- Each screen has a dedicated HTML file.
- `script.js` handles routing, agent fetching, session validation, and output formatting.

## How to Run

1. Clone the repo and `cd` into the root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set the environment variables in a `.env` file:
   ```env
   GEMINI_API_KEY=your_google_api_key
   AZURE_OPENAI_API_KEY=your_azure_api_key
   AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com
   AZURE_OPENAI_DEPLOYMENT_NAME=your-deployment-name
   ```
4. Run the server:
   ```bash
   node backend/server.js
   ```
5. Open your browser to `http://localhost:3010`

## Notes

- Local/session storage is used to persist model selection and startup idea across screens.
- Validation is in place to prevent screen access without required session state.
- UI is enhanced using Tailwind CSS and modern card-based layouts.

## License

MIT License.
