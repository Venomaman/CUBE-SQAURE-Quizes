import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface QuizSetupProps {
  onStart: (questionCount: number, minRange: number, maxRange: number) => void;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({ onStart }) => {
  const [questionCount, setQuestionCount] = useState(10);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");

  const handleValidation = (): boolean => {
    if (questionCount < 1 || questionCount > 100) {
      setErrorMessage("Number of questions must be between 1 and 100.");
      return false;
    }
    if (minRange < 0 || maxRange > 100 || minRange >= maxRange) {
      setErrorMessage("Ensure that min range < max range and both are within 0-100.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      onStart(questionCount, minRange, maxRange);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Math Quiz Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question Count Input */}
        <div>
          <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Questions
          </label>
          <input
            type="number"
            id="questionCount"
            min="1"
            max="100"
            value={questionCount || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                setQuestionCount(value);
              } else {
                setQuestionCount(0); // Allow empty input
              }
            }}
            onBlur={() => {
              // Validate on blur
              setQuestionCount((prev) => Math.max(1, Math.min(100, prev || 1)));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Min and Max Range Inputs */}
        <div className="grid grid-cols-2 gap-4">
          {/* Min Range */}
          <div>
            <label htmlFor="minRange" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Number
            </label>
            <input
              type="number"
              id="minRange"
              value={minRange || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setMinRange(value);
                } else {
                  setMinRange(0); // Allow empty input
                }
              }}
              onBlur={() => {
                // Validate on blur
                setMinRange((prev) => Math.max(0, Math.min(prev, maxRange - 1)));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Range */}
          <div>
            <label htmlFor="maxRange" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Number
            </label>
            <input
              type="number"
              id="maxRange"
              value={maxRange || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setMaxRange(value);
                } else {
                  setMaxRange(0); // Allow empty input
                }
              }}
              onBlur={() => {
                // Validate on blur
                setMaxRange((prev) => Math.max(minRange + 1, Math.min(prev, 100)));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* Submit Button */}
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

