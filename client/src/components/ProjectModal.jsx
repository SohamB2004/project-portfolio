import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
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
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
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

          {/* Title and Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Completed for: <span className="text-slate-200 font-semibold">{project.client || 'Client Project'}</span>
              </p>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-sm transition-all shrink-0"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Project Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Highlights Checklist */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-2 border-t border-white/[0.06] space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Key Features & Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && (
            <div className="pt-2 border-t border-white/[0.06] space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Technologies & Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-sm font-bold text-white">Need a similar design or build?</h5>
              <p className="text-xs text-slate-400">Let's craft a custom solution tailored to your goals.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

