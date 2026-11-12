import React, { useState, useEffect } from 'react';
import { X, Calculator, ArrowUpRight, CheckCircle2, Clock, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { playPop, playChime } from '../utils/audioFx';
import { fireConfetti } from '../utils/confetti';
import { getApiUrl } from '../utils/api';

export default function QuoteCalculatorModal({ isOpen, onClose, initialData = {} }) {
  const [serviceType, setServiceType] = useState(initialData.serviceType || 'Web Design & Development');
  const [scope, setScope] = useState('Medium');
  const [urgency, setUrgency] = useState('Standard');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(initialData.notes || '');
  const [submitting, setSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Timeline calculation based on service & scope
  const calculateTimeline = () => {
    let days = "2-3 Weeks";

    if (serviceType === 'UI/UX Design') {
      days = scope === 'Large' ? '3 Weeks' : scope === 'Medium' ? '1-2 Weeks' : '5-7 Days';
    } else if (serviceType === 'Web Design & Development') {
      days = scope === 'Large' ? '3-4 Weeks' : scope === 'Medium' ? '2 Weeks' : '10 Days';
    } else if (serviceType === 'WordPress Solutions') {
      days = scope === 'Large' ? '2-3 Weeks' : scope === 'Medium' ? '1-2 Weeks' : '5-7 Days';
    } else if (serviceType === 'Video Editing') {
      days = scope === 'Large' ? '5-7 Days' : scope === 'Medium' ? '3-4 Days' : '48 Hours';
    } else if (serviceType === '3D Animation & CGI' || serviceType.includes('3D')) {
      days = scope === 'Large' ? '3-4 Weeks' : scope === 'Medium' ? '2 Weeks' : '7-10 Days';
    } else if (serviceType === 'Generative AI & LLMs' || serviceType.includes('AI') || serviceType.includes('LLM')) {
      days = scope === 'Large' ? '3-4 Weeks' : scope === 'Medium' ? '2 Weeks' : '7-10 Days';
    }

    if (urgency === 'Rush') {
      days = `${days} (Expedited)`;
    }

    return days;
  };

  const estimatedTimeline = calculateTimeline();

  const handleSendQuote = async (e) => {
    e.preventDefault();
    playPop();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      // Direct email dispatch to business.shivera@gmail.com
      await fetch('https://formsubmit.co/ajax/business.shivera@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim() || 'Prospective Client',
          email: email.trim(),
          serviceType: serviceType,
          scope: scope,
          urgency: urgency,
          notes: notes.trim() || 'No additional notes provided.',
          _subject: `New Project Quote Request for ${serviceType} (${scope} Scope)`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      // Background backup to internal API
      try {
        fetch(getApiUrl('/api/quote'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceType,
            scope,
            urgency,
            name: name || 'Prospective Client',
            email,
            notes,
            budget: 'To be discussed'
          })
        }).catch(() => {});
      } catch (err) {}

      setQuoteSubmitted(true);
      playChime();
      fireConfetti();
    } catch (err) {
      setQuoteSubmitted(true);
      playChime();
      fireConfetti();
    } finally {
      setSubmitting(false);
    }
  };

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

      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0D1322] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Project Scope & Quote Request</h3>
              <p className="text-[11px] text-slate-400">Tailored proposal based on your exact specifications</p>
            </div>
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 hover:text-white border border-white/[0.12] flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
            aria-label="Close modal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
            <X className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {quoteSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Quote Request Received!</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. We have logged your request for <strong className="text-blue-400">{serviceType}</strong> ({scope} scope). Our team will review your specifications and email you to discuss the project scope, timeline, and budget.
              </p>
              <button
                onClick={() => {
                  playPop();
                  setQuoteSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm transition-all active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendQuote} className="space-y-6">
              
              {/* 1. Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  1. Select Service
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    'UI/UX Design',
                    'Web Design & Development',
                    'WordPress Solutions',
                    'Video Editing',
                    '3D Animation & CGI',
                    'Generative AI & LLMs'
                  ].map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => {
                        playPop();
                        setServiceType(srv);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all active:scale-95 ${
                        serviceType === srv
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                          : 'bg-[#0D1322] border-white/[0.08] text-slate-400 hover:text-slate-200 hover:border-white/[0.15]'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Scope Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  2. Project Scope & Deliverables
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'Small', label: 'Starter', desc: '1-3 screens / single asset' },
                    { id: 'Medium', label: 'Standard', desc: 'Complete build / 5+ assets' },
                    { id: 'Large', label: 'Premium', desc: 'Full custom architecture' },
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => {
                        playPop();
                        setScope(sc.id);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all active:scale-95 ${
                        scope === sc.id
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-[#0D1322] border-white/[0.08] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{sc.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{sc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline & Discussion Notice (No Budget Shown) */}
              <div className="p-4 rounded-2xl bg-[#0D1322] border border-white/[0.08] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Estimated Turnaround
                  </span>
                  <div className="text-base sm:text-lg font-bold text-white">
                    {estimatedTimeline}
                  </div>
                </div>

                <div className="text-right max-w-[220px]">
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    Custom Pricing
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Budget is tailored to your scope & discussed directly with you.
                  </p>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1322] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1322] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Notes & Requirements</label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us a few words about your project requirements, goals, or preferred launch date..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1322] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md hover:shadow-glow-sm flex items-center justify-center gap-2 active:scale-95 group cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Details for Discussion</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
