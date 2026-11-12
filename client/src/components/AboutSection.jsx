import React from 'react';
import { Award, Zap, ShieldCheck, HeartHandshake, Sparkles, CheckCircle, Code2, PenTool, Video, Box, Layers } from 'lucide-react';
import { playHover } from '../utils/audioFx';

export default function AboutSection() {
  const pillars = [
    {
      title: "Client-First Approach",
      icon: HeartHandshake,
      description: "Direct collaboration with no middlemen. We align closely with your business metrics and target audience."
    },
    {
      title: "Quality Execution",
      icon: Award,
      description: "Pixel-perfect Figma designs, clean maintainable code, photorealistic 3D CGI, and meticulously color-graded video edits."
    },
    {
      title: "On-Time Delivery",
      icon: Zap,
      description: "Strict milestones and proactive communication ensuring your project ships on schedule."
    },
    {
      title: "Long-Term Support",
      icon: ShieldCheck,
      description: "Continuous maintenance, performance monitoring, and iterative enhancements as you grow."
    }
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#0B0F17]">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Story + Right Workspace Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Us</span>
            </div>

            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A Small Studio with <br className="hidden sm:inline" />
              a Big Creative Drive
            </h2>

            {/* Main Subtitle matching screenshot */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We are a freelance team passionate about design, technology and storytelling. We combine design thinking, technical expertise and creative editing to help businesses build a strong digital presence.
            </p>

            {/* Studio Capabilities Overview */}
            <div className="p-5 rounded-2xl bg-[#111827] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> End-to-End Digital Craftsmanship
                </span>
                <span className="text-[10px] text-slate-400 bg-white/[0.06] px-2.5 py-0.5 rounded-full">
                  Full-Service Studio
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                From user research and interactive Figma design systems to scalable MERN web applications, custom WordPress platforms, photorealistic 3D CGI product animations, and cinematic video editing — we deliver clean, high-performance digital products engineered to elevate your brand.
              </p>
            </div>

            {/* Quick value checklist */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Full-cycle MERN stack</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Bespoke WordPress engineering</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Photorealistic 3D & CGI animation</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Conversion-optimized UI/UX</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Cinematic video storytelling</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Lighthouse 95+ speed & SEO</span>
              </div>
            </div>

          </div>

          {/* Right Column: Creative Studio Aesthetic Image with quote */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-[#111827] border border-white/[0.1] shadow-2xl group cursor-pointer hover:border-blue-500/40 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1000&auto=format&fit=crop"
                alt="Creative Studio Workspace"
                className="w-full h-80 sm:h-96 object-cover brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dark subtle overlay with quote */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="backdrop-blur-md bg-[#0B0F17]/70 p-4 rounded-xl border border-white/[0.08] group-hover:border-blue-500/40 transition-colors">
                  <p className="text-xs sm:text-sm text-slate-200 font-medium italic">
                    "Every digital touchpoint should be an experience that converts visitors into believers."
                  </p>
                  <span className="text-[11px] text-blue-400 font-semibold block mt-1.5 flex items-center justify-between">
                    <span>— Shivera</span>
                    <span className="text-[10px] text-slate-400">Kolkata, India</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Strip (Matching screenshot) */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={playHover}
                  className="rounded-2xl bg-[#111827] border border-white/[0.06] p-6 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
