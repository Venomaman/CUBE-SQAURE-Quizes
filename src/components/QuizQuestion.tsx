import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types';
import { getQuestionText } from '../utils/mathUtils';

interface QuizQuestionProps {
  question: Question;
  onAnswerSubmit: (answer: string) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswerSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && question.isCorrect === null) {
      onAnswerSubmit(inputValue);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {getQuestionText(question.type, question.number)}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-2">
          <input
            type="number"
            value={question.isCorrect !== null ? question.userAnswer : inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your answer"
            disabled={question.isCorrect !== null}
          />
          <button
            type="submit"
            disabled={question.isCorrect !== null || !inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        {question.isCorrect !== null && (
          <div className={`flex items-center space-x-2 ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {question.isCorrect ? (
              <>
                <CheckCircle size={20} />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <XCircle size={20} />
                <span>Answer: {question.answer}</span>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};