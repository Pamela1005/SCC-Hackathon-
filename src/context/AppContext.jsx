import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CANDIDATES, ASSESSMENT_SUITES, REAL_WORLD_PROJECTS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeRole, setActiveRole] = useState('candidate'); // 'candidate' | 'recruiter' | 'project_creator'
  const [activeCandidateId, setActiveCandidateId] = useState('cand-1');
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('skillproof_candidates');
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('skillproof_projects');
    return saved ? JSON.parse(saved) : REAL_WORLD_PROJECTS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('skillproof_applications');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeAssessment, setActiveAssessment] = useState(null); // Currently open assessment modal/runner
  const [activeVerificationModal, setActiveVerificationModal] = useState(null); // Crypto hash inspector modal
  const [selectedCandidateForRecruiter, setSelectedCandidateForRecruiter] = useState('cand-1');
  const [notification, setNotification] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('skillproof_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('skillproof_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('skillproof_applications', JSON.stringify(applications));
  }, [applications]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const activeCandidate = candidates.find(c => c.id === activeCandidateId) || candidates[0];

  // Algorithmic Auto-Matching Calculator
  const calculateMatchScore = (candidate, project) => {
    if (!candidate || !project || !project.requiredSkills || project.requiredSkills.length === 0) {
      return { totalScore: 70, matchDetails: [] };
    }

    let totalWeight = 0;
    let accumulatedScore = 0;
    const matchDetails = [];

    project.requiredSkills.forEach(req => {
      const candSkill = candidate.skills.find(
        s => s.name.toLowerCase().includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(s.name.toLowerCase())
      );

      const candScore = candSkill ? candSkill.score : 0;
      const isVerified = candSkill ? candSkill.verified : false;
      const meetsThreshold = candScore >= req.minScore;

      let skillFitScore = candScore;
      if (!isVerified) skillFitScore *= 0.7; // Unverified skills penalty

      // Weight based on threshold
      accumulatedScore += skillFitScore;
      totalWeight += 100;

      matchDetails.push({
        skillName: req.name,
        requiredMinScore: req.minScore,
        candidateScore: candScore,
        verified: isVerified,
        meetsThreshold
      });
    });

    // Calculate base percentage
    let matchPct = Math.round((accumulatedScore / totalWeight) * 100);

    // Boost if candidate has relevant verified proof-of-work
    const relevantProof = candidate.proofOfWork.some(p =>
      p.techStack.some(tech => project.requiredSkills.some(req => tech.toLowerCase().includes(req.name.toLowerCase())))
    );
    if (relevantProof) {
      matchPct = Math.min(99, matchPct + 5);
    }

    return {
      totalScore: Math.max(25, matchPct),
      matchDetails
    };
  };

  // Complete Assessment & Generate Cryptographic Badge
  const completeAssessment = (candidateId, assessmentId, correctCount, totalCount) => {
    const scorePct = Math.round((correctCount / totalCount) * 100);
    const assessment = ASSESSMENT_SUITES.find(a => a.id === assessmentId);
    if (!assessment) return;

    // Generate SHA-256 style mock hex verification hash
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const verificationHash = `0x${randomHex}`;
    const dateStr = new Date().toISOString().split('T')[0];

    let tier = "Silver Level";
    if (scorePct >= 95) tier = "Diamond Level";
    else if (scorePct >= 85) tier = "Gold Level";

    const newBadge = {
      id: `badge-${assessmentId}-${Date.now()}`,
      title: `${assessment.category} Assessment`,
      score: scorePct,
      tier,
      issuedDate: dateStr,
      verificationHash,
      proctorVerified: true
    };

    setCandidates(prev =>
      prev.map(cand => {
        if (cand.id !== candidateId) return cand;

        // Update or add skill
        const existingSkillIndex = cand.skills.findIndex(s => s.name === assessment.category);
        let updatedSkills = [...cand.skills];

        if (existingSkillIndex >= 0) {
          updatedSkills[existingSkillIndex] = {
            name: assessment.category,
            score: Math.max(updatedSkills[existingSkillIndex].score, scorePct),
            verified: true,
            date: dateStr
          };
        } else {
          updatedSkills.push({
            name: assessment.category,
            score: scorePct,
            verified: true,
            date: dateStr
          });
        }

        const newAvg = Math.round(updatedSkills.reduce((acc, s) => acc + s.score, 0) / updatedSkills.length);
        const newBadges = [newBadge, ...cand.badges];

        return {
          ...cand,
          skills: updatedSkills,
          verifiedScoreAvg: newAvg,
          badges: newBadges
        };
      })
    );

    showToast(`Assessment Completed! You scored ${scorePct}% and earned a Verified ${tier} Badge.`);
  };

  // Verify any cryptographic hash in system
  const verifyHashInSystem = (hashInput) => {
    const cleaned = hashInput.trim().toLowerCase();
    for (const cand of candidates) {
      // Check badges
      const foundBadge = cand.badges.find(b => b.verificationHash.toLowerCase() === cleaned);
      if (foundBadge) {
        return {
          type: "Assessment Badge",
          item: foundBadge,
          candidate: cand,
          verified: true
        };
      }
      // Check proof of work
      const foundPow = cand.proofOfWork.find(p => p.verifiedHash.toLowerCase() === cleaned);
      if (foundPow) {
        return {
          type: "Proof of Work",
          item: foundPow,
          candidate: cand,
          verified: true
        };
      }
    }
    return { verified: false };
  };

  // Create new project
  const createProject = (newProj) => {
    const created = {
      ...newProj,
      id: `proj-${Date.now()}`,
      status: "Open",
      postedDate: new Date().toISOString().split('T')[0]
    };
    setProjects(prev => [created, ...prev]);
    showToast(`Project "${newProj.title}" posted successfully! Talent auto-matching enabled.`);
  };

  // Apply to project
  const applyToProject = (candidateId, projectId) => {
    const existing = applications.find(a => a.candidateId === candidateId && a.projectId === projectId);
    if (existing) {
      showToast("You have already applied or accepted the match for this project.", "info");
      return;
    }

    const cand = candidates.find(c => c.id === candidateId);
    const proj = projects.find(p => p.id === projectId);
    const match = calculateMatchScore(cand, proj);

    const newApp = {
      id: `app-${Date.now()}`,
      candidateId,
      projectId,
      matchScore: match.totalScore,
      status: "Matched & Applied",
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Successfully applied to "${proj.title}" with a ${match.totalScore}% match rating!`);
  };

  // Add proof of work
  const addProofOfWork = (candidateId, proof) => {
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newPow = {
      ...proof,
      id: `pow-${Date.now()}`,
      verifiedHash: `0x${randomHex}`,
      verifiedDate: new Date().toISOString().split('T')[0],
      peerReviews: 1
    };

    setCandidates(prev =>
      prev.map(c => {
        if (c.id !== candidateId) return c;
        return {
          ...c,
          proofOfWork: [newPow, ...c.proofOfWork]
        };
      })
    );

    showToast(`Proof of work "${proof.title}" added to portfolio with verification hash!`);
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        activeCandidateId,
        setActiveCandidateId,
        candidates,
        activeCandidate,
        projects,
        applications,
        assessments: ASSESSMENT_SUITES,
        activeAssessment,
        setActiveAssessment,
        activeVerificationModal,
        setActiveVerificationModal,
        selectedCandidateForRecruiter,
        setSelectedCandidateForRecruiter,
        notification,
        showToast,
        calculateMatchScore,
        completeAssessment,
        verifyHashInSystem,
        createProject,
        applyToProject,
        addProofOfWork
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
