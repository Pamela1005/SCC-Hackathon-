import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, User, Lock, Mail, GraduationCap, ArrowRight, Sparkles, CheckCircle2, Key, Star, Eye, EyeOff, AlertCircle } from 'lucide-react';

export function StudentLogin({ onSuccess }) {
  const { candidates, loginStudent, registerStudent, showToast, setActiveRole } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('student@university.edu');
  const [loginPassword, setLoginPassword] = useState('student123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState('Full-Stack Software Engineer');
  const [regUniversity, setRegUniversity] = useState('Stanford University');
  const [regBio, setRegBio] = useState('Passionate CS student specializing in scalable Web & AI systems.');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginStudent(loginEmail, loginPassword);
    if (success) {
      setActiveRole('candidate');
      if (onSuccess) onSuccess();
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    if (!regPassword || regPassword.length < 6) {
      showToast("Password must be at least 6 characters long.", "error");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      showToast("Passwords do not match. Please verify your custom password.", "error");
      return;
    }

    const newCandidate = registerStudent({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      bio: `${regBio} (${regUniversity})`,
      location: regUniversity,
    });

    if (newCandidate) {
      setActiveRole('candidate');
      if (onSuccess) onSuccess();
    }
  };

  const handleQuickDemoSelect = (candidateId) => {
    const cand = candidates.find(c => c.id === candidateId);
    if (cand) {
      loginStudent(cand.email, cand.password || 'password123');
      setActiveRole('candidate');
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-indigo-500/30 p-8 shadow-2xl relative overflow-hidden text-slate-200">
        
        {/* Top glowing bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"></div>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 glow-indigo">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Student & Developer Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to take proctored skill assessments & manage your verified digital portfolio</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 mb-6">
          <button
            onClick={() => setIsRegistering(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isRegistering ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Sign In
          </button>
          <button
            onClick={() => setIsRegistering(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isRegistering ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create New Student Profile
          </button>
        </div>

        {!isRegistering ? (
          /* Sign In Form */
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Student Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Your Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your custom password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
            >
              <span>Sign In to Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Profiles */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Or Quick Sign In with Demo Student Profiles:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {candidates.slice(0, 3).map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleQuickDemoSelect(c.id)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all flex items-center gap-2"
                  >
                    <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                    <div className="truncate">
                      <span className="text-[11px] font-bold text-white block truncate">{c.name}</span>
                      <span className="text-[9px] text-emerald-400 font-bold">{c.verifiedScoreAvg}% Avg</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </form>
        ) : (
          /* Student Registration Form */
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Student Email Address</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="jordan.lee@stanford.edu"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Custom Password Creation Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Create Custom Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Confirm Custom Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Target Engineering Role</label>
                <input
                  type="text"
                  required
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  placeholder="Full-Stack Developer, AI Lead..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">University / College</label>
                <input
                  type="text"
                  required
                  value={regUniversity}
                  onChange={(e) => setRegUniversity(e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Short Bio & Focus Area</label>
              <textarea
                rows="2"
                value={regBio}
                onChange={(e) => setRegBio(e.target.value)}
                placeholder="Detail your technology stack interests, research, or personal projects..."
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Verified Account with Custom Password</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
