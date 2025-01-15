import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface QuizSetupProps {
  onStart: (questionCount: number, minRange: number, maxRange: number) => void;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({ onStart }) => {
  const [questionCount, setQuestionCount] = useState(10);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(questionCount, minRange, maxRange);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Math Quiz Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Questions
          </label>
          <input
            type="number"
            id="questionCount"
            min="1"
            max="100"
            value={questionCount}
            onChange={(e) => setQuestionCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="minRange" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Number
            </label>
            <input
              type="number"
              id="minRange"
              min="1"
              max="100"
              value={minRange}
              onChange={(e) => {
                const value = Math.max(1, Math.min(maxRange, parseInt(e.target.value) || 1));
                setMinRange(value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="maxRange" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Number
            </label>
            <input
              type="number"
              id="maxRange"
              min={minRange}
              max="100"
              value={maxRange}
              onChange={(e) => {
                const value = Math.max(minRange, Math.min(100, parseInt(e.target.value) || minRange));
                setMaxRange(value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <span>Start Quiz</span>
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};