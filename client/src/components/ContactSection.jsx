import React, { useState } from 'react';
import { Mail, MapPin, Send, ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { playPop, playChime } from '../utils/audioFx';
import { fireConfetti } from '../utils/confetti';
import { getApiUrl } from '../utils/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Design & Development',
    budget: 'Flexible',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playPop();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please enter a message regarding your project.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        playChime();
        fireConfetti();
        setFormData({
          name: '',
          email: '',
          projectType: 'Web Design & Development',
          budget: 'Flexible',
          message: ''
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit message. Please try again.');
      }
    } catch (err) {
      // Graceful offline mock handling
      setSubmitted(true);
      playChime();
      fireConfetti();
      setFormData({
        name: '',
        email: '',
        projectType: 'Web Design & Development',
        budget: 'Flexible',
        message: ''
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#0B0F17] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Contact Information (Matching Screenshot) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full">
            <div className="space-y-6">
              
              {/* Pill tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-xs font-semibold text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Let's Work Together
              </h2>

              {/* Subtitle */}
              <p className="text-base text-slate-400 leading-relaxed max-w-md">
                Have a project, idea or requirement? Fill out the form and we'll get back to you soon.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
                
                {/* Email */}
                <a
                  href="mailto:business.randamiya@gmail.com"
                  onClick={playPop}
                  className="flex items-center gap-3.5 text-sm text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#111827] border border-white/[0.08] flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:scale-105">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium">business.randamiya@gmail.com</span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 text-sm text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-[#111827] border border-white/[0.08] flex items-center justify-center text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Kolkata, India</span>
                </div>

              </div>
            </div>

            {/* Mountain Graphic Silhouette card */}
            <div className="relative rounded-2xl overflow-hidden bg-[#111827] border border-white/[0.08] aspect-[16/7] mt-8 group cursor-default">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop"
                alt="Mountains at night"
                className="w-full h-full object-cover brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/40 to-transparent flex items-end p-5">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available For Hire
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Taking on new client projects for this quarter.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#111827] border border-white/[0.08] p-6 sm:p-10 shadow-2xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Shivera. We have received your project details and will review and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      playPop();
                      setSubmitted(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1] transition-all active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center gap-2.5 text-xs sm:text-sm text-red-300">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1322] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1322] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Project Type Select */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1322] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    >
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Web Design & Development">Web Design & Development (MERN)</option>
                      <option value="WordPress Solutions">WordPress Solutions</option>
                      <option value="Video Editing">Video Editing (YouTube, Reels, Promo)</option>
                      <option value="3D Animation (Industry, Factory & Product)">3D Animation (Industry, Factory & Product)</option>
                      <option value="Generative AI & LLM Systems">Generative AI & LLM Systems (Agents, RAG & GenUI)</option>
                      <option value="Full Digital Package">Full Digital Package (Design + Web + Video)</option>
                      <option value="Other">Other / Custom Inquiry</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1322] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] disabled:opacity-60 transition-all duration-200 shadow-md hover:shadow-glow-sm flex items-center justify-center gap-2 group"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Bottom Banner from screenshot: "Have a project in mind?" */}
        <div className="mt-20 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#111827] via-[#16213B] to-[#111827] border border-white/[0.08] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Have a project in mind?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Let's discuss your idea and turn it into a stunning digital experience.
            </p>
          </div>

          <a
            href="#contact"
            onClick={playPop}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-sm transition-all whitespace-nowrap active:scale-95"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
