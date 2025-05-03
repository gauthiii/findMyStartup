# Startup-ult – Multi-Agent AI System

Startup Copilot is a multi-agent web application designed to guide founders from idea validation to execution using AI agents backed by either Azure OpenAI or Gemini (Google's model). This tool assists with reviewing startup ideas, analyzing risk, suggesting tech stacks, developing go-to-market strategies, and researching case studies.

From
- Ravi Rajappa
- Shraddha Pandey
- Gautham Vijayaraj




<h3 align="center">🚀 Demo Walkthrough – Startup Copilot</h3>

<p align="center">
  <video width="700" controls>
    <source src="https://github.com/user-attachments/assets/69de9502-928d-4f51-9505-76f953a251b9" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

<p align="center"><i>A quick demo showing how founders use Startup Copilot to go from idea to MVP in minutes.</i></p>




## 7 AI Agents in One - Real Time System to evaluate your Startup Idea 💡

<p>
  <img src="https://github.com/user-attachments/assets/f7ed9e63-e2ca-4866-be1c-47a8bb7a65b0" width="400" />
  <img src="https://github.com/user-attachments/assets/5dfe3ff4-de18-4219-9be9-a76e45af8555" width="400" />

</p>
<p>

  <img src="https://github.com/user-attachments/assets/c74b5008-e344-4d91-bd10-d53c51f4a78d" width="400" />
  <img src="https://github.com/user-attachments/assets/9e5e3185-aebc-42c4-ab13-316cea83bfa7" width="400" />
</p>
<p>
  <img src="https://github.com/user-attachments/assets/ef3e7e60-fbf9-4755-8106-d2e03e683a39" width="400" />
  <img src="https://github.com/user-attachments/assets/7dc67c9f-8fa6-492c-be9a-0afc3fec2cdc" width="400" />
 
</p>
<p>
 
  <img src="https://github.com/user-attachments/assets/771134c5-96f1-42a1-a770-b12e63b742dc" width="400" />
  <img src="https://github.com/user-attachments/assets/8cbcc38f-6788-4793-a92f-0fc6c1dba5a9" width="400" />
</p>












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
- **Screen 5**: Funding Strategy Agent
- **Screen 6**: Regulatory Compliance Agent

### 3. Agents and Functions

#### Azure Agents (in `azure.js`)
- `runAzureIdeaParser(idea)` – Reviews startup ideas and suggests improvements.
- `runAzureRiskAnalysis(idea)` – Assesses risks and provides a confidence score.
- `runAzureTechStack(idea)` – Recommends frontend, backend, and database tools.
- `runAzureGTMPlan(idea)` – Generates detailed GTM plans.
- `runAzureRAG(idea)` – Performs domain research and provides competitive insights.
- `runAzureFundingPlan(idea)` – Suggests potential funding sources and investor outreach strategies.
- `runAzureRegulatoryScan(idea)` – Reviews domain-specific compliance and legal risks.
  
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
