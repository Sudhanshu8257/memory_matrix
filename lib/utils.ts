import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Difficulty, Move, Moves } from "./hooks/useMemoryGame";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export   const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


// Format time from milliseconds to mm:ss:ms format
export const formatTime = (ms:number) => {
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
  const second = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
  const minute = Math.floor((ms / 1000 / 60) % 60).toString().padStart(2, "0");
  return `${minute}:${second}:${milliseconds}`;
};

// Save score to local storage
export const saveScore = (difficulty:Difficulty, moves:number, time:string) => {
  if (typeof window === "undefined") return;
  
  const scores:Moves = JSON.parse(localStorage.getItem("memoryScores") || "{}");
  
  if (!scores[difficulty]) {
    scores[difficulty] = [];
  }
  
  scores[difficulty].push({
    moves,
    time,
    date: new Date().toISOString()
  });
  
  // Sort scores by moves (fewer is better)
  scores[difficulty].sort((a, b) => a.moves - b.moves);
  
  // Keep only top 5 scores
  scores[difficulty] = scores[difficulty].slice(0, 5);
  
  localStorage.setItem("memoryScores", JSON.stringify(scores));
};

// Get scores from local storage
export const getScores = (difficulty:Difficulty):Move[] | [] => {
  if (typeof window === "undefined") return [];
  
  const scores = JSON.parse(localStorage.getItem("memoryScores") || "{}");
  return scores[difficulty] || [];
};

// Check if a score is a new high score
export const isNewHighScore = (difficulty:Difficulty, moves:number) => {
  const scores = getScores(difficulty);
  
  if (scores.length < 5) return true;
  
  // Check if current moves is better than any existing score
  return scores.some(score => moves < score.moves);
};
