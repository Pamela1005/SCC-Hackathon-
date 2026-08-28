import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderPlus, DollarSign, Clock, CheckCircle2, Sparkles, UserCheck, ShieldCheck, Plus, Trash2 } from 'lucide-react';

export function ProjectCreator() {
  const { createProject, candidates, calculateMatchScore, setActiveRole } = useApp();

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [budget, setBudget] = useState('$15,000');
  const [duration, setDuration] = useState('4 Weeks');
  const [domain, setDomain] = useState('Fintech & Web Architecture');
  const [description, setDescription] = useState('');

  const [skillsRequired, setSkillsRequired] = useState([
    { name: 'React / Next.js', minScore: 85 },
    { name: 'Node.js & APIs', minScore: 80 }
  ]);

  const [deliverables, setDeliverables] = useState([
    'High-throughput API microservices with sub-50ms latency',
    'Tested frontend application with 95%+ Lighthouse performance score'
  ]);
  const [newDeliv, setNewDeliv] = useState('');

  const handleAddSkill = () => {
    setSkillsRequired(prev => [...prev, { name: 'Python & ML Pipelines', minScore: 80 }]);
  };

  const handleRemoveSkill = (index) => {
    setSkillsRequired(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddDeliverable = () => {
    if (newDeliv.trim()) {
      setDeliverables(prev => [...prev, newDeliv.trim()]);
      setNewDeliv('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !client.trim() || !description.trim()) return;

    createProject({
      title,
      client,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      budget,
      duration,
      domain,
      description,
      requiredSkills: skillsRequired,
      deliverables
    });

    setTitle('');
    setClient('');
    setDescription('');
    setActiveRole('candidate');
  };

  // Preview live candidate match preview for draft project
  const draftProj = { requiredSkills: skillsRequired };
  const rankedPreview = candidates.map(c => ({
    candidate: c,
    match: calculateMatchScore(c, draftProj)
  })).sort((a, b) => b.match.totalScore - a.match.totalScore);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="relative p-8 rounded-3xl glass-panel border border-violet-500/20 bg-gradient-to-r from-violet-950/40 via-slate-900/60 to-indigo-950/40 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold mb-4">
            <FolderPlus className="w-3.5 h-3.5" />
            Client & Project Owner Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Post Real-World Project & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Auto-Match Talent</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Define your project deliverables and minimum assessment score thresholds. Our platform immediately indexes pre-verified candidates matching your exact standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next-Gen Real-Time Order Engine"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Client / Company Name</label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Apex Trading Corp"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Contract Budget</label>
                <input
                  type="text"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-bold focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Target Duration</label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400 font-bold focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Domain Category</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="Fintech & Web Architecture">Fintech & Web Architecture</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="UI/UX & Design Systems">UI/UX & Design Systems</option>
                  <option value="Backend Infrastructure">Backend Infrastructure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Project Description & Scope</label>
              <textarea
                required
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail technical requirements, expected code standards, and workflow..."
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-violet-500"
              ></textarea>
            </div>

            {/* Required Skills & Assessment Score Thresholds */}
            <div className="space-y-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-violet-400" /> Required Skills & Assessment Score Thresholds
                </label>
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Skill Threshold
                </button>
              </div>

              {skillsRequired.map((req, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <select
                    value={req.name}
                    onChange={(e) => {
                      const updated = [...skillsRequired];
                      updated[idx].name = e.target.value;
                      setSkillsRequired(updated);
                    }}
                    className="flex-1 bg-transparent text-white font-semibold focus:outline-none"
                  >
                    <option value="React / Next.js">React / Next.js</option>
                    <option value="Python & ML Pipelines">Python & ML Pipelines</option>
                    <option value="Node.js & APIs">Node.js & APIs</option>
                    <option value="UI/UX Systems">UI/UX Systems</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </select>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Min Score:</span>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={req.minScore}
                      onChange={(e) => {
                        const updated = [...skillsRequired];
                        updated[idx].minScore = Number(e.target.value);
                        setSkillsRequired(updated);
                      }}
                      className="w-16 p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-bold text-center"
                    />
                    <span className="text-slate-400">%</span>
                  </div>

                  {skillsRequired.length > 1 && (
                    <button type="button" onClick={() => handleRemoveSkill(idx)} className="text-rose-400 hover:text-rose-300 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
              >
                <FolderPlus className="w-5 h-5" /> Publish Project & Activate Auto-Matching
              </button>
            </div>

          </form>
        </div>

        {/* Live Auto-Matched Talent Preview Column */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Live Auto-Matched Talent Preview</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real-time candidate compatibility scores calculated dynamically against your draft skill criteria:
          </p>

          <div className="space-y-3">
            {rankedPreview.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.candidate.avatar} alt={item.candidate.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">{item.candidate.name}</h4>
                    <span className="text-[10px] text-slate-400">{item.candidate.role}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    {item.match.totalScore}% Match
                  </span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">Pre-Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
