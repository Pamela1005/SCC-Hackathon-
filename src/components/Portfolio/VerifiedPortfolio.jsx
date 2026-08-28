import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, GitBranch, ExternalLink, Key, Plus, Sparkles, MapPin, Mail, CheckCircle2, User, FileCode, Share2, Layers, Edit3, Play } from 'lucide-react';
import { EditSkillProfileModal } from './EditSkillProfileModal';

export function VerifiedPortfolio() {
  const { activeCandidate, setActiveVerificationModal, addProofOfWork, setActiveAssessment, assessments } = useApp();
  const [showAddPowModal, setShowAddPowModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [powForm, setPowForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    metrics: ''
  });

  const handleAddPow = (e) => {
    e.preventDefault();
    if (!powForm.title.trim() || !powForm.description.trim()) return;

    const stackArray = powForm.techStack.split(',').map(s => s.trim()).filter(Boolean);
    addProofOfWork(activeCandidate.id, {
      title: powForm.title,
      description: powForm.description,
      techStack: stackArray.length > 0 ? stackArray : ['React', 'TypeScript'],
      githubUrl: powForm.githubUrl || 'https://github.com',
      liveUrl: powForm.liveUrl || 'https://skillproof.dev',
      metrics: powForm.metrics || 'Verified client proof'
    });

    setPowForm({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', metrics: '' });
    setShowAddPowModal(false);
  };

  const isUnassessed = activeCandidate.badges.length === 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Candidate Profile Header Card */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900/90 via-indigo-950/30 to-slate-900/90 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 h-1.5 left-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-start gap-5">
            <div className="relative">
              <img
                src={activeCandidate.avatar}
                alt={activeCandidate.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-500 text-slate-950 shadow-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-black text-white">{activeCandidate.name}</h1>
                <span className={`px-3 py-0.5 rounded-full border text-xs font-bold flex items-center gap-1 ${
                  isUnassessed ? 'bg-amber-950/80 border-amber-500/40 text-amber-400' : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> {isUnassessed ? 'Unassessed Account' : 'Recruiter Verified'}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                  {activeCandidate.percentileRank}
                </span>
              </div>

              <p className="text-sm font-semibold text-cyan-400 mb-2">{activeCandidate.role}</p>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed mb-3">{activeCandidate.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> {activeCandidate.location}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cyan-400" /> {activeCandidate.email}</span>
              </div>
            </div>
          </div>

          {/* Right Action buttons & Verified Average */}
          <div className="flex flex-col items-end gap-3 self-stretch md:self-auto justify-between">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center w-full md:w-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verified Score Avg</span>
              <span className={`text-3xl font-black ${isUnassessed ? 'text-amber-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400'}`}>
                {activeCandidate.verifiedScoreAvg}/100
              </span>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowEditProfileModal(true)}
                className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" /> Edit Skill Profile
              </button>

              <button
                onClick={() => setShowAddPowModal(true)}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Proof of Work
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Section 1: Verified Assessment Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Verified Skill Badges ({activeCandidate.badges.length})
            </h2>
            <p className="text-xs text-slate-400">Cryptographically signed proctored assessment credentials</p>
          </div>
        </div>

        {isUnassessed ? (
          <div className="p-8 rounded-3xl glass-panel border border-amber-500/30 bg-amber-950/20 text-center space-y-4 animate-fadeIn">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-white">No Verified Assessments Taken Yet (Score: 0%)</h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              Your verified score is currently <strong className="text-amber-400 font-bold">0%</strong>. Take your first 15-minute proctored assessment below to earn an immutable SHA-256 badge and compute your score!
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveAssessment(assessments[0])}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-indigo-600 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-2 mx-auto shadow-xl shadow-amber-500/20 transition-all"
              >
                <Play className="w-4 h-4 fill-current" /> Take First Assessment Now (React 19)
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeCandidate.badges.map((badge) => (
              <div
                key={badge.id}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 glow-amber">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                      Score: {badge.score}%
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{badge.tier}</span>
                  <h3 className="text-base font-bold text-white mb-2">{badge.title}</h3>
                  
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-[10px] text-cyan-400 mb-4 overflow-hidden">
                    <div className="flex justify-between text-slate-500 text-[9px] mb-1 font-sans">
                      <span>Issued {badge.issuedDate}</span>
                      <span className="text-emerald-400">SHA-256 Logged</span>
                    </div>
                    <p className="truncate">{badge.verificationHash}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveVerificationModal(badge.verificationHash)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Key className="w-3.5 h-3.5" /> Verify Credential Hash
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Proof-of-Work Showcase */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-cyan-400" /> Verified Proof-of-Work Portfolio ({activeCandidate.proofOfWork.length})
            </h2>
            <p className="text-xs text-slate-400">Real production applications, GitHub repos, & benchmark reports</p>
          </div>
        </div>

        {activeCandidate.proofOfWork.length === 0 ? (
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 text-center text-xs text-slate-400">
            No proof-of-work items added yet. Click <strong>"Add Proof of Work"</strong> above to showcase your projects with verification hashes!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCandidate.proofOfWork.map((pow) => (
              <div
                key={pow.id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                      {pow.peerReviews} Peer Endorsements
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Verified {pow.verifiedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{pow.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{pow.description}</p>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 mb-4 text-xs font-medium text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{pow.metrics}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pow.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a
                      href={pow.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GitBranch className="w-4 h-4" />
                    </a>
                    <a
                      href={pow.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveVerificationModal(pow.verifiedHash)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verify Proof Hash
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditSkillProfileModal
          candidate={activeCandidate}
          onClose={() => setShowEditProfileModal(false)}
        />
      )}

      {/* Add New Proof of Work Modal */}
      {showAddPowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-2xl border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" /> Add Proof-of-Work Item
              </h3>
              <button onClick={() => setShowAddPowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddPow} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={powForm.title}
                  onChange={(e) => setPowForm({ ...powForm, title: e.target.value })}
                  placeholder="e.g. Distributed Order Engine"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description & Deliverables</label>
                <textarea
                  required
                  rows="3"
                  value={powForm.description}
                  onChange={(e) => setPowForm({ ...powForm, description: e.target.value })}
                  placeholder="Summarize key features, architecture, and impact"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={powForm.techStack}
                  onChange={(e) => setPowForm({ ...powForm, techStack: e.target.value })}
                  placeholder="React, TypeScript, Node.js, Redis"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={powForm.githubUrl}
                    onChange={(e) => setPowForm({ ...powForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={powForm.liveUrl}
                    onChange={(e) => setPowForm({ ...powForm, liveUrl: e.target.value })}
                    placeholder="https://my-demo.com"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Benchmark / Performance Metric</label>
                <input
                  type="text"
                  value={powForm.metrics}
                  onChange={(e) => setPowForm({ ...powForm, metrics: e.target.value })}
                  placeholder="e.g. Sub-20ms latency, 99.9% uptime"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-500/20"
                >
                  Publish & Issue Verification Signature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
