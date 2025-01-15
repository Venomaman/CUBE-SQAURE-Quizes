import { QuestionType } from '../types';

export const generateQuestion = (type: QuestionType, minRange: number, maxRange: number): { number: number; answer: number } => {
  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  switch (type) {
    case 'square': {
      const num = getRandomNumber(Math.max(1, minRange), Math.min(20, maxRange));
      return { number: num, answer: num * num };
    }
    case 'squareRoot': {
      const answer = getRandomNumber(Math.max(1, minRange), Math.min(10, maxRange));
      return { number: answer * answer, answer };
    }
    case 'cube': {
      const num = getRandomNumber(Math.max(1, minRange), Math.min(10, maxRange));
      return { number: num, answer: num * num * num };
    }
    case 'cubeRoot': {
      const answer = getRandomNumber(Math.max(1, minRange), Math.min(5, maxRange));
      return { number: answer * answer * answer, answer };
    }
  }
};

export const getQuestionText = (type: QuestionType, number: number): string => {
  switch (type) {
    case 'square':
      return `What is ${number}²?`;
    case 'squareRoot':
      return `What is the square root of ${number}?`;
    case 'cube':
      return `What is ${number}³?`;
    case 'cubeRoot':
      return `What is the cube root of ${number}?`;
  }
};

export const calculateNextReviewDate = (successCount: number, failureCount: number): Date => {
  // Implement spaced repetition algorithm
  const baseInterval = 24; // hours
  const difficulty = Math.max(0.5, Math.min(2.5, 1 + (failureCount - successCount) * 0.5));
  const interval = Math.round(baseInterval * Math.pow(2, successCount / difficulty));
  
  const nextDate = new Date();
  nextDate.setHours(nextDate.getHours() + Math.min(interval, 30 * 24)); // Cap at 30 days
  return nextDate;
};