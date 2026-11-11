import React from 'react';
import { Box, PenTool, Code2, Globe, Video, ArrowUpRight, CheckCircle2, Sparkles, Bot } from 'lucide-react';
import { playPop, playHover } from '../utils/audioFx';

export default function ServicesSection({ onSelectService }) {
  const services = [
    {
      id: "generative-ai",
      title: "Generative AI & LLM Systems",
      shortSummary: "Autonomous AI agents, enterprise RAG knowledge engines & generative UI.",
      detailedDesc: "Custom AI agent swarms, tool-calling pipelines, hybrid vector search (Pinecone), and generative UI.",
      icon: Sparkles,
      badge: "Next-Gen AI",
      bullets: [
        "Autonomous multi-agent swarms with authenticated tool & API execution",
        "Enterprise RAG vector knowledge bases with zero-hallucination guardrails",
        "Generative UI: Dynamic React dashboards & interactive forms from prompts",
        "Private open-source LLM fine-tuning & local hosting (Llama 3, vLLM)"
      ],
      turnaround: "1 - 3 Weeks",
      link: "#ai"
    },
    {
      id: "3d-animation",
      title: "3D Animation & CGI",
      shortSummary: "Industry-based, factory-based & photorealistic product animations.",
      detailedDesc: "Photorealistic 3D visualization, plant/factory layout walkthroughs, and commercial product animations.",
      icon: Box,
      badge: "New Service",
      bullets: [
        "Product 3D: Luxury jewelry, tech gadgets & 360° commercial turntable loops",
        "Industry 3D: High-end architectural spaces, heritage pavilions & spatial design",
        "Factory 3D: Manufacturing layouts, process pipelines & mechanical mechanisms",
        "Broadcast 4K 60FPS ray-traced rendering, caustics & PBR materials"
      ],
      turnaround: "1 - 3 Weeks"
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      shortSummary: "User-centric, modern and conversion-focused designs.",
      detailedDesc: "Research, wireframes, UI design and interactive prototypes.",
      icon: PenTool,
      bullets: [
        "Figma UI design & wireframes",
        "Design systems & typography hierarchy",
        "Interactive prototypes & user journeys",
        "Mobile-first responsive design"
      ],
      turnaround: "1 - 2 Weeks"
    },
    {
      id: "web-development",
      title: "Web Design & Development",
      shortSummary: "Responsive, fast and scalable websites with modern technologies.",
      detailedDesc: "Modern, responsive and performance-focused websites (MERN, custom solutions, etc.).",
      icon: Code2,
      bullets: [
        "Fullstack MERN (MongoDB, Express, React, Node)",
        "Modern frontend architectures & animations",
        "REST APIs & secure database schemas",
        "Lighthouse 95+ speed & SEO tuning"
      ],
      turnaround: "2 - 3 Weeks"
    },
    {
      id: "wordpress-solutions",
      title: "WordPress Solutions",
      shortSummary: "Custom WordPress websites, themes and plugin integration.",
      detailedDesc: "Business websites, blogs, portfolios and custom theme/plugin setup.",
      icon: Globe,
      bullets: [
        "Custom lightweight themes & blocks",
        "WooCommerce storefronts & checkout flows",
        "Security, speed & Core Web Vitals optimization",
        "Effortless client content management"
      ],
      turnaround: "1 - 2 Weeks"
    },
    {
      id: "video-editing",
      title: "Video Editing",
      shortSummary: "Engaging edits for brands, creators and businesses (YouTube, Reels, Ads etc.).",
      detailedDesc: "Short-form & long-form edits, reels, YouTube videos, promos and more.",
      icon: Video,
      bullets: [
        "High-retention YouTube long-form pacing",
        "Viral Instagram Reels, TikToks & Shorts (9:16)",
        "Commercial promos, event recaps & ads",
        "4K color grading, sound design & motion graphics"
      ],
      turnaround: "2 - 5 Days"
    }
  ];

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-[#0B0F17]">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <span>Our Services</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              What We Do
            </h2>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl">
              End-to-end creative, 3D visualization and technical solutions for your brand.
            </p>
          </div>

          <a
            href="#animation"
            onClick={playPop}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-4 md:mt-0 group"
          >
            <span>Explore 3D Animation Studio</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFeatured = service.id === '3d-animation';
            return (
              <div
                key={service.id}
                onMouseEnter={playHover}
                onClick={() => {
                  playPop();
                  onSelectService(service);
                }}
                className={`group relative rounded-2xl bg-[#111827]/80 hover:bg-[#131E33] border p-7 sm:p-8 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-glow-sm flex flex-col justify-between ${
                  isFeatured
                    ? 'border-blue-500/40 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#111827] via-[#131F38] to-[#111827]'
                    : 'border-white/[0.08] hover:border-blue-500/40'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Badge + Arrow */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center p-3.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-400">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                      </div>
                      {service.badge && (
                        <span className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 text-[11px] font-bold">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-medium mb-2 leading-relaxed">
                    {service.detailedDesc}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {service.shortSummary}
                  </p>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-white/[0.06] space-y-2">
                    {service.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-400 pt-3 border-t border-white/[0.04]">
                  <span>Turnaround: <strong className="text-blue-400">{service.turnaround}</strong></span>
                  <span className="text-blue-400 group-hover:underline flex items-center gap-1">
                    Request Quote ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
