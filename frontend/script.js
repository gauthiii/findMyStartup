// 🔒 Redirect unauthorized access based on current screen
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
  
    if (
      path.includes("screen1") && !localStorage.getItem("model")
    ) {
      window.location.href = "/";
    }
  
    if (
      (path.includes("screen1.1") ||
        path.includes("screen2") ||
        path.includes("screen3") ||
        path.includes("screen4")) &&
      (!localStorage.getItem("model") || !localStorage.getItem("startupIdea"))
    ) {
      window.location.href = "/";
    }
  });
  
  // Global state
  let userIdea = localStorage.getItem("startupIdea") || "";
  let selectedModel = localStorage.getItem("model") || "";
  
  // 👇 On Model Select
  function selectModel(model) {
    selectedModel = model;
    localStorage.setItem("model", model);
    window.location.href = "screen1.html";
  }
  
  // 👇 Go back and reset state
  function goBackToModelSelection() {
    localStorage.clear();
    window.location.href = "/";
  }
  
  // 💫 Loading Spinner
  function showLoader() {
    return `
      <div class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    `;
  }
  
  // 📡 Azure endpoint routing
  function getAzureEndpoint(agentType) {
    switch (agentType) {
      case "idea_parser": return "/api/azure/idea";
      case "tech_stack": return "/api/azure/tech";
      case "gtm_plan": return "/api/azure/market";
      case "rag_case_study": return "/api/azure/casestudy";
      case "risk_analysis": return "/api/azure/risk"; // ✅ Added
      case "funding_strategy": return "/api/azure/funding";
      case "regulatory_scan": return "/api/azure/regulatory"; // ✅ NEW

      default: return "";
    }
  }
  
  
  // 📤 Formatted response display
  function formatOutput(agentType, result) {
    switch (agentType) {
        case "idea_parser":
  return `
    <div class="bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-6 text-left animate-fade-in">
      <h3 class="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">What do I think??</h3>


      <!-- 
      <div class="mb-4">
        <h4 class="font-semibold text-lg text-gray-700">What’s the Problem?</h4>
        <p class="text-gray-800 mt-1">${result.coreProblem}</p>
      </div>

      <div class="mb-4">
        <h4 class="font-semibold text-lg text-gray-700">🎯 Who’s Crying for This?</h4>
        <p class="text-gray-800 mt-1">${result.targetUser}</p>
      </div>

      <div class="mb-4">
        <h4 class="font-semibold text-lg text-gray-700">😖 Pain Points (aka Sleepless Nights)</h4>
        <ul class="list-disc ml-6 text-gray-800">
          ${result.painPoints.map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>

      -->

      <div class="mb-4">
        <h4 class="font-semibold text-lg text-gray-700">he Review (Brace Yourself)</h4>
        <p class="text-gray-800 mt-1">
          ${result.review}
        </p>
      </div>

      <div class="mb-4">
        <h4 class="font-semibold text-lg text-gray-700">What’s Already Out There?</h4>
        <p class="text-gray-800 mt-1">${result.existingAlternatives}</p>
      </div>

      <div>
        <h4 class="font-semibold text-lg text-gray-700">Pro Tips & Upgrades</h4>
        <p class="text-gray-800 mt-1">${result.suggestedImprovements}</p>
      </div>
    </div>
  `;


  case "risk_analysis":
    return `
      <div class="bg-white/60 backdrop-blur-md rounded-xl shadow-2xl p-8 text-left space-y-8 animate-fade-in text-gray-800 max-w-4xl mx-auto">
  
        <div class="border-b pb-4">
          <h2 class="text-3xl font-bold text-gray-900">RISK ASSESSMENT REPORT</h2>
          <p class="text-md text-gray-600 mt-1">An in-depth evaluation of vulnerabilities, resilience, and overall confidence score for your startup idea.</p>
        </div>
  
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Financial Risk</h4>
            <p class="text-sm">${result.financialRisk}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Market Risk</h4>
            <p class="text-sm">${result.marketRisk}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Operational Risk</h4>
            <p class="text-sm">${result.operationalRisk}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Reputation Risk</h4>
            <p class="text-sm">${result.reputationRisk}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Technological Risk</h4>
            <p class="text-sm">${result.technologicalRisk}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Legal Risk</h4>
            <p class="text-sm">${result.legalRisk}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Compliance Risk</h4>
            <p class="text-sm">${result.complianceRisk}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h4 class="font-semibold text-lg mb-1">Regulatory Challenges</h4>
            <p class="text-sm">${result.regulatoryChallenges}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4 col-span-2">
            <h4 class="font-semibold text-lg mb-1">Market Opportunity</h4>
            <p class="text-sm">${result.marketOpportunity}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4 col-span-2">
            <h4 class="font-semibold text-lg mb-1">Additional Risks</h4>
            <p class="text-sm">${result.additionalRisks}</p>
          </div>
        </div>
  
        <div class="bg-white rounded-lg p-6 shadow-md border">
          <h4 class="text-xl font-semibold text-gray-800 mb-2">Strategic Recommendation</h4>
          <p class="text-sm">${result.recommendation}</p>
        </div>
  
        <div class="text-center">
          <h3 class="text-xl font-bold text-gray-700">Confidence Score</h3>
          <div class="text-4xl font-extrabold text-[#ff6b6b] mt-2">${(result.confidenceScore * 100).toFixed(1)}%</div>
        </div>
      </div>
    `;
  

    case "tech_stack":
        return `
          <div class="bg-white/60 backdrop-blur-md rounded-xl shadow-2xl p-8 text-left animate-fade-in text-gray-800 max-w-4xl mx-auto space-y-6">
      
            <div class="border-b pb-4">
              <h2 class="text-3xl font-bold text-gray-900">Recommended Tech Architecture</h2>
              <p class="text-md text-gray-600 mt-1">Here's a tailored stack suggestion to build and scale your startup idea efficiently.</p>
            </div>
      
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div class="bg-white rounded-lg shadow p-4 border-t-4 border-blue-400">
                <h4 class="font-semibold text-lg mb-1 text-blue-800">Frontend</h4>
                <p class="text-gray-700">${result.frontend}</p>
              </div>
              <div class="bg-white rounded-lg shadow p-4 border-t-4 border-green-400">
                <h4 class="font-semibold text-lg mb-1 text-green-800">Backend</h4>
                <p class="text-gray-700">${result.backend}</p>
              </div>
              <div class="bg-white rounded-lg shadow p-4 border-t-4 border-yellow-400">
                <h4 class="font-semibold text-lg mb-1 text-yellow-800">Database</h4>
                <p class="text-gray-700">${result.database}</p>
              </div>
            </div>
      
            <div class="bg-[#f0f4ff] rounded-lg p-6 shadow-inner border border-blue-200">
              <h4 class="text-lg font-semibold text-gray-800 mb-2">Optional Enhancements & Tools</h4>
              <ul class="list-disc pl-5 text-gray-700 space-y-1">
                ${result.optionalTools.map(t => `<li>${t}</li>`).join("")}
              </ul>
            </div>
          </div>
        `;
      
        case "gtm_plan":
            return `
              <div class="bg-white/50 backdrop-blur-xl rounded-xl shadow-2xl p-8 text-left animate-fade-in space-y-6">
                <h3 class="text-3xl font-extrabold text-gray-900 border-b pb-2">Go-To-Market Strategy</h3>
          
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Target Customer Persona</h4>
                    <p class="text-gray-800">${result.targetCustomerPersona}</p>
                  </div>
          
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Market Landscape</h4>
                    <p class="text-gray-800">${result.marketLandscape}</p>
                  </div>
          
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Value Proposition</h4>
                    <p class="text-gray-800">${result.valueProposition}</p>
                  </div>
          
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Sales Channels</h4>
                    <ul class="list-disc ml-5 text-gray-800">
                      ${result.salesChannels.map(c => `<li>${c}</li>`).join("")}
                    </ul>
                  </div>
          
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Pricing & Packaging</h4>
                    <p class="text-gray-800">${result.pricingStrategy}</p>
                  </div>
          
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Distribution Model</h4>
                    <p class="text-gray-800">${result.distributionModel}</p>
                  </div>
          
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Customer Support Plan</h4>
                    <p class="text-gray-800">${result.customerSupport}</p>
                  </div>
          
                  <div class="bg-white rounded-lg p-4 shadow-sm border">
                    <h4 class="text-lg font-semibold text-gray-700 mb-2">Launch Timeline</h4>
                    <ul class="list-disc ml-5 text-gray-800">
                      ${result.launchTimeline.map(m => `<li>${m}</li>`).join("")}
                    </ul>
                  </div>
                </div>
              </div>
            `;
          
          
            case "rag_case_study":
                return `
                  <section class="space-y-8 animate-fade-in">
              
                    <!-- Hero Title -->
                    <div class="bg-[#fff] shadow-lg rounded-xl p-6 border-l-4 border-blue-600">
                      <h2 class="text-3xl font-extrabold text-gray-800">📘 Strategic Case Study Analysis</h2>
                      <p class="text-gray-600 mt-2">Here’s how your idea fits in the real world based on data, domain patterns, and past players.</p>
                    </div>
              
                    <!-- Similar Startups Grid -->
                    <div class="grid md:grid-cols-2 gap-6">
                      ${result.similarStartups.map(s => `
                        <div class="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-xl transition">
                          <h3 class="text-xl font-bold text-blue-700">${s.name}</h3>
                          <p class="text-gray-600 mt-1 italic">${s.summary}</p>
                          <p class="text-sm mt-2"><strong>Outcome:</strong> ${s.outcome}</p>
                          <p class="text-sm mt-1"><strong>Key Lesson:</strong> ${s.keyLesson}</p>
                        </div>
                      `).join("")}
                    </div>
              
                    <!-- Research Insights -->
                    <div class="bg-[#f9f9f9] border-l-4 border-indigo-500 p-6 rounded-xl shadow">
                      <h3 class="text-2xl font-semibold text-indigo-800 mb-4">Research & Whitepaper Insights</h3>
                      <div class="space-y-4">
                        ${result.researchInsights.map(insight => `
                          <div class="border-b border-gray-200 pb-3">
                            <p class="font-semibold text-gray-700">${insight.source}</p>
                            <p class="text-gray-600 text-sm">${insight.finding}</p>
                            <p class="text-gray-500 text-xs">Relevance: ${insight.relevance}</p>
                          </div>
                        `).join("")}
                      </div>
                    </div>
              
                    <!-- Competitive Landscape -->
                    <div class="bg-white border-l-4 border-yellow-500 p-6 rounded-xl shadow-md">
                      <h3 class="text-xl font-semibold text-yellow-700 mb-3">Competitive Landscape</h3>
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div><span class="font-bold block mb-1">Major Players</span>${result.competitionSummary.majorPlayers.join(", ")}</div>
                        <div><span class="font-bold block mb-1">Market Gaps</span>${result.competitionSummary.marketGaps}</div>
                        <div><span class="font-bold block mb-1">Dominant Incumbents</span>${result.competitionSummary.dominantIncumbents}</div>
                      </div>
                    </div>
              
                    <!-- Market Saturation & Conclusion -->
                    <div class="grid md:grid-cols-2 gap-6">
                      <div class="bg-white border-t-4 border-red-400 p-5 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-red-600 mb-2">Market Saturation</h3>
                        <p class="text-gray-700 text-xl">${result.saturationLevel}</p>
                      </div>
                      <div class="bg-white border-t-4 border-green-600 p-5 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-green-700 mb-2">Final Verdict</h3>
                        <p class="text-sm"><strong>Is it promising?</strong> ${result.conclusion.isPromising ? "Yes" : "No"}</p>
                        <p class="text-sm"><strong>Most Viable Angle:</strong> ${result.conclusion.viableAngle}</p>
                        <p class="text-sm"><strong>Barriers to Entry:</strong> ${result.conclusion.barriersToEntry}</p>
                      </div>
                    </div>
              
                  </section>
                `;

                case "funding_strategy":
                    return `
                      <section class="max-w-5xl mx-auto space-y-12 text-gray-800 animate-fade-in px-4">
                  
                        <!-- Title -->
                        <div class="text-left">
                          <h2 class="text-4xl font-extrabold text-gray-900">Funding Strategy</h2>
                          <p class="text-gray-600 mt-2 text-md border-l-4 pl-4 border-[#38bdf8]">A lean but actionable roadmap to raise capital and build investor confidence.</p>
                        </div>
                  
                        <!-- Recommended Sources -->
                        <div>
                          <h3 class="text-2xl font-bold mb-4 text-slate-800 border-b pb-2">Top Sources Based on Fit</h3>
                          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            ${result.recommendedSources.map(s => `
                              <div class="bg-white rounded-xl border-t-4 border-blue-500 p-5 shadow-sm hover:shadow-lg transition space-y-2">
                                <h4 class="text-lg font-semibold text-gray-900">${s.name}</h4>
                                <div class="text-sm text-gray-600">
                                  <div class="mb-1">
                                    <span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Funding: ${s.fundingRange}</span>
                                    <span class="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Fit: ${s.fit}</span>
                                  </div>
                                  <p class="text-sm text-gray-700 mt-2"><span class="font-semibold text-gray-800">Apply:</span> ${s.howToApply}</p>
                                </div>
                              </div>
                            `).join("")}
                          </div>
                        </div>
                  
                        <!-- Networking Strategy -->
                        <div class="bg-gray-50 rounded-xl p-6 border shadow-md space-y-6">
                          <h3 class="text-xl font-bold text-gray-800 border-b pb-2">Investor Discovery & Outreach Strategy</h3>
                  
                          <div class="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Investor Discovery</h4>
                              <div class="flex flex-wrap gap-2 mt-2">
                                ${result.networkingTips.investorPlaces.map(p => `
                                  <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">${p}</span>
                                `).join("")}
                              </div>
                            </div>
                  
                            <div>
                              <h4 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cold Outreach Templates</h4>
                              <div class="space-y-2 mt-2">
                                ${result.networkingTips.dmTemplates.map((t, i) => `
                                  <div class="bg-white border-l-4 border-indigo-400 p-3 rounded shadow text-sm">
                                    <p class="text-gray-700"><strong>Template ${i + 1}:</strong> ${t}</p>
                                  </div>
                                `).join("")}
                              </div>
                            </div>
                          </div>
                  
                          <div class="pt-4 border-t">
                            <h4 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Pitch Deck Prep</h4>
                            <div class="bg-white p-4 rounded border shadow text-sm text-gray-700">
                              ${result.networkingTips.pitchDeckAdvice}
                            </div>
                          </div>
                        </div>
                  
                        <!-- Checklist Section -->
                        <div class="bg-white border-l-4 border-green-600 p-6 rounded-lg shadow-md space-y-3">
                          <h3 class="text-lg font-bold text-gray-800 mb-2">Checklist: How to Raise $25k–$100k in 30 Days</h3>
                          <div class="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                            ${result.fundraisingChecklist.map(item => `
                              <div class="flex items-start gap-2 bg-green-50 p-3 rounded shadow-sm border-l-4 border-green-300">
                                <span class="w-2 h-2 mt-2 bg-green-500 rounded-full"></span>
                                <p>${item}</p>
                              </div>
                            `).join("")}
                          </div>
                        </div>
                  
                      </section>
                    `;


                    case "regulatory_scan":
                        return `
                          <section class="max-w-5xl mx-auto space-y-12 text-gray-800 animate-fade-in px-4">
                      
                            <!-- Title -->
                            <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
                              <h2 class="text-3xl font-extrabold text-gray-900">🧾 Compliance Overview</h2>
                              <p class="text-gray-600 mt-2">Here's your regulatory landscape scan based on the startup category.</p>
                            </div>
                      
                            <!-- Regulations + Checklists -->
                            <div class="space-y-6">
                              ${result.regulations.map(reg => `
                                <div class="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow">
                                  <h3 class="text-xl font-semibold text-blue-700">${reg.name}</h3>
                                  <ul class="list-disc ml-6 text-gray-800 mt-2 space-y-1">
                                    ${reg.checklist.map(item => `<li>${item}</li>`).join("")}
                                  </ul>
                                </div>
                              `).join("")}
                            </div>
                      
                            <!-- Common Pitfalls -->
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded shadow-md">
                              <h3 class="text-xl font-bold text-yellow-700 mb-3">⚠️ Common Pitfalls</h3>
                              <ul class="space-y-3 text-gray-800">
                                ${result.commonPitfalls.map(p => `
                                  <li class="flex items-start gap-2">
                                    <span class="text-yellow-500 text-xl mt-1">•</span>
                                    <span>${p}</span>
                                  </li>
                                `).join("")}
                              </ul>
                            </div>
                      
                            <!-- Suggested Practices -->
                            <div class="bg-[#f0f9ff] border-l-4 border-indigo-400 p-6 rounded-lg shadow space-y-3">
                              <h3 class="text-xl font-bold text-indigo-700">🛠️ Tools & Best Practices</h3>
                              <div class="grid sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                ${result.suggestedPractices.map(t => `
                                  <div class="bg-white rounded border-l-4 border-indigo-300 p-4 shadow-sm flex items-center gap-3">
                                    <span class="text-indigo-600 text-lg">✔</span>
                                    <span>${t}</span>
                                  </div>
                                `).join("")}
                              </div>
                            </div>
                      
                            <!-- Reference Links -->
                            <div class="bg-white p-5 rounded-lg border shadow-md">
                              <h3 class="text-xl font-bold text-gray-800 mb-2">🔗 Reference Links</h3>
                              <ul class="list-disc ml-6 text-blue-700 space-y-1">
                                ${result.referenceLinks.map(link => `<li><a href="${link}" target="_blank" class="underline hover:text-blue-500">${link}</a></li>`).join("")}
                              </ul>
                            </div>
                      
                          </section>
                        `;
                      
                  
      default:
        return `<pre>${JSON.stringify(result, null, 2)}</pre>`;
    }
  }
  
  // 🔁 Universal fetch logic
  async function fetchAgent(agentType, outputId, continueBtnId) {
    const outputDiv = document.getElementById(outputId);
    const continueBtn = document.getElementById(continueBtnId);
    const body = { input: userIdea };
  
    if (continueBtn) continueBtn.classList.add("hidden");
    outputDiv.innerHTML = showLoader();
  
    try {
      const url = selectedModel === "gemini"
        ? `/api/agent?model=gemini`
        : getAzureEndpoint(agentType);
  
      const finalBody = selectedModel === "gemini"
        ? { agentType, input: userIdea }
        : body;
  
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalBody)
      });
  
      const data = await res.json();
      const result = selectedModel === "gemini" ? data.result : data;
  
      if (data.error) {
        outputDiv.innerHTML = `<p class="text-red-500">❌ ${data.error}</p>`;
      } else {
        outputDiv.innerHTML = formatOutput(agentType, result);
        if (continueBtn) continueBtn.classList.remove("hidden");
      }
    } catch (err) {
      outputDiv.innerHTML = `<p class="text-red-500">⚠️ ${err.message}</p>`;
    }
  }
  
  // 🧠 Agent 1 – Idea Review
  function handleGenericReview() {
    const idea = document.getElementById("ideaInput").value;
    if (!idea.trim()) return alert("Please enter your idea.");
    userIdea = idea;
    localStorage.setItem("startupIdea", idea);
    fetchAgent("idea_parser", "output1", "continueBtn1");
  }

// 🛠️ Agent 1.1 – Risk analysis
function handleRiskAnalysis() {
    document.getElementById("recalledIdea1.1").textContent = `Idea: ${userIdea}`;
    fetchAgent("risk_analysis", "output1.1", "continueBtn1.1");
  }
  
  
  
  // 🛠️ Agent 2 – Tech Stack
  function handleTechStack() {
    document.getElementById("recalledIdea").textContent = `Idea: ${userIdea}`;
    fetchAgent("tech_stack", "output2", "continueBtn2");
  }
  
  // 📈 Agent 3 – Go-To-Market
  function handleGTM() {
    fetchAgent("gtm_plan", "output3", "continueBtn3");
  }
  
  // 📚 Agent 4 – Case Studies
  function handleCaseStudy() {
    fetchAgent("rag_case_study", "output4", "continueBtn4");
  }
  
  function handleFundingStrategy() {
    document.getElementById("recalledIdea5").textContent = `Idea: ${userIdea}`;
    fetchAgent("funding_strategy", "output5", "continueBtn5");
  }

  // 🧾 Agent 6 – Regulatory Scan
function handleRegulatoryScan() {
    document.getElementById("recalledIdea6").textContent = `Idea: ${userIdea}`;
    fetchAgent("regulatory_scan", "output6", ""); // no continue button
  }
  
  