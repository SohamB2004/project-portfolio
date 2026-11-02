import React, { useState } from 'react';
import { playPop } from '../utils/audioFx';

export default function InteractiveReactions({ projectId, initialLikes = 12 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [floatingParticles, setFloatingParticles] = useState([]);

  const reactions = [
    { emoji: '🔥', label: 'Fire' },
    { emoji: '❤️', label: 'Love' },
    { emoji: '🚀', label: 'Next-Gen' },
    { emoji: '✨', label: 'Magic' },
  ];

  const handleReact = (e, rx) => {
    e.stopPropagation();
    playPop();
    setLikes((prev) => prev + 1);
    setSelectedReaction(rx.emoji);

    // Spawn floating particle
    const newParticle = {
      id: Date.now() + Math.random(),
      emoji: rx.emoji,
      x: (Math.random() - 0.5) * 30,
    };

    setFloatingParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  };

  return (
    <div
      className="relative inline-flex items-center gap-1.5 p-1 rounded-full bg-black/40 border border-white/[0.08] backdrop-blur-md"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Floating Burst Particles */}
      {floatingParticles.map((p) => (
        <span
          key={p.id}
          className="absolute -top-6 left-1/2 pointer-events-none text-base animate-out fade-out slide-out-to-top duration-1000 select-none z-30 font-bold"
          style={{ transform: `translateX(${p.x}px)` }}
        >
          {p.emoji} <span className="text-[10px] text-blue-400 font-bold">+1</span>
        </span>
      ))}

      {/* Mini reaction buttons */}
      <div className="flex items-center gap-0.5">
        {reactions.map((rx) => (
          <button
            key={rx.label}
            onClick={(e) => handleReact(e, rx)}
            title={rx.label}
            className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-xs transition-transform active:scale-125 hover:scale-110"
          >
            <span>{rx.emoji}</span>
          </button>
        ))}
      </div>

      {/* Count pill */}
      <span className="text-[10px] font-bold text-slate-300 pr-1.5 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        {likes}
      </span>
    </div>
  );
}

