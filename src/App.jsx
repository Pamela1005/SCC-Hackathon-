import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AssessmentCatalog } from './components/Assessments/AssessmentCatalog';
import { AutoMatchingHub } from './components/Matching/AutoMatchingHub';
import { VerifiedPortfolio } from './components/Portfolio/VerifiedPortfolio';
import { RecruiterPortal } from './components/Recruiter/RecruiterPortal';
import { ProjectCreator } from './components/Projects/ProjectCreator';
import { StudentLogin } from './components/Auth/StudentLogin';
import { VerificationModal } from './components/VerificationModal';
import { Award, Briefcase, UserCheck, CheckCircle2, Info, Sparkles, GraduationCap } from 'lucide-react';

export function AppContent() {
  const { activeRole, notification } = useApp();
  const [candidateTab, setCandidateTab] = useState('assessments');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className={`px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3 text-xs font-bold ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Student Login Page */}
        {activeRole === 'student_login' && <StudentLogin />}

        {/* Candidate View Layout */}
        {activeRole === 'candidate' && (
          <div className="space-y-6">
            
            {/* Candidate Internal Module Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setCandidateTab('assessments')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  candidateTab === 'assessments'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>1. Structured Assessments</span>
              </button>

              <button
                onClick={() => setCandidateTab('matching')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  candidateTab === 'matching'
                    ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>2. Auto-Matched Projects</span>
              </button>

              <button
                onClick={() => setCandidateTab('portfolio')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  candidateTab === 'portfolio'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>3. Verified Portfolio</span>
              </button>
            </div>

            {/* Candidate Module Content */}
            {candidateTab === 'assessments' && <AssessmentCatalog />}
            {candidateTab === 'matching' && <AutoMatchingHub />}
            {candidateTab === 'portfolio' && <VerifiedPortfolio />}

          </div>
        )}

        {/* Recruiter View Layout */}
        {activeRole === 'recruiter' && <RecruiterPortal />}

        {/* Project Owner View Layout */}
        {activeRole === 'project_creator' && <ProjectCreator />}

      </main>

      {/* Global Hash Verification Inspector Modal */}
      <VerificationModal />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-slate-400">SkillProof Platform • Verified Talent Ecosystem</span>
          <span className="text-[11px]">Node.js API Express Backend & React 19 Frontend</span>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return <AppContent />;
}
