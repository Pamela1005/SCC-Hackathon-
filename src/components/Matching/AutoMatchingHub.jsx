import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Briefcase, CheckCircle2, AlertTriangle, ArrowUpRight, DollarSign, Clock, Filter, Award, ShieldCheck, UserCheck, Star } from 'lucide-react';
import { InitialAvatar } from '../InitialAvatar';

export function AutoMatchingHub() {
  const { activeCandidate, projects, applications, calculateMatchScore, applyToProject, setActiveRole } = useApp();
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [filterByRoleOnly, setFilterByRoleOnly] = useState(false);

  const domains = ['All', 'Fintech & Web Architecture', 'AI & Machine Learning', 'UI/UX & Design Systems', 'Backend Infrastructure'];

  const checkRoleFit = (project, candidateRole) => {
    if (!candidateRole) return true;
    const roleLower = candidateRole.toLowerCase();
    const domainLower = project.domain.toLowerCase();
    const descLower = project.description.toLowerCase();

    if (roleLower.includes('ai') || roleLower.includes('machine learning') || roleLower.includes('python')) {
      return domainLower.includes('ai') || descLower.includes('rag') || descLower.includes('python');
    }
    if (roleLower.includes('ui') || roleLower.includes('ux') || roleLower.includes('design')) {
      return domainLower.includes('ui') || domainLower.includes('design') || descLower.includes('component');
    }
    if (roleLower.includes('backend') || roleLower.includes('microservice') || roleLower.includes('cloud')) {
      return domainLower.includes('backend') || domainLower.includes('infrastructure') || descLower.includes('node');
    }
    return domainLower.includes('web') || domainLower.includes('fintech') || descLower.includes('react');
  };

  let processedProjects = projects.filter(p => {
    const matchesDomain = selectedDomain === 'All' || p.domain === selectedDomain;
    const matchesRole = !filterByRoleOnly || checkRoleFit(p, activeCandidate.role);
    return matchesDomain && matchesRole;
  });

  processedProjects.sort((a, b) => {
    const scoreA = calculateMatchScore(activeCandidate, a).totalScore;
    const scoreB = calculateMatchScore(activeCandidate, b).totalScore;
    const isRoleFitA = checkRoleFit(a, activeCandidate.role);
    const isRoleFitB = checkRoleFit(b, activeCandidate.role);

    if (isRoleFitA && !isRoleFitB) return -1;
    if (!isRoleFitA && isRoleFitB) return 1;
    return scoreB - scoreA;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Matching Engine Header Banner */}
      <div className="relative p-8 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-indigo-950/40 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Role-Based Algorithmic Auto-Matching
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Real-World Projects <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Tailored to Your Student Role</span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Projects are dynamically benchmarked and prioritized according to your target role (<strong className="text-cyan-300">{activeCandidate.role}</strong>) and verified assessment scores.
          </p>

          <div className="flex flex-wrap items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <InitialAvatar name={activeCandidate.name} size="md" />
              <div>
                <span className="text-slate-400 text-[11px] block">Student Profile & Role</span>
                <span className="text-white font-bold">{activeCandidate.name} • <span className="text-cyan-400 font-semibold">{activeCandidate.role}</span></span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Score Avg: {activeCandidate.verifiedScoreAvg}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Domain & Role Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 mr-1 shrink-0" />
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDomain === dom
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        <button
          onClick={() => setFilterByRoleOnly(!filterByRoleOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
            filterByRoleOnly
              ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{filterByRoleOnly ? `Showing ${activeCandidate.role} Only` : `Filter by My Role (${activeCandidate.role})`}</span>
        </button>
      </div>

      {/* Projects Matching Grid */}
      <div className="space-y-6">
        {processedProjects.map((project) => {
          const matchResult = calculateMatchScore(activeCandidate, project);
          const hasApplied = applications.some(a => a.candidateId === activeCandidate.id && a.projectId === project.id);
          const matchScore = matchResult.totalScore;
          const isRoleMatched = checkRoleFit(project, activeCandidate.role);

          let scoreBadgeColor = "from-cyan-500 to-emerald-500 shadow-emerald-500/20";
          let scoreText = "High Match";
          if (matchScore >= 90) {
            scoreBadgeColor = "from-emerald-400 to-cyan-400 shadow-emerald-500/30";
            scoreText = "Ideal Candidate Match";
          } else if (matchScore < 75) {
            scoreBadgeColor = "from-amber-500 to-orange-500 shadow-amber-500/20";
            scoreText = "Moderate Match";
          }

          return (
            <div
              key={project.id}
              className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all ${
                isRoleMatched ? 'border-indigo-500/40 bg-slate-900/90 shadow-xl shadow-indigo-500/10' : 'border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                
                {/* Left: Project Header & Role Fit Tag */}
                <div className="flex items-start gap-4">
                  <img
                    src={project.logo}
                    alt={project.client}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-800 shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400">
                        {project.domain}
                      </span>

                      {isRoleMatched && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> Tailored for {activeCandidate.role}
                        </span>
                      )}

                      <span className="text-xs font-semibold text-slate-400">{project.client}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white hover:text-cyan-300 transition-colors">{project.title}</h3>
                  </div>
                </div>

                {/* Right: Match Score Radar Pill */}
                <div className="flex items-center gap-4 self-stretch lg:self-auto justify-between lg:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{scoreText}</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                      {matchScore}% Match Rating
                    </span>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scoreBadgeColor} p-0.5 shadow-xl flex items-center justify-center`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <span className="text-lg font-black text-white">{matchScore}%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Project Body */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
                
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">{project.description}</p>
                  
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Project Deliverables</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {project.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Verified Skill Fit</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  </h4>

                  <div className="space-y-2">
                    {matchResult.matchDetails.map((req, i) => (
                      <div key={i} className="text-xs space-y-1">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-semibold text-slate-200">{req.skillName}</span>
                          <span className={req.meetsThreshold ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                            Your Score: {req.candidateScore}% (Req: ≥{req.requiredMinScore}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${req.meetsThreshold ? 'bg-gradient-to-r from-emerald-400 to-cyan-400' : 'bg-amber-400'}`}
                            style={{ width: `${Math.min(100, (req.candidateScore / 100) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Project Card Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <DollarSign className="w-4 h-4" /> {project.budget}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {project.duration}
                  </span>
                  <span>Posted {project.postedDate}</span>
                </div>

                <div className="flex items-center gap-3">
                  {hasApplied ? (
                    <span className="px-5 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Match Accepted & Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => applyToProject(activeCandidate.id, project.id)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-500 hover:from-cyan-500 hover:to-indigo-400 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                    >
                      <span>1-Click Apply ({matchScore}% Match for {activeCandidate.role})</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
