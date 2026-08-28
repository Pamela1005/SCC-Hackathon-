import React from 'react';
import { ShieldCheck, Award, CheckCircle2, XCircle, ArrowRight, Share2, Key, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AssessmentResultModal({ resultData, onClose }) {
  const { setActiveVerificationModal, setActiveRole } = useApp();

  if (!resultData) return null;

  const { assessment, scorePct, correctCount, totalCount, tier, verificationHash } = resultData;

  const isPassed = scorePct >= assessment.passingScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-xl rounded-2xl border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden text-slate-200">
        
        {/* Glowing Top bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isPassed ? 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500' : 'bg-rose-500'}`}></div>

        {/* Score Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 glow-indigo">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">Assessment Complete!</h2>
          <p className="text-xs text-slate-400 mt-1">{assessment.title}</p>
        </div>

        {/* Score Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-700/60 bg-slate-900/90 mb-6 text-center">
          <div className="flex justify-center items-baseline gap-2 mb-2">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              {scorePct}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">({correctCount} / {totalCount} correct)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Tier: {tier}
          </div>

          {/* Cryptographic Hash Receipt */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-left">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-semibold text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Immutable SHA-256 Proof Signature
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">Proctor Verified</span>
            </div>
            <p className="font-mono text-[11px] text-slate-300 break-all select-all bg-slate-900/80 p-2 rounded border border-slate-800/80">
              {verificationHash}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              setActiveVerificationModal(verificationHash);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Key className="w-4 h-4" />
            Verify Hash Integrity
          </button>

          <button
            onClick={() => {
              onClose();
              setActiveRole('candidate');
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
          >
            <span>View Auto-Matched Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
