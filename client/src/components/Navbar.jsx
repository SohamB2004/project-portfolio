import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Command, Volume2, VolumeX } from 'lucide-react';
import { playPop, playHover } from '../utils/audioFx';

export default function Navbar({
  onOpenQuoteModal,
  onOpenCommandPalette,
  soundActive,
  onToggleSound
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: '3D Animation', href: '#animation' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F17]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with interactive pulse */}
          <a
            href="#home"
            onClick={playPop}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-glow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              GenUI <span className="text-blue-500 font-semibold">Studio</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={playPop}
                onMouseEnter={playHover}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 hover:-translate-y-0.5 inline-block"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Command Palette + Sound Toggle + CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Command Palette Button */}
            <button
              onClick={() => {
                playPop();
                onOpenCommandPalette();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-400 hover:text-white transition-all"
              title="Search and Commands (Ctrl + K)"
            >
              <Command className="w-3.5 h-3.5 text-blue-400" />
              <span>⌘K</span>
            </button>

            {/* Quick Sound Toggle */}
            <button
              onClick={onToggleSound}
              title={soundActive ? 'Mute Sound Effects' : 'Turn On Interactive Audio FX'}
              className={`p-2 rounded-full border transition-all ${
                soundActive
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Main CTA */}
            <button
              onClick={() => {
                playPop();
                onOpenQuoteModal();
              }}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-glow-sm transform active:scale-95 group"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg text-slate-300 hover:text-white"
            >
              {soundActive ? <Volume2 className="w-5 h-5 text-blue-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0D1322]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playPop();
                  setMobileMenuOpen(false);
                }}
                className="text-base font-medium text-slate-200 hover:text-blue-400 py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono text-slate-300 bg-white/[0.06] border border-white/[0.08]"
            >
              <Command className="w-3.5 h-3.5 text-blue-400" />
              <span>Search & Quick Menu (⌘K)</span>
            </button>

            <button
              onClick={() => {
                playPop();
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
