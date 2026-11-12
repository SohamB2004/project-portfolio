import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, ArrowUpRight, Sparkles, ArrowLeft } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenQuoteModal }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      {/* Floating Top-Right Exit Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Website</span>
      </button>

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0D1322] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {project.categoryTag || project.category}
            </span>
            {project.client && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{project.client}</span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 hover:text-white border border-white/[0.12] flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
            aria-label="Back to website"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
            <X className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Main Visual */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-white/[0.08]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {project.isExternal && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Live Website
                </span>
              </div>
            )}
          </div>

          {/* Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {project.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Completed {project.year || '2024'} • {project.client || 'Client Project'}
              </p>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-sm transition-all active:scale-95 shrink-0"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Project Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Deliverables / Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Key Deliverables & Engineering
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-white/[0.03] p-3 rounded-xl border border-white/[0.05]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tech Stack & Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 hover:text-white border border-white/[0.12] text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>

            {onOpenQuoteModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteModal();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-glow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Request Similar Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
