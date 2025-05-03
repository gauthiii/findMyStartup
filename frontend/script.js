function showLoader() {
    return `
      <div class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    `;
  }
  
  function formatOutput(agentType, result) {
    switch (agentType) {
      case "idea_parser":
        return `
          <h3 class="text-xl font-semibold mb-2">🧠 Parsed Idea</h3>
          <p><strong>Core Problem:</strong> ${result.coreProblem}</p>
          <p><strong>Target User:</strong> ${result.targetUser}</p>
          <p><strong>Pain Points:</strong></p>
          <ul class="list-disc ml-6">
            ${result.painPoints.map(p => `<li>${p}</li>`).join("")}
          </ul>
        `;
      case "tech_stack":
        return `
          <h3 class="text-xl font-semibold mb-2">🧰 Recommended Tech Stack</h3>
          <p><strong>Frontend:</strong> ${result.frontend}</p>
          <p><strong>Backend:</strong> ${result.backend}</p>
          <p><strong>Database:</strong> ${result.database}</p>
          <p><strong>Optional Tools:</strong></p>
          <ul class="list-disc ml-6">
            ${result.optionalTools.map(t => `<li>${t}</li>`).join("")}
          </ul>
        `;
      case "gtm_plan":
        return `
          <h3 class="text-xl font-semibold mb-2">📈 Go-To-Market Plan</h3>
          <p><strong>Early Adopters:</strong> ${result.earlyAdopters}</p>
          <p><strong>Distribution Channels:</strong></p>
          <ul class="list-disc ml-6">
            ${result.distributionChannels.map(d => `<li>${d}</li>`).join("")}
          </ul>
          <p><strong>Growth Tactics:</strong></p>
          <ul class="list-disc ml-6">
            ${result.growthTactics.map(g => `<li>${g}</li>`).join("")}
          </ul>
        `;
      case "rag_case_study":
        return `
          <h3 class="text-xl font-semibold mb-2">📚 Similar Startup Case Studies</h3>
          <p><strong>Similar Startups:</strong></p>
          <ul class="list-disc ml-6">
            ${result.similarStartups.map(s => `<li>${s}</li>`).join("")}
          </ul>
          <p><strong>Strategy:</strong> ${result.theirStrategy}</p>
          <p><strong>Key Learnings:</strong></p>
          <ul class="list-disc ml-6">
            ${result.keyLearnings.map(k => `<li>${k}</li>`).join("")}
          </ul>
        `;
      default:
        return `<pre>${JSON.stringify(result, null, 2)}</pre>`;
    }
  }
  
  async function fetchAgent(agentType) {
    const idea = document.getElementById("ideaInput").value;
    const model = document.getElementById("modelSelect").value;
    const outputDiv = document.getElementById("agentOutput");
  
    if (!idea.trim()) {
      alert("Please enter your startup idea first.");
      return;
    }
  
    outputDiv.innerHTML = showLoader();
  
    try {
      const res = await fetch(`/api/agent?model=${model}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentType, input: idea })
      });
  
      const data = await res.json();
  
      if (data.error) {
        outputDiv.innerHTML = `<p class="text-red-500">❌ Error: ${data.error}</p>`;
      } else {
        outputDiv.innerHTML = formatOutput(agentType, data.result);
      }
    } catch (err) {
      outputDiv.innerHTML = `<p class="text-red-500">⚠️ Failed to fetch response: ${err.message}</p>`;
    }
  }
  