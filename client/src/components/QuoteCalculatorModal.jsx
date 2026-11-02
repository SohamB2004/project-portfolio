import React, { useState } from 'react';
import { X, Calculator, ArrowUpRight, CheckCircle2, Clock, DollarSign, Sparkles, Loader2 } from 'lucide-react';
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

  if (!isOpen) return null;

  // Real-time calculation logic
  const calculateEstimate = () => {
    let base = 500;
    let days = "2-3 Weeks";

    if (serviceType === 'UI/UX Design') {
      base = scope === 'Large' ? 950 : scope === 'Medium' ? 650 : 450;
      days = scope === 'Large' ? '3 Weeks' : scope === 'Medium' ? '1-2 Weeks' : '5-7 Days';
    } else if (serviceType === 'Web Design & Development') {
      base = scope === 'Large' ? 1450 : scope === 'Medium' ? 950 : 650;
      days = scope === 'Large' ? '3-4 Weeks' : scope === 'Medium' ? '2 Weeks' : '10 Days';
    } else if (serviceType === 'WordPress Solutions') {
      base = scope === 'Large' ? 850 : scope === 'Medium' ? 600 : 400;
      days = scope === 'Large' ? '2-3 Weeks' : scope === 'Medium' ? '1-2 Weeks' : '5-7 Days';
    } else if (serviceType === 'Video Editing') {
      base = scope === 'Large' ? 450 : scope === 'Medium' ? 250 : 150;
      days = scope === 'Large' ? '5-7 Days' : scope === 'Medium' ? '3-4 Days' : '48 Hours';
    }

    if (urgency === 'Rush') {
      base = Math.round(base * 1.25);
    }

    return { base, days };
  };

  const { base, days } = calculateEstimate();

  const handleSendQuote = async (e) => {
    e.preventDefault();
    playPop();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      await fetch(getApiUrl('/api/quote'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          scope,
          urgency,
          name: name || 'Prospective Client',
          email,
          notes
        })
      });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#111827] border border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0D1322] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Project Cost & Timeline Estimator</h3>
              <p className="text-[11px] text-slate-400">Instant transparent freelance pricing</p>
            </div>
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
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
                We have logged your estimate (<strong className="text-blue-400">${base} USD</strong> for {serviceType}). Our team will email you a detailed project roadmap within 24 hours.
              </p>
              <button
                onClick={() => {
                  playPop();
                  setQuoteSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm transition-all active:scale-95"
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
                    'Video Editing'
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
                    { id: 'Small', label: 'Starter', desc: '1-3 screens / single edit' },
                    { id: 'Medium', label: 'Standard', desc: 'Complete site / 5+ edits' },
                    { id: 'Large', label: 'Premium', desc: 'Full custom build / ongoing' },
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

              {/* Live Estimate Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/50 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    Estimated Budget
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-0.5">
                    ${base} <span className="text-xs font-normal text-slate-400">USD</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    Turnaround
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {days}
                  </div>
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Notes (Optional)</label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us a few words about what you want to achieve..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1322] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md hover:shadow-glow-sm flex items-center justify-center gap-2 active:scale-95 group"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Lock In Estimate & Send Proposal Request</span>
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
