import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, MapPin, Sparkles, ShieldCheck, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export function EditSkillProfileModal({ candidate, onClose }) {
  const { updateCandidateProfile, showToast } = useApp();

  const [name, setName] = useState(candidate.name);
  const [role, setRole] = useState(candidate.role);
  const [location, setLocation] = useState(candidate.location);
  const [bio, setBio] = useState(candidate.bio);
  const [email, setEmail] = useState(candidate.email);

  const [skills, setSkills] = useState(candidate.skills || []);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillScore, setNewSkillScore] = useState(85);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = skills.some(s => s.name.toLowerCase() === newSkillName.toLowerCase());
    if (exists) {
      showToast("Skill already listed on profile.", "info");
      return;
    }

    setSkills(prev => [
      ...prev,
      {
        name: newSkillName.trim(),
        score: Number(newSkillScore),
        verified: true,
        date: new Date().toISOString().split('T')[0]
      }
    ]);

    setNewSkillName('');
  };

  const handleRemoveSkill = (skillIndex) => {
    setSkills(prev => prev.filter((_, i) => i !== skillIndex));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCandidateProfile(candidate.id, {
      name,
      role,
      location,
      bio,
      email,
      skills
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative text-slate-200">
        
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Edit Verified Skill Profile</h3>
              <p className="text-xs text-slate-400">Update your verified portfolio attributes & skill credentials</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Student Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Target Engineering Role</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400 font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">University / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Student Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Professional Bio & Highlights</label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
            ></textarea>
          </div>

          {/* Manage Verified Skills */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Verified Skill Scores ({skills.length})</span>
              <span className="text-emerald-400 text-[10px]">Proctor Verified</span>
            </h4>

            {/* Existing Skills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="font-bold text-white">{s.name}:</span>
                  <span className="text-cyan-400 font-bold">{s.score}%</span>
                  <button type="button" onClick={() => handleRemoveSkill(idx)} className="text-slate-500 hover:text-rose-400 ml-1">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Skill Tag */}
            <div className="flex gap-2 pt-2 border-t border-slate-900">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add custom skill (e.g. PyTorch, Docker)"
                className="flex-1 p-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              />
              <input
                type="number"
                min="50"
                max="100"
                value={newSkillScore}
                onChange={(e) => setNewSkillScore(e.target.value)}
                className="w-16 p-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-emerald-400 font-bold text-center"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20"
            >
              Save Skill Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
