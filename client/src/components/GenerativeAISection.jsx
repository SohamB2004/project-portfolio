import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Cpu,
  Layers,
  Terminal,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Database,
  Search,
  Code,
  Copy,
  Check,
  Play,
  RotateCcw,
  FileText,
  BarChart3,
  Sliders,
  Workflow
} from 'lucide-react';
import { playPop, playHover, playSparkle } from '../utils/audioFx';
import { fireConfetti } from '../utils/confetti';

export default function GenerativeAISection({ onOpenQuoteModal }) {
  const [activeTab, setActiveTab] = useState('agent');
  const [selectedModel, setSelectedModel] = useState('claude-3-5');
  const [isSimulating, setIsSimulating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [simulatedProgress, setSimulatedProgress] = useState(100);

  // Scenarios for the Live AI Playground
  const scenarios = {
    agent: {
      id: 'agent',
      title: 'Autonomous AI Agent Swarm',
      badge: 'Tool Calling & API Orchestration',
      prompt: 'Audit customer invoice #8492, verify Stripe payment status, and notify customer with tracking details.',
      systemPrompt: 'You are an autonomous operations agent equipped with Stripe, Warehouse, and CRM tools.',
      modelUsed: 'Claude 3.5 Sonnet',
      latency: '380ms',
      tokensPerSec: '124 tok/s',
      executionSteps: [
        { label: 'Step 1: Ingestion & Intent Extraction', detail: 'Identified target invoice #8492 and customer ID #cust_9214.', status: 'done' },
        { label: 'Step 2: Authenticated Tool Execution', detail: 'stripe.getInvoice(id="inv_8492") -> Paid ($1,490.00 on Visa ****4129)', status: 'done' },
        { label: 'Step 3: Warehouse DB Cross-Check', detail: 'warehouse.getFulfillmentStatus(orderId="ord_8492") -> Shipped via DHL Express (#TRK9021489)', status: 'done' },
        { label: 'Step 4: Autonomous Synthesis & Delivery', detail: 'Generated personalized email dispatch with 1-click live DHL tracking.', status: 'done' },
      ],
      output: `Invoice #8492 has been verified as PAID ($1,490.00 via Stripe). 
Your package was dispatched today via DHL Express. 
Tracking Number: DHL-TRK-9021489 
Estimated Delivery: Friday by 2:00 PM. 
Customer communication has been dispatched and logged in your CRM.`
    },
    rag: {
      id: 'rag',
      title: 'Enterprise RAG Knowledge Engine',
      badge: 'Vector DB & Hallucination Guardrails',
      prompt: 'What is our SLA requirement for EU customer data cold-storage encryption across Frankfurt nodes?',
      systemPrompt: 'Retrieve and synthesize facts strictly from verified enterprise documentation with source citations.',
      modelUsed: 'GPT-4o + Pinecone Vector Index',
      latency: '290ms',
      tokensPerSec: '142 tok/s',
      executionSteps: [
        { label: 'Step 1: Hybrid Vector Embedding', detail: 'Generated text-embedding-3-large dense vector + BM25 sparse keyword query.', status: 'done' },
        { label: 'Step 2: Vector Search & Re-ranking', detail: 'Retrieved top 5 chunks from Pinecone. Cohere Rerank score: 0.984.', status: 'done' },
        { label: 'Step 3: NeMo Guardrails Validation', detail: 'Verified zero hallucinations against indexed source policy documents.', status: 'done' },
        { label: 'Step 4: Citation Generation', detail: 'Linked response to exact section in GDPR Storage Handbook 2024.', status: 'done' },
      ],
      output: `According to Section 4.2.1 of the Enterprise Data Retention Agreement:
• Primary storage must remain strictly localized in the Frankfurt (AWS eu-central-1) data center.
• Automated backups must undergo AES-256 GCM envelope encryption.
• Cold-storage archives require guaranteed cryptographic proof of deletion within 72 hours of customer request.

[Sources: "GDPR Storage & Sovereignty Handbook v3.2", p. 74-76]`
    },
    genui: {
      id: 'genui',
      title: 'Generative UI & Dynamic Dashboards',
      badge: 'Streaming UI & React Components',
      prompt: 'Generate an interactive monthly revenue KPI dashboard with year-over-year comparison and growth breakdown.',
      systemPrompt: 'Predict and stream structured React component tree definitions validated against Zod schema.',
      modelUsed: 'Vercel AI SDK + React Hydration',
      latency: '210ms',
      tokensPerSec: '168 tok/s',
      executionSteps: [
        { label: 'Step 1: Schema Ingestion', detail: 'Parsed metric request against AnalyticsWidgetSchema (Zod).', status: 'done' },
        { label: 'Step 2: Component Stream Assembly', detail: 'Generated streaming JSON props for KPICard, BarMeter, and TrendBadge.', status: 'done' },
        { label: 'Step 3: Real-Time DOM Hydration', detail: 'Synthesized interactive React components directly into client viewport.', status: 'done' },
      ],
      isVisualWidget: true,
      widgetData: {
        mrr: '$148,500',
        mrrGrowth: '+24.8% YoY',
        activeSubs: '2,840',
        subsGrowth: '+18.2%',
        nps: '78 / 100',
        runRate: '$1.78M'
      },
      output: 'Dynamic interactive UI rendered and hydrated in 210ms with zero server re-render latency.'
    },
    finetune: {
      id: 'finetune',
      title: 'Custom LLM Fine-Tuning & Local Models',
      badge: 'Private LoRA & Zero Data Leakage',
      prompt: 'Draft an ultra-luxurious product launch campaign for an aerospace-grade titanium mechanical watch.',
      systemPrompt: 'Apply specialized QLoRA weights calibrated on 500,000 words of bespoke luxury brand literature.',
      modelUsed: 'Meta Llama 3 70B (Private vLLM Node)',
      latency: '310ms',
      tokensPerSec: '118 tok/s',
      executionSteps: [
        { label: 'Step 1: LoRA Adapter Loading', detail: 'Loaded Haute Horlogerie vocabulary adapter (Rank 64, Alpha 128).', status: 'done' },
        { label: 'Step 2: Lexical Consistency Check', detail: 'Target brand cadence score: 99.4% adherence.', status: 'done' },
        { label: 'Step 3: Private Local Inference', detail: 'Executed on dedicated private GPU cluster with zero third-party cloud data transmission.', status: 'done' },
      ],
      output: `Forged from a single monobloc of Grade 5 aerospace titanium, the Chrono 01 is not merely an instrument of measurement—it is a manifesto of mechanical supremacy. 

Featuring an exposed flying tourbillon cage suspended beneath dual anti-reflective sapphire crystals, every beveled bridge is hand-finished by artisan hands over 140 meticulous hours. 

True luxury does not whisper. It endures.`
    }
  };

  const currentScenario = scenarios[activeTab];

  const handleSimulate = (tabKey) => {
    playPop();
    setActiveTab(tabKey);
    setIsSimulating(true);
    setSimulatedProgress(0);

    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          playSparkle();
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleCopy = () => {
    playPop();
    navigator.clipboard.writeText(currentScenario.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillars = [
    {
      title: "Autonomous AI Agents & Swarms",
      badge: "Multi-Tool Calling",
      icon: Bot,
      gradient: "from-blue-600/20 to-cyan-500/10",
      description: "Self-governing agent pipelines that plan, query APIs, manipulate databases, and execute multi-step business logic autonomously with human-in-the-loop oversight.",
      deliverables: ["ReAct reasoning frameworks", "Stripe, CRM & ERP integrations", "Human-in-the-loop escalation", "Detailed audit traces"]
    },
    {
      title: "Enterprise RAG & Vector Search",
      badge: "Zero-Hallucination",
      icon: Database,
      gradient: "from-indigo-600/20 to-purple-500/10",
      description: "Connect proprietary PDFs, internal databases, Notion docs, and customer histories to modern LLMs with high-precision hybrid semantic search and exact page citations.",
      deliverables: ["Pinecone / Milvus / Qdrant indexing", "Cohere semantic re-ranking", "Document parsing & OCR", "NeMo guardrails"]
    },
    {
      title: "Generative UI & AI SaaS Platforms",
      badge: "Dynamic Interfaces",
      icon: Sparkles,
      gradient: "from-cyan-600/20 to-blue-500/10",
      description: "Next-generation applications where prompts transform in real-time into rich, interactive React components, generative dashboards, and tailored user workflows.",
      deliverables: ["Vercel AI SDK integration", "Zod-validated UI streaming", "Dynamic chart hydration", "Custom generative micro-SaaS"]
    },
    {
      title: "Custom LLM Fine-Tuning & Private Nodes",
      badge: "100% Data Privacy",
      icon: Cpu,
      gradient: "from-purple-600/20 to-pink-500/10",
      description: "Train and calibrate open-weight models (Llama 3, Mistral) on your company's proprietary data via LoRA/QLoRA. Deployed on secure private servers via vLLM or Ollama.",
      deliverables: ["LoRA / QLoRA fine-tuning", "vLLM private high-speed hosting", "Zero cloud data leakage", "Domain vocabulary calibration"]
    }
  ];

  const techStack = [
    { name: "OpenAI GPT-4o", category: "Foundation Model" },
    { name: "Claude 3.5 Sonnet", category: "Agentic Reasoning" },
    { name: "Meta Llama 3", category: "Open-Source Local" },
    { name: "LangChain & LangGraph", category: "Agent Swarms" },
    { name: "LlamaIndex", category: "RAG & Knowledge" },
    { name: "Pinecone", category: "Vector Database" },
    { name: "Vercel AI SDK", category: "Generative UI" },
    { name: "vLLM / Ollama", category: "Private Inference" },
    { name: "Python FastAPI", category: "High-Speed Backend" },
    { name: "React & Next.js", category: "Frontend Integration" }
  ];

  return (
    <section id="ai" className="relative py-20 sm:py-28 bg-[#0B0F17] overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-semibold text-blue-400 shadow-glow-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Next-Gen AI Engineering</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Generative AI, Autonomous Agents & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Enterprise LLM Systems
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We bridge foundational AI research with production-grade software engineering. From multi-agent swarms with tool calling to enterprise RAG vector pipelines and generative UI, we build AI solutions that deliver measurable ROI.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => {
                playPop();
                if (onOpenQuoteModal) {
                  onOpenQuoteModal({ title: 'Generative AI & LLM Systems' });
                }
              }}
              onMouseEnter={playHover}
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-glow-sm hover:shadow-glow transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Estimate AI Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Interactive Live AI Console / Simulator */}
        <div className="mb-20 rounded-3xl bg-[#111827] border border-white/[0.1] shadow-2xl overflow-hidden">
          
          {/* Console Header Bar */}
          <div className="px-5 sm:px-8 py-4 bg-[#0D1322] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5 pl-2 border-l border-white/[0.1]">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>ai-pipeline-runtime::v2.4.0</span>
              </span>
            </div>

            {/* Live Metrics Pills */}
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Status: Ready</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-slate-400">
                <span className="text-slate-500">Latency:</span>
                <span className="text-cyan-400 font-semibold">{currentScenario.latency}</span>
              </div>
              <div className="hidden md:flex items-center gap-1 text-slate-400">
                <span className="text-slate-500">Throughput:</span>
                <span className="text-purple-400 font-semibold">{currentScenario.tokensPerSec}</span>
              </div>
            </div>

          </div>

          {/* Scenario Selector Navigation */}
          <div className="p-4 sm:p-6 bg-[#0E1526]/80 border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto no-scrollbar">
            {Object.keys(scenarios).map((key) => {
              const sc = scenarios[key];
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSimulate(key)}
                  onMouseEnter={playHover}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-glow-sm'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {key === 'agent' && <Bot className="w-4 h-4 text-cyan-300" />}
                  {key === 'rag' && <Database className="w-4 h-4 text-indigo-300" />}
                  {key === 'genui' && <Sparkles className="w-4 h-4 text-amber-300" />}
                  {key === 'finetune' && <Cpu className="w-4 h-4 text-purple-300" />}
                  <span>{sc.title}</span>
                </button>
              );
            })}
          </div>

          {/* Simulator Content Area */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Input, System Prompt & Multi-Step Execution Trace */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* User Prompt Box */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Input Query / Prompt</span>
                  <span className="text-[10px] text-blue-400 font-mono">{currentScenario.badge}</span>
                </label>
                <div className="p-4 rounded-xl bg-[#090D16] border border-white/[0.08] text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
                  "{currentScenario.prompt}"
                </div>
              </div>

              {/* Execution Trace Pipeline */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-blue-400" />
                    <span>Agent Tool & Thought Trace</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">4 / 4 checks passed</span>
                </div>

                <div className="space-y-2">
                  {currentScenario.executionSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#090D16]/70 border border-white/[0.05] flex items-start gap-2.5 transition-all hover:border-blue-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-slate-200">{step.label}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model Tag & Re-Run Trigger */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Model: <strong className="text-white">{currentScenario.modelUsed}</strong></span>
                </span>

                <button
                  onClick={() => handleSimulate(activeTab)}
                  onMouseEnter={playHover}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.08] transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>Re-Run Pipeline</span>
                </button>
              </div>

            </div>

            {/* Right: Live Synthesized Output Terminal / Generative UI Widget */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-[#090D16] border border-white/[0.08] p-5 sm:p-6 relative overflow-hidden">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                    {currentScenario.isVisualWidget ? 'Generative UI Component Render' : 'Synthesized Stream Output'}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  onMouseEnter={playHover}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-mono text-[11px]">Copy JSON/Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dynamic Content: Either Generative UI Widget or Text Stream */}
              <div className="flex-1">
                {currentScenario.isVisualWidget ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                      <div>
                        <span className="text-[10px] text-blue-400 font-mono uppercase font-semibold">Live Hydrated Component</span>
                        <h4 className="text-sm font-bold text-white">Q3 Financial Velocity Overview</h4>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Live Data Feed
                      </span>
                    </div>

                    {/* Generative UI Metric Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Monthly Run Rate</span>
                        <p className="text-lg font-bold text-white mt-1">{currentScenario.widgetData.mrr}</p>
                        <span className="text-[10px] text-emerald-400 font-semibold">{currentScenario.widgetData.mrrGrowth}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Active Enterprise Seats</span>
                        <p className="text-lg font-bold text-white mt-1">{currentScenario.widgetData.activeSubs}</p>
                        <span className="text-[10px] text-emerald-400 font-semibold">{currentScenario.widgetData.subsGrowth}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Customer NPS</span>
                        <p className="text-lg font-bold text-cyan-400 mt-1">{currentScenario.widgetData.nps}</p>
                        <span className="text-[10px] text-slate-400">Top 5% SaaS Tier</span>
                      </div>
                    </div>

                    {/* Visual Progress / Velocity Meter */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">ARR Milestones Completion</span>
                        <span className="font-mono text-blue-400 font-bold">89.4% of Target</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full w-[89%]" />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 font-mono italic">
                      ✨ Component synthesized dynamically using React Server Components & Zod Schema.
                    </p>
                  </div>
                ) : (
                  <pre className="text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300">
                    {currentScenario.output}
                  </pre>
                )}
              </div>

              {/* Terminal Footer with Verified Badge */}
              <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Production Ready • Evaluated via Test Suites</span>
                </span>
                <span className="text-cyan-400 font-semibold">Zero Hallucinations</span>
              </div>

            </div>

          </div>

        </div>

        {/* 2. Core Generative AI Pillars (4 Solution Areas) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Architectural Capabilities
            </h3>
            <p className="text-sm sm:text-base text-slate-400">
              Four specialized disciplines engineered to turn generative AI into scalable business infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={playHover}
                  className="rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/40 p-7 transition-all duration-300 hover:-translate-y-1 group shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full">
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-white/[0.06]">
                      {pillar.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4">
                    <button
                      onClick={() => {
                        playPop();
                        if (onOpenQuoteModal) {
                          onOpenQuoteModal({ title: pillar.title });
                        }
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-blue-600 hover:text-white text-slate-300 border border-white/[0.08] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>Consult on {pillar.badge}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Tech Ecosystem Cloud */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111827]/70 border border-white/[0.08] text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
              Production Tech Ecosystem
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Built on Battle-Tested AI Foundations
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="px-4 py-2 rounded-xl bg-[#0D1322] border border-white/[0.08] hover:border-blue-500/40 text-xs text-slate-300 font-medium transition-all hover:scale-105 cursor-default flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{tech.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">({tech.category})</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

