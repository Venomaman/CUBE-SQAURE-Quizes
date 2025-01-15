import  { useState, useEffect } from 'react';
import { QuizSetup } from './components/QuizSetup';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { generateQuestion, calculateNextReviewDate } from './utils/mathUtils';
import { Question, QuizState, QuestionType } from './types';

function App() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [userProgress, setUserProgress] = useState<Record<QuestionType, { successCount: number; failureCount: number }>>(() => {
    const saved = localStorage.getItem('mathQuizProgress');
    return saved ? JSON.parse(saved) : {
      square: { successCount: 0, failureCount: 0 },
      squareRoot: { successCount: 0, failureCount: 0 },
      cube: { successCount: 0, failureCount: 0 },
      cubeRoot: { successCount: 0, failureCount: 0 },
    };
  });

  useEffect(() => {
    localStorage.setItem('mathQuizProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const generateQuiz = (questionCount: number, minRange: number, maxRange: number) => {
    const questionTypes: QuestionType[] = ['square', 'squareRoot', 'cube', 'cubeRoot'];
    const questions: Question[] = Array.from({ length: questionCount }, (_, i) => {
      const type = questionTypes[i % questionTypes.length];
      const { number, answer } = generateQuestion(type, minRange, maxRange);
      return {
        id: `q${i}`,
        type,
        number,
        answer,
        successCount: userProgress[type].successCount,
        failureCount: userProgress[type].failureCount,
        userAnswer: '',
        isCorrect: null,
        nextReview: calculateNextReviewDate(userProgress[type].successCount, userProgress[type].failureCount),
      };
    });

    setQuizState({
      questions,
      score: 0,
      totalQuestions: questionCount,
      isComplete: false,
    });
  };

  const handleAnswerSubmit = (questionId: string, answer: string) => {
    if (!quizState) return;

    setQuizState(prev => {
      if (!prev) return prev;

      const updatedQuestions = prev.questions.map(q => {
        if (q.id === questionId) {
          const isCorrect = parseInt(answer) === q.answer;
          
          // Update user progress
          setUserProgress(prev => ({
            ...prev,
            [q.type]: {
              successCount: prev[q.type].successCount + (isCorrect ? 1 : 0),
              failureCount: prev[q.type].failureCount + (isCorrect ? 0 : 1),
            },
          }));

          return {
            ...q,
            userAnswer: answer,
            isCorrect,
            successCount: q.successCount + (isCorrect ? 1 : 0),
            failureCount: q.failureCount + (isCorrect ? 0 : 1),
            nextReview: calculateNextReviewDate(
              q.successCount + (isCorrect ? 1 : 0),
              q.failureCount + (isCorrect ? 0 : 1)
            ),
          };
        }
        return q;
      });

      const allAnswered = updatedQuestions.every(q => q.isCorrect !== null);
      const score = updatedQuestions.filter(q => q.isCorrect).length;

      return {
        ...prev,
        questions: updatedQuestions,
        score,
        isComplete: allAnswered,
      };
    });
  };

  const handleRestart = () => {
    setQuizState(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Math Practice Quiz</h1>
          <p className="text-lg text-gray-600">
            Test your knowledge of squares, square roots, cubes, and cube roots!
          </p>
          {!quizState && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {Object.entries(userProgress).map(([type, progress]) => (
                <div key={type} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <p className="text-sm text-gray-600">Success: {progress.successCount}</p>
                  <p className="text-sm text-gray-600">Failures: {progress.failureCount}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {!quizState ? (
            <QuizSetup onStart={generateQuiz} />
          ) : quizState.isComplete ? (
            <QuizResults
              score={quizState.score}
              totalQuestions={quizState.totalQuestions}
              onRestart={handleRestart}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {quizState.questions.map((question) => (
                <QuizQuestion
                  key={question.id}
                  question={question}
                  onAnswerSubmit={(answer) => handleAnswerSubmit(question.id, answer)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;