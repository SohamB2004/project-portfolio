import React from 'react';
import { ArrowUp, ArrowUpRight, Heart, Code } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070A10] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/shivera-logo.png"
                alt="Shivera - Technology • Media • Creative • AI"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A high-precision freelance studio crafting intuitive digital designs, high-performance websites, and engaging videos for global businesses and creators.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-300">
              <Code className="w-3.5 h-3.5 text-blue-400" />
              <span>Built with the MERN Stack</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Gen AI', '3D Animation', 'Portfolio', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services List */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Paid Services
            </h4>
            <ul className="space-y-2">
              <li className="text-slate-300">UI/UX Design & Prototyping (Figma)</li>
              <li className="text-slate-300">Web Design & MERN Stack Development</li>
              <li className="text-slate-300">Custom WordPress & WooCommerce Builds</li>
              <li className="text-slate-300">Cinematic Video Editing (YouTube, Reels, Ads)</li>
              <li className="text-slate-300">3D Animation & CGI (Industry, Factory, Product)</li>
              <li className="text-slate-300">Generative AI, Autonomous Agents & Enterprise RAG</li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Shivera. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

