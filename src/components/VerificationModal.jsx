import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, XCircle, Search, ExternalLink, Key, Award, User, Calendar, FileCode } from 'lucide-react';

export function VerificationModal() {
  const { activeVerificationModal, setActiveVerificationModal, verifyHashInSystem } = useApp();
  const [inputHash, setInputHash] = useState(typeof activeVerificationModal === 'string' ? activeVerificationModal : '');
  const [result, setResult] = useState(() => {
    if (typeof activeVerificationModal === 'string' && activeVerificationModal.trim()) {
      return verifyHashInSystem(activeVerificationModal);
    }
    return null;
  });

  if (!activeVerificationModal) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputHash.trim()) return;
    const res = verifyHashInSystem(inputHash);
    setResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Top glowing accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Cryptographic Credential Verifier
              </h3>
              <p className="text-xs text-slate-400">Validate assessment scores & proof-of-work SHA-256 signatures</p>
            </div>
          </div>
          <button
            onClick={() => setActiveVerificationModal(null)}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Hash Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Verification Signature Hash
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                value={inputHash}
                onChange={(e) => setInputHash(e.target.value)}
                placeholder="Enter 0x... signature hash to verify"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Search className="w-4 h-4" />
              Verify Hash
            </button>
          </div>
        </form>

        {/* Verification Result Area */}
        {result && (
          <div className="mt-4">
            {result.verified ? (
              <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Valid & Authenticated</span>
                    <h4 className="text-base font-bold text-white">
                      {result.type === "Assessment Badge" ? result.item.title : result.item.title}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-900/60 p-4 rounded-lg border border-emerald-500/20 mb-4 font-sans text-slate-300">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>Candidate: <strong className="text-white">{result.candidate.name}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>Issued Date: <strong className="text-white">{result.item.issuedDate || result.item.verifiedDate}</strong></span>
                  </div>
                  {result.type === "Assessment Badge" && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Verified Score: <strong className="text-emerald-400 font-bold">{result.item.score}% ({result.item.tier})</strong></span>
                    </div>
                  )}
                  {result.type === "Proof of Work" && (
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      <span>Peer Review Status: <strong className="text-emerald-400 font-bold">{result.item.peerReviews} Verified Signatures</strong></span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-400 flex items-center justify-between overflow-x-auto">
                  <span className="truncate mr-2">Hash: {result.item.verificationHash || result.item.verifiedHash}</span>
                  <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-sans font-semibold">Proctor Approved</span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-rose-500/20 text-rose-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Signature Not Found or Tampered</h4>
                    <p className="text-xs text-slate-400">The provided hash could not be matched against the SkillProof registry log.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-800">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> SHA-256 Immutable Audit Log
          </span>
          <button
            onClick={() => setActiveVerificationModal(null)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
