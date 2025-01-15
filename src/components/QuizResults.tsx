import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg text-center">
      <div className="mb-6">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
      <p className="text-lg text-gray-600 mb-6">
        You scored {score} out of {totalQuestions} ({percentage}%)
      </p>
      <button
        onClick={onRestart}
        className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mx-auto"
      >
        <RefreshCw size={20} />
        <span>Try Again</span>
      </button>
    </div>
  );
};