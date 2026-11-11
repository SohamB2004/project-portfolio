import React, { useState } from 'react';
import { X, Dices, Sparkles, ArrowUpRight, Flame } from 'lucide-react';
import { playPop, playChime } from '../utils/audioFx';
import { fireConfetti } from '../utils/confetti';

export default function SpinBriefModal({ isOpen, onClose, onSelectIdea }) {
  const deliverables = [
    { type: 'Web Design & Development', text: 'Fullstack MERN Web App' },
    { type: 'UI/UX Design', text: 'Interactive Figma Prototype & Design System' },
    { type: 'WordPress Solutions', text: 'Custom High-Speed WooCommerce Storefront' },
    { type: 'Video Editing', text: 'High-Retention 4K YouTube & Reel Edit' },
    { type: '3D Animation & CGI', text: 'Photorealistic 360° Product Commercial & Industrial Walkthrough' },
    { type: 'Generative AI & LLMs', text: 'Autonomous Multi-Agent Copilot & Enterprise RAG Pipeline' },
    { type: 'Web Design & Development', text: 'Modern SaaS Portal with Dark Mode' }
  ];

  const niches = [
    'Himalayan Travel & Expeditions',
    'B2B Sustainable Asset Sharing',
    'Luxury Real Estate & Architecture',
    'Artisan Coffee Roastery & Store',
    'Tech Hardware & Smart Devices',
    'Global Philanthropic Foundation'
  ];

  const superpowers = [
    'Sub-second 99+ Lighthouse speed score',
    'Hollywood-grade cinematic color grading',
    'Frictionless 1-page checkout conversion flow',
    'Micro-interactions & fluid animations',
    'Beat-synchronized sound design & foley',
    'Physical ray-traced caustics and 60fps turntable motion',
    'Sub-second hybrid vector search with zero hallucinations'
  ];

  const [currentDeliverable, setCurrentDeliverable] = useState(deliverables[0]);
  const [currentNiche, setCurrentNiche] = useState(niches[0]);
  const [currentSuperpower, setCurrentSuperpower] = useState(superpowers[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  if (!isOpen) return null;

  const spin = () => {
    setIsSpinning(true);
    playPop();

    let counter = 0;
    const interval = setInterval(() => {
      setCurrentDeliverable(deliverables[Math.floor(Math.random() * deliverables.length)]);
      setCurrentNiche(niches[Math.floor(Math.random() * niches.length)]);
      setCurrentSuperpower(superpowers[Math.floor(Math.random() * superpowers.length)]);
      counter++;

      if (counter > 12) {
        clearInterval(interval);
        setIsSpinning(false);
        playChime();
        fireConfetti();
      }
    }, 80);
  };

  const handleUseIdea = () => {
    playPop();
    onSelectIdea({
      serviceType: currentDeliverable.type,
      notes: `Creative Idea: ${currentDeliverable.text} for ${currentNiche} featuring ${currentSuperpower}.`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0D1322]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Dices className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Creative Project Generator</h3>
              <p className="text-[11px] text-slate-400">Playful slot machine for project inspiration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slot Machine Cards */}
        <div className="p-6 sm:p-8 space-y-5 text-center">
          
          <p className="text-xs text-slate-400">
            Spin the reels to discover unexpected combinations tailored to our design, web, and video capabilities:
          </p>

          <div className="space-y-3">
            {/* Reel 1: Deliverable */}
            <div className={`p-4 rounded-2xl bg-[#0D1322] border border-white/[0.08] transition-all duration-150 ${isSpinning ? 'scale-[0.98] border-blue-500/40 blur-[0.5px]' : ''}`}>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                What We Build
              </span>
              <div className="text-base sm:text-lg font-bold text-white mt-1">
                {currentDeliverable.text}
              </div>
            </div>

            {/* Reel 2: Niche */}
            <div className={`p-4 rounded-2xl bg-[#0D1322] border border-white/[0.08] transition-all duration-150 ${isSpinning ? 'scale-[0.98] border-purple-500/40 blur-[0.5px]' : ''}`}>
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                Target Industry / Brand
              </span>
              <div className="text-base sm:text-lg font-bold text-white mt-1">
                {currentNiche}
              </div>
            </div>

            {/* Reel 3: Superpower */}
            <div className={`p-4 rounded-2xl bg-[#0D1322] border border-white/[0.08] transition-all duration-150 ${isSpinning ? 'scale-[0.98] border-emerald-500/40 blur-[0.5px]' : ''}`}>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Creative Superpower
              </span>
              <div className="text-base sm:text-lg font-bold text-white mt-1">
                {currentSuperpower}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={spin}
              disabled={isSpinning}
              className="w-full sm:w-1/2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Rolling the dice...' : 'Spin New Combination'}</span>
            </button>

            <button
              onClick={handleUseIdea}
              disabled={isSpinning}
              className="w-full sm:w-1/2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-blue-400 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Build This With Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

