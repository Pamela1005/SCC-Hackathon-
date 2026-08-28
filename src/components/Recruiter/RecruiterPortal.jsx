import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShieldCheck, Award, UserCheck, CheckCircle2, ArrowRight, Filter, Key, GitBranch, ExternalLink, Calendar, Send, Sparkles, Eye, Scale } from 'lucide-react';
import { InitialAvatar } from '../InitialAvatar';

export function RecruiterPortal() {
  const { candidates, setActiveCandidateId, setActiveVerificationModal, setActiveRole, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [minScoreFilter, setMinScoreFilter] = useState(85);
  const [selectedForComparison, setSelectedForComparison] = useState(['cand-1', 'cand-2']);
  const [inspectCandidate, setInspectCandidate] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(null);

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.skills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesScore = c.verifiedScoreAvg >= minScoreFilter;
    return matchesSearch && matchesScore;
  });

  const toggleCompare = (candId) => {
    if (selectedForComparison.includes(candId)) {
      setSelectedForComparison(prev => prev.filter(id => id !== candId));
    } else {
      if (selectedForComparison.length >= 3) {
        showToast("You can compare up to 3 candidates side-by-side.", "info");
        return;
      }
      setSelectedForComparison(prev => [...prev, candId]);
    }
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    showToast(`Interview invite sent to ${showInviteModal.name}! Candidate notified.`);
    setShowInviteModal(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Recruiter Banner */}
      <div className="relative p-8 rounded-3xl glass-panel border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-cyan-950/40 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            Recruiter & Talent Scout Workspace
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Verified Talent Discovery & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Proof Verification</span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Filter pre-assessed candidates with zero resume fluff. Inspect real proctored assessment score reports, cryptographic SHA-256 signatures, and proof-of-work repositories.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Tamper-Proof Assessment Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Side-by-Side Skill Matrix Comparison</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by skill (e.g. React, Python, RAG), name, or role..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-300">
          <span className="font-semibold">Min Verified Score:</span>
          <select
            value={minScoreFilter}
            onChange={(e) => setMinScoreFilter(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-bold focus:outline-none"
          >
            <option value={70}>70%+ (All Qualified)</option>
            <option value={85}>85%+ (Top 10%)</option>
            <option value={92}>92%+ (Top 3% Masters)</option>
          </select>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => {
          const isCompared = selectedForComparison.includes(cand.id);

          return (
            <div
              key={cand.id}
              className={`glass-panel p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isCompared ? 'border-cyan-500 bg-slate-900/90 shadow-lg shadow-cyan-500/10' : 'border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <InitialAvatar name={cand.name} size="lg" />
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{cand.name}</h3>
                      <p className="text-xs text-cyan-400 font-medium">{cand.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCompare(cand.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      isCompared
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {isCompared ? '✓ Compare' : '+ Compare'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Verified Score Avg</span>
                    <span className="text-lg font-black text-emerald-400">{cand.verifiedScoreAvg}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">Rank Tier</span>
                    <span className="text-xs font-bold text-indigo-300">{cand.percentileRank}</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Verified Skill Scores</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cand.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-200 font-medium flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>{s.name}: <strong className="text-white">{s.score}%</strong></span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveCandidateId(cand.id);
                    setActiveRole('candidate');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" /> Full Portfolio
                </button>

                <button
                  onClick={() => setShowInviteModal(cand)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Invite
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Comparison Matrix */}
      {selectedForComparison.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-slate-950/90 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Side-by-Side Candidate Comparison Matrix</h3>
                <p className="text-xs text-slate-400">Comparing benchmark scores & verification proofs</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedForComparison([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear Comparison
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Verified Average</th>
                  <th className="p-3">Percentile</th>
                  <th className="p-3">React Score</th>
                  <th className="p-3">Python / AI Score</th>
                  <th className="p-3">Node.js Score</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {selectedForComparison.map((id) => {
                  const cand = candidates.find(c => c.id === id);
                  if (!cand) return null;

                  const reactSkill = cand.skills.find(s => s.name.includes('React'))?.score || 'N/A';
                  const pySkill = cand.skills.find(s => s.name.includes('Python'))?.score || 'N/A';
                  const nodeSkill = cand.skills.find(s => s.name.includes('Node'))?.score || 'N/A';

                  return (
                    <tr key={cand.id} className="hover:bg-slate-900/60">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <InitialAvatar name={cand.name} size="xs" />
                        <span>{cand.name}</span>
                      </td>
                      <td className="p-3 text-emerald-400 font-bold">{cand.verifiedScoreAvg}%</td>
                      <td className="p-3 text-indigo-300 font-semibold">{cand.percentileRank}</td>
                      <td className="p-3">{reactSkill !== 'N/A' ? `${reactSkill}%` : '-'}</td>
                      <td className="p-3">{pySkill !== 'N/A' ? `${pySkill}%` : '-'}</td>
                      <td className="p-3">{nodeSkill !== 'N/A' ? `${nodeSkill}%` : '-'}</td>
                      <td className="p-3">
                        <button
                          onClick={() => setShowInviteModal(cand)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold"
                        >
                          Send Invite
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interview Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl border border-emerald-500/30 p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Send Direct Interview Invite</h3>
            <p className="text-xs text-slate-400 mb-4">
              Inviting <strong className="text-white">{showInviteModal.name}</strong> ({showInviteModal.role})
            </p>

            <form onSubmit={handleSendInvite} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Company / Team Name</label>
                <input
                  type="text"
                  required
                  defaultValue="Apex Engineering Labs"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Project Role / Contract Offer</label>
                <input
                  type="text"
                  required
                  defaultValue={`Senior Contract Role for ${showInviteModal.role}`}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Custom Message</label>
                <textarea
                  rows="3"
                  defaultValue={`We reviewed your verified score of ${showInviteModal.verifiedScoreAvg}% and cryptographic badges on SkillProof. We'd love to schedule a technical chat.`}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20"
                >
                  Send Direct Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
