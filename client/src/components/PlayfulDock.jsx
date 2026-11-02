import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Dices, Palette, Command, ChevronUp, ChevronDown } from 'lucide-react';
import { playPop, playSparkle } from '../utils/audioFx';
import { fireConfetti } from '../utils/confetti';

export default function PlayfulDock({
  soundActive,
  onToggleSound,
  onOpenSpinModal,
  onOpenCommandPalette,
  activeTheme,
  onSelectTheme
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const themes = [
    { id: 'blue', name: 'Electric Blue', hex: '#3B82F6' },
    { id: 'cyan', name: 'Cyber Cyan', hex: '#06B6D4' },
    { id: 'violet', name: 'Neon Violet', hex: '#8B5CF6' },
    { id: 'emerald', name: 'Emerald', hex: '#10B981' },
    { id: 'amber', name: 'Amber Sunset', hex: '#F59E0B' },
  ];

  const handleConfettiClick = (e) => {
    playSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 font-sans select-none">
      
      {/* Accent Color Palette Popover */}
      {showColorPicker && (
        <div className="p-2.5 rounded-2xl bg-[#111827]/95 border border-white/[0.12] backdrop-blur-xl shadow-2xl flex items-center gap-2 animate-in fade-in zoom-in-95 duration-150 mb-1">
          <span className="text-[11px] font-bold text-slate-300 pl-1 pr-1.5">Accents:</span>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                playPop();
                onSelectTheme(t.id);
                setShowColorPicker(false);
              }}
              title={t.name}
              className={`w-6 h-6 rounded-full transition-transform duration-150 flex items-center justify-center ${
                activeTheme === t.id ? 'scale-125 ring-2 ring-white shadow-md' : 'hover:scale-110 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: t.hex }}
            />
          ))}
        </div>
      )}

      {/* Floating Capsule Dock */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#111827]/90 border border-white/[0.12] backdrop-blur-xl shadow-2xl transition-all duration-300">
        
        {isExpanded && (
          <>
            {/* 1. Creative Idea Spinner */}
            <button
              onClick={() => {
                playPop();
                onOpenSpinModal();
              }}
              title="🎲 Spin Project Idea Generator"
              className="px-3 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/30 text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 group"
            >
              <Dices className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline">Spin Idea</span>
            </button>

            {/* 2. Confetti Cannon */}
            <button
              onClick={handleConfettiClick}
              title="🎉 Launch Confetti!"
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-amber-400 flex items-center justify-center transition-all hover:scale-110 active:scale-90"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* 3. Theme Color Switcher */}
            <button
              onClick={() => {
                playPop();
                setShowColorPicker(!showColorPicker);
              }}
              title="🎨 Change Accent Theme"
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-purple-400 flex items-center justify-center transition-all hover:scale-110 active:scale-90"
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* 4. Sound Toggle */}
            <button
              onClick={() => {
                onToggleSound();
              }}
              title={soundActive ? 'Mute Web Audio' : 'Enable Web Audio Sound FX'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${
                soundActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-400'
              }`}
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* 5. Command Palette Trigger */}
            <button
              onClick={() => {
                playPop();
                onOpenCommandPalette();
              }}
              title="Command Palette (Ctrl + K)"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-mono transition-all hover:text-white"
            >
              <Command className="w-3 h-3 text-blue-400" />
              <span className="text-[10px]">K</span>
            </button>
          </>
        )}

        {/* Minimize / Maximize Toggle */}
        <button
          onClick={() => {
            playPop();
            setIsExpanded(!isExpanded);
          }}
          title={isExpanded ? 'Collapse Dock' : 'Open Playful Studio Dock'}
          className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors text-xs"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-blue-400" />}
        </button>

      </div>
    </div>
  );
}

