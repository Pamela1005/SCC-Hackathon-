import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CANDIDATES, ASSESSMENT_SUITES, REAL_WORLD_PROJECTS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeRole, setActiveRole] = useState('student_login');
  const [activeCandidateId, setActiveCandidateId] = useState('cand-new');
  
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

  const [activeAssessment, setActiveAssessment] = useState(null);
  const [activeVerificationModal, setActiveVerificationModal] = useState(null);
  const [selectedCandidateForRecruiter, setSelectedCandidateForRecruiter] = useState('cand-1');
  const [notification, setNotification] = useState(null);

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

  // Student Authentication Methods
  const loginStudent = (email, password) => {
    const found = candidates.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (found.password && found.password !== password) {
        showToast("Incorrect password. Please verify your custom password.", "error");
        return false;
      }
      setActiveCandidateId(found.id);
      showToast(`Welcome back, ${found.name}! Signed into Student Verified Portal.`);
      return true;
    } else {
      const demoCand = candidates[0];
      setActiveCandidateId(demoCand.id);
      showToast(`Logged in as ${demoCand.name} (${demoCand.email})`);
      return true;
    }
  };

  const registerStudent = (studentData) => {
    const newId = `cand-std-${Date.now()}`;

    const newCandidate = {
      id: newId,
      name: studentData.name,
      email: studentData.email,
      password: studentData.password, // Custom created student password
      role: studentData.role || 'Junior Software Engineer',
      avatar: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80`,
      location: studentData.location || 'Stanford University',
      bio: studentData.bio || 'Newly registered CS student. Take structured assessments to earn verified badges and calculate your score!',
      verifiedScoreAvg: 0,
      percentileRank: 'Unranked',
      skills: [],
      proofOfWork: [],
      badges: []
    };

    setCandidates(prev => [newCandidate, ...prev]);
    setActiveCandidateId(newId);
    showToast(`Account created for ${studentData.name} with custom password! Take your first assessment to calculate your score.`);
    return newCandidate;
  };

  const updateCandidateProfile = (candidateId, updatedData) => {
    setCandidates(prev =>
      prev.map(cand => {
        if (cand.id !== candidateId) return cand;

        const newSkills = updatedData.skills || cand.skills;
        const newAvg = newSkills.length > 0
          ? Math.round(newSkills.reduce((acc, s) => acc + s.score, 0) / newSkills.length)
          : cand.verifiedScoreAvg;

        return {
          ...cand,
          ...updatedData,
          skills: newSkills,
          verifiedScoreAvg: newAvg
        };
      })
    );
    showToast("Verified Skill Profile updated successfully!");
  };

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
      if (!isVerified) skillFitScore *= 0.7;

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

    let matchPct = Math.round((accumulatedScore / totalWeight) * 100);

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

  const completeAssessment = (candidateId, assessmentId, correctCount, totalCount) => {
    const scorePct = Math.round((correctCount / totalCount) * 100);
    const assessment = ASSESSMENT_SUITES.find(a => a.id === assessmentId);
    if (!assessment) return;

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
        let percentile = "Top 10%";
        if (newAvg >= 95) percentile = "Top 1%";
        else if (newAvg >= 90) percentile = "Top 3%";

        return {
          ...cand,
          skills: updatedSkills,
          verifiedScoreAvg: newAvg,
          percentileRank: percentile,
          badges: [newBadge, ...cand.badges]
        };
      })
    );

    showToast(`Assessment Completed! You scored ${scorePct}% and earned a Verified ${tier} Badge.`);
  };

  const verifyHashInSystem = (hashInput) => {
    const cleaned = hashInput.trim().toLowerCase();
    for (const cand of candidates) {
      const foundBadge = cand.badges.find(b => b.verificationHash.toLowerCase() === cleaned);
      if (foundBadge) {
        return {
          type: "Assessment Badge",
          item: foundBadge,
          candidate: cand,
          verified: true
        };
      }
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
        loginStudent,
        registerStudent,
        updateCandidateProfile,
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
