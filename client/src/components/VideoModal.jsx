import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function VideoModal({ project, onClose }) {
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
        className="relative w-full max-w-4xl rounded-3xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0D1322]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {project.categoryTag || "Video Editing Showcase"}
            </span>
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

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Meta & Details */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[40vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h3>
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-2 border-t border-white/[0.06]">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Editing Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-2 flex flex-wrap gap-2">
            {project.tags && project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-glow-sm transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <span className="text-[11px] text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] font-mono text-slate-300 text-[10px]">Esc</kbd> or click outside to return
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
