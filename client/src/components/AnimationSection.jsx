import React, { useState, useRef } from 'react';
import { Box, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2, ArrowUpRight, Layers, Factory, Gem, Building2, Eye, X } from 'lucide-react';
import { animationProjects } from '../data/portfolioData';
import InteractiveReactions from './InteractiveReactions';
import { playPop, playHover } from '../utils/audioFx';

export default function AnimationSection({ onOpenQuoteModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const categories = [
    { id: 'All', label: 'All 3D Works', icon: Box },
    { id: 'Factory & Process', label: 'Factory & Boiler Process 3D', icon: Factory },
    { id: 'Product Animation', label: 'Product-Based 3D', icon: Gem },
    { id: 'Industry Animation', label: 'Industry & Architectural 3D', icon: Building2 },
  ];

  const filteredProjects = activeCategory === 'All'
    ? animationProjects
    : animationProjects.filter((p) => p.subCategory === activeCategory);

  const toggleVideoPlay = () => {
    playPop();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVideoMute = () => {
    playPop();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartVideo = () => {
    playPop();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const pillars = [
    {
      title: "Product-Based 3D",
      subtitle: "Commercials & 360° E-Commerce",
      icon: Gem,
      description: "From luxury jewelry with diamond dispersion to high-tech gadgets and tactile designer furniture. Crafted to drive pre-orders, e-commerce conversions, and brand prestige.",
      points: ["360° turntable loops", "Caustic light dispersion", "Photorealistic PBR materials", "Exploded-view mechanisms"]
    },
    {
      title: "Industry-Based 3D",
      subtitle: "Architectural & Heritage Spaces",
      icon: Building2,
      description: "Atmospheric spatial walkthroughs of grand banquet halls, cultural pavilions, and modern architectural developments with true-to-life daylighting and sightline simulations.",
      points: ["Daylight & sun angle studies", "Heritage relief ornamentation", "Acoustic spatial layout", "Volumetric atmospheric lighting"]
    },
    {
      title: "Factory & Boiler Plant 3D",
      subtitle: "Thermal & Industrial Process Animation",
      icon: Factory,
      description: "High-precision CAD animations for heavy industrial boiler plants, biomass furnace systems, cyclone particulate separators, high-elevation flue stacks, and factory piping loops.",
      points: ["Boiler & furnace thermal loop modeling", "Cyclone separator & filtration stages", "High-elevation flue stack & ducting", "Full facility isometric walkthroughs"]
    }
  ];

  return (
    <section id="animation" className="relative py-20 sm:py-28 bg-[#0B0F17] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Box className="w-3.5 h-3.5" />
              <span>3D Animation Studio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              3D Animation: <br className="hidden sm:inline" />
              <span className="text-blue-500">Industry, Factory & Product</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Photorealistic 3D visualization, cinematic camera walkthroughs, and commercial animations. We bring physical products, industrial plants, and architectural spaces to life with ray-traced lighting.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal({ serviceType: '3D Animation & CGI' })}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-sm transition-all active:scale-95 group"
            >
              <span>Get a 3D Animation Quote</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 3 Pillars Overview Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="rounded-2xl bg-[#111827]/80 hover:bg-[#131E33] border border-white/[0.08] hover:border-blue-500/40 p-6 sm:p-7 transition-all duration-300 shadow-lg hover:shadow-glow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-400 mb-2.5">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FEATURED 3D VIDEO SPOTLIGHT: Jena Diamond Ring 360° */}
        <div className="mb-16 relative rounded-3xl bg-[#111827] border border-white/[0.08] p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Interactive Video Player */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-white/[0.12] shadow-2xl group">
                <video
                  ref={videoRef}
                  src="/animation/jena-ring-animation.mp4"
                  poster="/animation/photo_2026-11-05_00-28-05.jpg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleVideoPlay}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
                      title={isPlaying ? "Pause Video" : "Play Video"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>

                    <button
                      onClick={restartVideo}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={toggleVideoMute}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-300 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                      360° HD Commercial Loop
                    </span>
                  </div>
                </div>

                {/* Floating 360 Spin Badge */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Live 3D Render Reel
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Breakdown */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Gem className="w-4 h-4" />
                <span>Featured 3D Product Showcase</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Jena Diamond Ring – 360° Luxury Commercial
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Photorealistic 360-degree turntable animation highlighting diamond light dispersion, ray-traced caustics, and micro-precision metal reflections for luxury jewelry marketing.
              </p>

              <div className="space-y-2.5 pt-1">
                {[
                  "Physically accurate light dispersion and diamond caustics",
                  "Studio 3-point softbox lighting with specular edge glints",
                  "Precision procedural gold and platinum metal shaders",
                  "Seamless 60fps 360-degree turntable loop for e-commerce"
                ].map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap gap-2">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300">Blender Cycles</span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300">PBR Caustics</span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300">4K 60FPS</span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300">Luxury Commercial</span>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Tabs for 3D Works */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playPop();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playHover}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 ${
                  active
                    ? 'bg-blue-600 text-white shadow-glow-sm'
                    : 'bg-[#131B2E] text-slate-300 hover:text-white hover:bg-[#1A253F] border border-white/[0.08]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Renders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={playHover}
              onClick={() => {
                playPop();
                setSelectedItem(project);
              }}
              className="group relative rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/40 overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-glow-sm flex flex-col hover:-translate-y-1.5"
            >
              {/* Media Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top-Right Badge: Category */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-semibold backdrop-blur-md shadow-md flex items-center gap-1">
                    {project.isVideo || project.youtubeId ? <Play className="w-3 h-3 fill-white" /> : <Box className="w-3 h-3" />}
                    {project.subCategory}
                  </span>
                </div>

                {/* Top-Left: Interactive Reactions */}
                <div className="absolute top-3 left-3 z-10">
                  <InteractiveReactions projectId={project.id} initialLikes={18 + (index * 9) % 31} />
                </div>

                {/* Hover Eye Trigger */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-blue-600/90 flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Gradient bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111827] to-transparent" />
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-blue-400 font-semibold mb-1.5">
                    <span>{project.categoryTag}</span>
                    <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-blue-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-slate-300">{project.engine || 'Ray-Traced 3D'}</span>
                  <span className="text-blue-400 font-semibold group-hover:underline">Inspect 3D Detail ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive 3D Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0D1322] shrink-0">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {selectedItem.categoryTag}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{selectedItem.subCategory}</span>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Media Display */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black border border-white/[0.08]">
                {selectedItem.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedItem.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedItem.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : selectedItem.isVideo ? (
                  <video
                    src={selectedItem.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title & Client */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Application: <span className="text-slate-200 font-semibold">{selectedItem.client}</span> • Engine: <span className="text-blue-400 font-semibold">{selectedItem.engine}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onOpenQuoteModal({
                      serviceType: '3D Animation & CGI',
                      notes: `Interested in 3D project similar to: ${selectedItem.title}`
                    });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-sm transition-all shrink-0 active:scale-95"
                >
                  <span>Request Similar 3D Animation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Technical Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedItem.longDescription || selectedItem.description}
                </p>
              </div>

              {/* Highlights */}
              {selectedItem.highlights && (
                <div className="pt-2 border-t border-white/[0.06] space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Rendering Specifications & Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedItem.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedItem.tags && (
                <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

