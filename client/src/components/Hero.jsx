import React, { useState } from 'react';
import { ArrowUpRight, Briefcase, Users, Star, BarChart3, Laptop, Smartphone, Monitor, Sparkles } from 'lucide-react';
import { playPop, playHover } from '../utils/audioFx';

export default function Hero({ onOpenQuoteModal, onOpenProjectModal }) {
  const [deviceMode, setDeviceMode] = useState('laptop'); // 'laptop' | 'mobile' | 'monitor'
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glows matching screenshot */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Pill with interactive spark */}
            <div
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 transition-all hover:border-blue-400/40 hover:bg-white/[0.07] cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>UI/UX</span>
              <span className="text-slate-600">•</span>
              <span>Web</span>
              <span className="text-slate-600">•</span>
              <span>WordPress</span>
              <span className="text-slate-600">•</span>
              <span>Video</span>
              <span className="text-slate-600">•</span>
              <span>3D Animation</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-semibold">Gen AI</span>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full ml-1">
                Studio
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Design, Develop & Edit <br className="hidden sm:inline" />
              Digital Experiences <br />
              <span className="text-blue-500">That Work.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              A freelance studio crafting intuitive designs, high-performance websites and engaging videos for businesses and creators.
            </p>

            {/* CTA Buttons with playful pops */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  playPop();
                  onOpenQuoteModal();
                }}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-glow-sm transform active:scale-95 group"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#portfolio"
                onClick={playPop}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] transition-all duration-200 active:scale-95"
              >
                <span>View Portfolio</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D-Styled Realistic Mockup with Interactive Device Switcher */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            
            {/* Playful Device Mode Switcher Buttons */}
            <div className="mb-4 flex items-center gap-1.5 p-1 rounded-full bg-[#111827] border border-white/[0.08] backdrop-blur-md">
              {[
                { id: 'laptop', label: 'MacBook', icon: Laptop },
                { id: 'mobile', label: 'iPhone', icon: Smartphone },
                { id: 'monitor', label: 'Display', icon: Monitor },
              ].map((dev) => {
                const Icon = dev.icon;
                const active = deviceMode === dev.id;
                return (
                  <button
                    key={dev.id}
                    onClick={() => {
                      playPop();
                      setDeviceMode(dev.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{dev.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Device Showcase Container with 3D Tilt */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md lg:max-w-lg transition-transform duration-300 will-change-transform flex justify-center"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              
              {/* DEVICE 1: LAPTOP VIEW */}
              {deviceMode === 'laptop' && (
                <div className="w-full group animate-in zoom-in-95 duration-200">
                  <div className="relative rounded-t-2xl p-2.5 bg-[#1B2234] border border-white/[0.12] shadow-2xl shadow-blue-950/40">
                    <div className="flex justify-center mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 border border-slate-600" />
                    </div>

                    <div className="relative rounded-lg overflow-hidden bg-[#0D1424] border border-white/[0.06] aspect-[16/10]">
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                        alt="The Marketing Concept Preview"
                        className="w-full h-full object-cover brightness-[0.88] contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/95 via-[#0B0F17]/30 to-transparent flex flex-col justify-between p-4 sm:p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <span className="text-[11px] font-bold tracking-wider uppercase text-white/90">The Marketing Concept</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-white/70">Agency</span>
                            <span className="text-[10px] text-white/70">Work</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-[10px] text-white font-medium">Live Site</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase">Featured Project</span>
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                            The Marketing Concept Germany
                          </h3>
                          <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                            High-end corporate communications portal & conversion strategy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative -mt-0.5">
                    <div className="h-3.5 bg-gradient-to-b from-[#263147] to-[#121826] rounded-b-xl border-x border-b border-white/[0.1] shadow-xl flex justify-center items-center">
                      <div className="w-16 h-1 rounded-full bg-slate-700/60" />
                    </div>
                    <div className="w-4/5 mx-auto h-2 bg-blue-500/20 blur-md rounded-full mt-1" />
                  </div>
                </div>
              )}

              {/* DEVICE 2: SMARTPHONE VIEW */}
              {deviceMode === 'mobile' && (
                <div className="w-64 sm:w-72 rounded-[40px] p-3 bg-[#1B2234] border-2 border-slate-700 shadow-2xl shadow-blue-900/30 animate-in zoom-in-95 duration-200">
                  <div className="relative rounded-[32px] overflow-hidden bg-[#0D1424] aspect-[9/18.5] border border-white/[0.08]">
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 flex items-center justify-end px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    </div>

                    <img
                      src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
                      alt="Hiroki Digital Mobile Preview"
                      className="w-full h-full object-cover brightness-[0.88]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent flex flex-col justify-end p-4">
                      <span className="text-[10px] font-bold text-blue-400 uppercase">Live Mobile Experience</span>
                      <h4 className="text-sm font-bold text-white">Hiroki Digital Austria</h4>
                      <p className="text-[10px] text-slate-300 mt-0.5">High-speed mobile lead generation & marketing.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* DEVICE 3: STUDIO DISPLAY WIDESCREEN */}
              {deviceMode === 'monitor' && (
                <div className="w-full animate-in zoom-in-95 duration-200">
                  <div className="rounded-2xl p-2 bg-[#1B2234] border border-white/[0.12] shadow-2xl">
                    <div className="relative rounded-xl overflow-hidden bg-[#0D1424] aspect-[16/9]">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
                        alt="Floow2 Platform"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/95 via-transparent to-transparent flex flex-col justify-end p-4">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Enterprise Web App</span>
                        <h4 className="text-base font-bold text-white">Floow2 Circular Marketplace</h4>
                        <p className="text-[11px] text-slate-300">Widescreen dashboard & transaction analytics.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-[#253046] mx-auto" />
                  <div className="w-28 h-2 bg-[#1A2234] rounded-full mx-auto border border-white/[0.08]" />
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Credibility Stats Strip */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div
              onMouseEnter={playHover}
              className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-white/[0.06] hover:border-blue-500/40 transition-all duration-200 group cursor-default hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">20+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Projects Delivered</div>
              </div>
            </div>

            <div
              onMouseEnter={playHover}
              className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-white/[0.06] hover:border-blue-500/40 transition-all duration-200 group cursor-default hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">10+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Happy Clients</div>
              </div>
            </div>

            <div
              onMouseEnter={playHover}
              className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-white/[0.06] hover:border-blue-500/40 transition-all duration-200 group cursor-default hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4.9/5</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Client Rating</div>
              </div>
            </div>

            <div
              onMouseEnter={playHover}
              className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-white/[0.06] hover:border-blue-500/40 transition-all duration-200 group cursor-default hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100%</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">On-Time Delivery</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
