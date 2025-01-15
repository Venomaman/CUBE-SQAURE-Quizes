export type QuestionType = 'square' | 'squareRoot' | 'cube' | 'cubeRoot';

export interface Question {
  id: string;
  type: QuestionType;
  number: number;
  answer: number;
  lastAttempted?: Date;
  successCount: number;
  failureCount: number;
  userAnswer: string;
  isCorrect: boolean | null;
}

export interface QuizState {
  questions: Question[];
  score: number;
  totalQuestions: number;
  isComplete: boolean;
}