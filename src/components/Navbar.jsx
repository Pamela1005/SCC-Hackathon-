import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, UserCheck, Briefcase, Award, Search, Key, Sparkles, Code2, Users, FolderPlus, LogIn, GraduationCap } from 'lucide-react';
import { InitialAvatar } from './InitialAvatar';

export function Navbar() {
  const {
    activeRole,
    setActiveRole,
    activeCandidateId,
    setActiveCandidateId,
    candidates,
    activeCandidate,
    setActiveVerificationModal
  } = useApp();

  const [searchHash, setSearchHash] = useState('');

  const handleQuickVerify = (e) => {
    e.preventDefault();
    if (searchHash.trim()) {
      setActiveVerificationModal(searchHash.trim());
      setSearchHash('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveRole('candidate')}>
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25">
              <ShieldCheck className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Proof</span></span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium">Assessed Skills • Auto-Match • Verified Portfolio</p>
            </div>
          </div>

          {/* Quick Hash Verifier Input (Center) */}
          <form onSubmit={handleQuickVerify} className="hidden md:flex items-center relative w-64">
            <Key className="w-3.5 h-3.5 absolute left-3 text-slate-500" />
            <input
              type="text"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="Verify 0x... hash signature"
              className="w-full pl-9 pr-8 py-1.5 bg-slate-900/90 border border-slate-800 rounded-full text-xs text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
            <button type="submit" className="absolute right-2 text-slate-400 hover:text-cyan-400">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Role Navigation Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveRole('student_login')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeRole === 'student_login'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Student Login</span>
            </button>

            <button
              onClick={() => setActiveRole('candidate')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeRole === 'candidate'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Candidate Hub</span>
            </button>

            <button
              onClick={() => setActiveRole('recruiter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeRole === 'recruiter'
                  ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Recruiter Scout</span>
            </button>

            <button
              onClick={() => setActiveRole('project_creator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeRole === 'project_creator'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Post Project</span>
            </button>
          </div>

          {/* Right Side: Active Student Selector with Initial Avatar */}
          <div className="hidden xl:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <InitialAvatar name={activeCandidate.name} size="xs" />
              <select
                value={activeCandidateId}
                onChange={(e) => setActiveCandidateId(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-200 border-none focus:outline-none cursor-pointer"
              >
                {candidates.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                    {c.name} ({c.verifiedScoreAvg}% Avg)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setActiveVerificationModal(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors"
              title="Open Hash Verifier"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
