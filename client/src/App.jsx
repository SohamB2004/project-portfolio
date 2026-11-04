import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AnimationSection from './components/AnimationSection';
import PortfolioSection from './components/PortfolioSection';
import ProjectDetailShowcase from './components/ProjectDetailShowcase';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import ProjectModal from './components/ProjectModal';
import QuoteCalculatorModal from './components/QuoteCalculatorModal';
import CustomCursor from './components/CustomCursor';
import PlayfulDock from './components/PlayfulDock';
import SpinBriefModal from './components/SpinBriefModal';
import CommandPalette from './components/CommandPalette';
import { fallbackProjects } from './data/portfolioData';
import { toggleSound, isSoundEnabled, playSparkle } from './utils/audioFx';
import { fireConfetti } from './utils/confetti';
import { getApiUrl } from './utils/api';

export default function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState({});
  const [soundActive, setSoundActive] = useState(false);
  const [activeTheme, setActiveTheme] = useState('blue');

  // Load dynamic projects from MERN Express API
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(getApiUrl('/api/projects'));
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setProjects(json.data);
          }
        }
      } catch (err) {
        console.log('Using robust static portfolio dataset:', err);
      }
    }
    loadProjects();
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  const handleSelectService = (service) => {
    setQuoteInitialData({ serviceType: service.title });
    setIsQuoteModalOpen(true);
  };

  const handleSelectIdeaFromSpinner = (idea) => {
    setQuoteInitialData(idea);
    setIsQuoteModalOpen(true);
  };

  const handleTriggerConfetti = () => {
    playSparkle();
    fireConfetti();
  };

  const handleSelectTheme = (themeId) => {
    setActiveTheme(themeId);
    // Dynamic theme styling adjustments
    document.documentElement.setAttribute('data-theme', themeId);
  };

  return (
    <div className={`min-h-screen bg-[#0B0F17] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white theme-${activeTheme}`}>
      
      {/* Playful Interactive Custom Glow Cursor */}
      <CustomCursor />

      {/* Top Floating Glass Navigation */}
      <Navbar
        onOpenQuoteModal={() => {
          setQuoteInitialData({});
          setIsQuoteModalOpen(true);
        }}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenQuoteModal={() => {
            setQuoteInitialData({});
            setIsQuoteModalOpen(true);
          }}
          onOpenProjectModal={(p) => setActiveProjectModal(p)}
        />

        <ServicesSection onSelectService={handleSelectService} />

        <AnimationSection onOpenQuoteModal={handleSelectService} />

        <PortfolioSection
          projects={projects}
          onOpenVideoModal={(p) => setActiveVideoModal(p)}
          onOpenProjectModal={(p) => setActiveProjectModal(p)}
        />

        <ProjectDetailShowcase
          onOpenProjectModal={(p) => setActiveProjectModal(p)}
        />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Playful Floating Control Dock */}
      <PlayfulDock
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
        onOpenSpinModal={() => setIsSpinModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeTheme={activeTheme}
        onSelectTheme={handleSelectTheme}
      />

      {/* Modals */}
      {activeVideoModal && (
        <VideoModal
          project={activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
        />
      )}

      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
          onOpenQuoteModal={() => {
            setQuoteInitialData({ serviceType: activeProjectModal.categoryTag || 'Web Design & Development' });
            setIsQuoteModalOpen(true);
          }}
        />
      )}

      <QuoteCalculatorModal
        isOpen={isQuoteModalOpen}
        initialData={quoteInitialData}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <SpinBriefModal
        isOpen={isSpinModalOpen}
        onClose={() => setIsSpinModalOpen(false)}
        onSelectIdea={handleSelectIdeaFromSpinner}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenQuoteModal={() => {
          setQuoteInitialData({});
          setIsQuoteModalOpen(true);
        }}
        onOpenSpinModal={() => setIsSpinModalOpen(true)}
        onTriggerConfetti={handleTriggerConfetti}
        onToggleSound={handleToggleSound}
        soundActive={soundActive}
      />

    </div>
  );
}
