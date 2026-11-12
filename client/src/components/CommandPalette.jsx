import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, ExternalLink, Calculator, Sparkles, Volume2, Video, Globe, Palette, X } from 'lucide-react';
import { playPop, playChime } from '../utils/audioFx';
import { fireConfetti } from '../utils/confetti';

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenQuoteModal,
  onOpenSpinModal,
  onTriggerConfetti,
  onToggleSound,
  soundActive
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'quote',
      title: 'Request a Project Quote & Timeline',
      category: 'Estimates',
      icon: Calculator,
      action: () => {
        onClose();
        onOpenQuoteModal();
      }
    },
    {
      id: 'spin',
      title: 'Spin Creative Brief Generator (Mini-Game)',
      category: 'Playful',
      icon: Sparkles,
      action: () => {
        onClose();
        onOpenSpinModal();
      }
    },
    {
      id: 'confetti',
      title: 'Launch Celebration Confetti Cannon',
      category: 'Playful',
      icon: Sparkles,
      action: () => {
        onClose();
        onTriggerConfetti();
      }
    },
    {
      id: 'sound',
      title: soundActive ? 'Mute Sound Effects' : 'Enable Web Audio Sound Effects',
      category: 'Settings',
      icon: Volume2,
      action: () => {
        onToggleSound();
        onClose();
      }
    },
    {
      id: 'services',
      title: 'Jump to Services & Packages',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        onClose();
        window.location.hash = '#services';
      }
    },
    {
      id: 'ai',
      title: 'Explore Generative AI, Agents & Enterprise RAG Systems',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        onClose();
        window.location.hash = '#ai';
      }
    },
    {
      id: 'animation',
      title: 'Explore 3D Animation & CGI (Industry, Factory, Product)',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        onClose();
        window.location.hash = '#animation';
      }
    },
    {
      id: 'portfolio',
      title: 'Browse Full Portfolio (Web & Video)',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        onClose();
        window.location.hash = '#portfolio';
      }
    },
    {
      id: 'floow2',
      title: 'Floow2 – B2B Circular Sharing Platform',
      category: 'Live Project',
      icon: Globe,
      action: () => {
        window.open('https://floow2.com/', '_blank');
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Direct Contact & Let’s Work Together',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        onClose();
        window.location.hash = '#contact';
      }
    }
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playPop();
        onClose();
      }
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        playPop();
        filtered[selectedIndex].action();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedIndex, filtered, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#0D1322] gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or tool... (e.g. quote, video, confetti)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-slate-400 border border-white/[0.08]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands or projects found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playPop();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-white/[0.06] text-blue-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold">{item.title}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/[0.04] text-slate-500'
                  }`}>
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#0A0E17] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">↑</kbd> <kbd className="font-mono bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">↓</kbd> navigate</span>
            <span><kbd className="font-mono bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">↵</kbd> select</span>
          </div>
          <span>Shivera Command Menu</span>
        </div>

      </div>

    </div>
  );
}

