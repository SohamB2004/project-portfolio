import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function ProjectDetailShowcase({ onOpenProjectModal }) {
  const showcaseProjects = [
    {
      id: "travel-himalayas",
      breadcrumb: "Travel Company Website",
      title: "Travel Company Website",
      tagline: "A modern, responsive travel website to showcase destinations, packages and bookings with a clean, immersive UI.",
      highlights: [
        "UI/UX Design & Design Tokens",
        "Responsive MERN Website Architecture",
        "Booking & Inquiry System with Instant Email Alerts",
        "SEO-Friendly & Fast (99/100 Lighthouse Performance)"
      ],
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
      screenOverlayTitle: "Explore The Himalayas",
      link: null,
      isMockup: true
    },
    {
      id: "floow2",
      breadcrumb: "Floow2 – Circular Economy",
      title: "Floow2 Enterprise Platform",
      tagline: "Pioneering international B2B sharing marketplace enabling corporate asset exchange and sustainable operations.",
      highlights: [
        "Scalable Multi-Tenant Catalog Architecture",
        "B2B Equipment & Materials Transaction Flows",
        "High Performance Responsive UI/UX Interface",
        "Enterprise Data Filtering & Analytics Dashboard"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      screenOverlayTitle: "Floow2 B2B Marketplace",
      link: "https://floow2.com/",
      isMockup: false
    },
    {
      id: "the-marketing-concept",
      breadcrumb: "The Marketing Concept",
      title: "The Marketing Concept Germany",
      tagline: "A brand-elevating digital portal for a premier German marketing agency, combining high aesthetics and conversion strategy.",
      highlights: [
        "Bespoke High-End Visual Narrative & Typography",
        "Fluid Micro-Interactions & Smooth Scrolling",
        "German Corporate Web Standards & GDPR Strict Compliance",
        "Tailored Client Acquisition & Inquiry Funnel"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      screenOverlayTitle: "Strategic Digital Agency",
      link: "https://themarketingconcept.de/index.html",
      isMockup: false
    },
    {
      id: "hiroki-digital",
      breadcrumb: "Hiroki Digital Austria",
      title: "Hiroki Digital Marketing & Tech",
      tagline: "Austrian high-performance digital marketing and technology platform engineered for fast conversions and SEO dominance.",
      highlights: [
        "Custom Lightweight WordPress Architecture",
        "Targeted Conversion Lead Generation Funnels",
        "Ultra-Fast Page Load Times (95+ Lighthouse Score)",
        "European Privacy-Compliant Tracking Integration"
      ],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      screenOverlayTitle: "Hiroki Digital Performance",
      link: "https://hiroki-digital.at/",
      isMockup: false
    },
    {
      id: "federer-foundation",
      breadcrumb: "Roger Federer Foundation",
      title: "Roger Federer Foundation",
      tagline: "Global philanthropic foundation web portal empowering educational initiatives for children across Southern Africa and Switzerland.",
      highlights: [
        "Multilingual Global Architecture & Storytelling",
        "Transparent Educational Progress & Financial Reporting",
        "WCAG-Compliant Accessible Design System",
        "High-Traffic Reliability & Scalable CMS"
      ],
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      screenOverlayTitle: "Global Philanthropy Portal",
      link: "https://federerfoundation.org/",
      isMockup: false
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? showcaseProjects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === showcaseProjects.length - 1 ? 0 : prev + 1));
  };

  const active = showcaseProjects[currentIndex];

  return (
    <section className="relative py-16 sm:py-24 bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Spotlight Showcase Container - Matching Screenshot */}
        <div className="relative rounded-3xl bg-[#111827] border border-white/[0.08] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          
          {/* Ambient blue glow behind mockup */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="text-blue-400">Portfolio</span>
                <span>&gt;</span>
                <span className="text-slate-300">{active.breadcrumb}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {active.title}
              </h3>

              {/* Tagline */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {active.tagline}
              </p>

              {/* Project Highlights Checklist (with green checkmarks matching screenshot) */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Project Highlights
                </h4>
                <div className="space-y-3">
                  {active.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-200">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 flex items-center gap-4">
                {active.link ? (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-sm transition-all"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenProjectModal(active)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-sm transition-all"
                  >
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Laptop Display with Carousel Navigation */}
            <div className="lg:col-span-6 relative flex flex-col items-center">
              
              {/* Laptop Frame */}
              <div className="relative w-full max-w-lg group">
                
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0B0F17]/80 hover:bg-blue-600 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-90"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0B0F17]/80 hover:bg-blue-600 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-90"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Laptop Display Chassis */}
                <div className="rounded-t-2xl p-2.5 bg-[#1B2234] border border-white/[0.12] shadow-2xl">
                  {/* Camera hole */}
                  <div className="flex justify-center mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>

                  {/* Inner Screen */}
                  <div className="relative rounded-lg overflow-hidden bg-[#0D1424] aspect-[16/10]">
                    <img
                      src={active.image}
                      alt={active.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />

                    {/* Dark gradient and headline overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/95 via-black/20 to-transparent flex flex-col justify-end p-5">
                      <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                        {active.breadcrumb}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {active.screenOverlayTitle}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="h-3.5 bg-gradient-to-b from-[#253046] to-[#121826] rounded-b-xl border-x border-b border-white/[0.1] shadow-xl flex justify-center items-center">
                  <div className="w-16 h-1 rounded-full bg-slate-700/60" />
                </div>
              </div>

              {/* Pagination Dots (Matching Screenshot) */}
              <div className="flex items-center gap-2 mt-6">
                {showcaseProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

