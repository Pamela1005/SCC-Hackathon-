import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Code2, BrainCircuit, Server, Palette, Clock, Award, ShieldCheck, Play, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { AssessmentRunner } from './AssessmentRunner';

export function AssessmentCatalog() {
  const { assessments, activeCandidate, setActiveAssessment, activeAssessment } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'React / Next.js', 'Python & ML Pipelines', 'Node.js & APIs', 'UI/UX Systems'];

  const filteredAssessments = selectedCategory === 'All'
    ? assessments
    : assessments.filter(a => a.category === selectedCategory);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-indigo-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6 text-cyan-400" />;
      case 'Server': return <Server className="w-6 h-6 text-emerald-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-violet-400" />;
      default: return <Award className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner / Intro */}
      <div className="relative p-8 rounded-3xl glass-panel border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/40 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Anti-Cheat Proctored Assessments
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Structured Skill Assessments & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Cryptographic Badges</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Take timed, objective coding and system design tests. Earn tamper-proof SHA-256 verified badges that recruiters trust and auto-match directly to real-world client projects.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Immutable Verification Signature</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>15–20 Min Timed Simulations</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Instant Recruiter Auto-Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-medium">Showing {filteredAssessments.length} Available Assessment Suites</span>
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssessments.map((ass) => {
          const candSkill = activeCandidate?.skills.find(s => s.name === ass.category);
          const hasTaken = candSkill && candSkill.verified;

          return (
            <div
              key={ass.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 glass-panel-hover flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                    {getCategoryIcon(ass.icon)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-bold text-cyan-400">
                      {ass.level}
                    </span>
                    {hasTaken && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Score: {candSkill.score}%
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">{ass.category}</span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{ass.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{ass.description}</p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {ass.skillsTested.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {ass.durationMinutes} Mins
                  </span>
                  <span>•</span>
                  <span>{ass.totalQuestions} Scenarios</span>
                </div>

                <button
                  onClick={() => setActiveAssessment(ass)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{hasTaken ? 'Retake Assessment' : 'Start Assessment'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Assessment Modal */}
      {activeAssessment && (
        <AssessmentRunner
          assessment={activeAssessment}
          onClose={() => setActiveAssessment(null)}
        />
      )}

    </div>
  );
}
