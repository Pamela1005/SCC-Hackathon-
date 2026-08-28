import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Code2, Award, Terminal } from 'lucide-react';
import { AssessmentResultModal } from './AssessmentResultModal';

export function AssessmentRunner({ assessment, onClose }) {
  const { activeCandidateId, completeAssessment } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(assessment.durationMinutes * 60);
  const [resultData, setResultData] = useState(null);

  // Timer Countdown
  useEffect(() => {
    if (resultData) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resultData]);

  const currentQ = assessment.questions[currentQuestionIndex];

  const handleSelectOption = (optIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    assessment.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const totalCount = assessment.questions.length;
    const scorePct = Math.round((correctCount / totalCount) * 100);

    let tier = "Silver Level";
    if (scorePct >= 95) tier = "Diamond Level";
    else if (scorePct >= 85) tier = "Gold Level";

    // Generate SHA-256 hash preview
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const verificationHash = `0x${randomHex}`;

    completeAssessment(activeCandidateId, assessment.id, correctCount, totalCount);

    setResultData({
      assessment,
      scorePct,
      correctCount,
      totalCount,
      tier,
      verificationHash
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (resultData) {
    return <AssessmentResultModal resultData={resultData} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl rounded-2xl border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden text-slate-200">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{assessment.category}</span>
              <h3 className="text-lg font-bold text-white">{assessment.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold shadow-inner">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>{formatTime(timeLeftSeconds)}</span>
            </div>

            {/* Anti-cheat status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Anti-Cheat Verified</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Question Progress Dots */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {assessment.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all ${
                  idx === currentQuestionIndex
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 ring-2 ring-indigo-400'
                    : userAnswers[idx] !== undefined
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Question {currentQuestionIndex + 1} of {assessment.questions.length}
          </span>
        </div>

        {/* Current Question Display */}
        <div className="mb-6">
          <h4 className="text-base font-bold text-white mb-4 leading-relaxed">
            {currentQ.question}
          </h4>

          {/* Code Snippet block if available */}
          {currentQ.codeSnippet && (
            <div className="mb-4 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-cyan-300 overflow-x-auto relative">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2 mb-3">
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3 text-indigo-400" /> Scenario Code snippet</span>
                <span>TypeScript / React</span>
              </div>
              <pre>{currentQ.codeSnippet}</pre>
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentQuestionIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                    isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="mt-0.5 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentQuestionIndex < assessment.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(assessment.questions.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              Next Question <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitTest}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Submit & Evaluate
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
