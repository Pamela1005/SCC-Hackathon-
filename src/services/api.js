// SkillProof Frontend API Client Service

const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // Check backend server health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, using client state fallback', err);
      return { status: 'offline' };
    }
  },

  // Fetch candidate list
  async getCandidates() {
    try {
      const res = await fetch(`${API_BASE_URL}/candidates`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('Backend API unavailable:', err);
      return null;
    }
  },

  // Evaluate assessment test & fetch SHA-256 cryptographic signature badge
  async evaluateAssessment(candidateId, category, correctCount, totalCount) {
    try {
      const res = await fetch(`${API_BASE_URL}/assessments/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId, category, correctCount, totalCount })
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API unavailable:', err);
      return null;
    }
  },

  // Fetch match score from backend
  async getMatch(candidateId, projectId) {
    try {
      const res = await fetch(`${API_BASE_URL}/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId, projectId })
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API unavailable:', err);
      return null;
    }
  },

  // Verify signature hash from backend registry
  async verifyHash(hashString) {
    try {
      const res = await fetch(`${API_BASE_URL}/verify-hash/${encodeURIComponent(hashString)}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend API unavailable:', err);
      return null;
    }
  },

  // Post project to backend
  async postProject(projectData) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API unavailable:', err);
      return null;
    }
  }
};
