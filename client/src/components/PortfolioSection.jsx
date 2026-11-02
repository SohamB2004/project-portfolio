import React, { useState } from 'react';
import { Play, ArrowUpRight, ExternalLink, Sparkles, Filter } from 'lucide-react';
import InteractiveReactions from './InteractiveReactions';
import { playPop, playHover } from '../utils/audioFx';

export default function PortfolioSection({
  projects,
  onOpenVideoModal,
  onOpenProjectModal
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Websites', 'UI/UX', 'WordPress', 'Video Edits'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 bg-[#0B0F17]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Work</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Portfolio
            </h2>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl">
              A selection of our recent projects across design, development and video.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-sm text-slate-400">
            Showing <span className="font-semibold text-blue-400">{filteredProjects.length}</span> featured works
          </div>
        </div>

        {/* Filter Tabs with playful audio pops */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playPop();
                setActiveCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-glow-sm'
                  : 'bg-[#131B2E] text-slate-300 hover:text-white hover:bg-[#1A253F] border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project, index) => {
            const isVideo = project.category === 'Video Edits' || Boolean(project.youtubeId);

            return (
              <div
                key={project.id}
                onMouseEnter={playHover}
                onClick={() => {
                  playPop();
                  if (isVideo) {
                    onOpenVideoModal(project);
                  } else {
                    onOpenProjectModal(project);
                  }
                }}
                className="group relative rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/40 overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-glow-sm flex flex-col hover:-translate-y-1.5"
              >
                {/* Media Image / Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-Right Badge: Live or Video */}
                  <div className="absolute top-3 right-3 z-10">
                    {project.isExternal ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-semibold backdrop-blur-md flex items-center gap-1 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Live Website
                      </span>
                    ) : isVideo ? (
                      <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-semibold backdrop-blur-md flex items-center gap-1 shadow-md">
                        <Play className="w-3 h-3 fill-white" />
                        YouTube
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-blue-600/80 text-white text-[11px] font-semibold backdrop-blur-md">
                        {project.category}
                      </span>
                    )}
                  </div>

                  {/* Top-Left: Playful Interactive Reactions Bar */}
                  <div className="absolute top-3 left-3 z-10">
                    <InteractiveReactions projectId={project.id} initialLikes={14 + (index * 7) % 23} />
                  </div>

                  {/* Large Circular Play Button in Center for Video Edits */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-600/90 to-purple-600/90 p-[2px] shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-[#0B0F17]/80 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dark gradient fade at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111827] to-transparent" />
                </div>

                {/* Card Content & Meta */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag Line */}
                    <div className="flex items-center justify-between text-xs text-blue-400 font-semibold mb-1.5">
                      <span>{project.categoryTag || project.category}</span>
                      <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-blue-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 mb-2">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags Pill Row */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {project.tags && project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.04]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
