"use client";
import { useState, useEffect, useCallback } from "react";

interface GridItem {
  value: string;
  pairKey: number;
  flipped: boolean;
  matched: boolean;
}

export interface Move {
  moves: number;
  time: string;
  date: string;
}

export interface Moves {
  easy: Move[];
  medium: Move[];
  hard: Move[];
}

export type Difficulty = "easy" | "medium" | "hard";

export function useMemoryGame(emojiSet: string[], rows = 4, cols = 4) {
  // Calculate how many pairs we need
  const totalPairs = Math.floor((rows * cols) / 2);

  // State for the game
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [flipCounter, setFlipCounter] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");

  // Helper function to create grid items
  const getGridItems = useCallback(() => {
   
    // Map emojis to grid items
    const items = emojiSet.map((emoji: string, index: number) => ({
      value: emoji,
      pairKey: index,
      flipped: false,
      matched: false,
    }));

    // Function to get unique random IDs
    const getUniqueRandomIds = (pairsNeeded: number, maxAvailable: number) => {
      if (pairsNeeded > maxAvailable) {
        throw new Error("Not enough emojis available for the grid size");
      }

      const numbers = [];
      for (let i = 0; i < maxAvailable; i++) {
        numbers.push(i);
      }

      // Fisher-Yates shuffle
      const shuffledArray = shuffleArray(numbers);
      return shuffledArray.slice(0, pairsNeeded);
    };

    // Create grid with proper number of pairs
    const ids = getUniqueRandomIds(totalPairs, items.length);
    const selectedItems = ids.map((id) => items[id]);

    // Make pairs of each emoji
    let grid = [...selectedItems, ...selectedItems];

    // Shuffle the grid
    grid = shuffleArray(grid);
    return grid;
  }, [emojiSet, totalPairs, rows, cols]);

  // Function to format timer display
  const showTimer = (ms: number) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    setTime(`${minute}:${second}:${milliseconds}`);
  };

  // Clear timer
  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
  };

  // Start the game
  const startGame = useCallback(() => {
    setGridItems(getGridItems());
    setMatchedPairs(new Set());
    setFlipCounter(0);
    setIsFlipping(false);
    setStart(true);
    clearTime();
  }, [getGridItems]);

  // Reset the game
  const resetGame = useCallback(() => {
    setGridItems(getGridItems());
    setMatchedPairs(new Set());
    setFlipCounter(0);
    setIsFlipping(false);
    setStart(false);
    clearTime();
  }, [getGridItems]);

  // Handle card click
  const handleCardClick = useCallback(
    (index: number) => {
      if (!start) {
        setStart(true);
      }

      const item = gridItems[index];
      if (item.flipped || item.matched || isFlipping) {
        return; // Do nothing if card is already flipped, matched, or animation in progress
      }

      setFlipCounter((prev) => prev + 1);
      setGridItems((prevGridItems) => {
        return prevGridItems.map((item, i) => {
          if (i === index) {
            return { ...item, flipped: true };
          }
          return item;
        });
      });
    },
    [gridItems, isFlipping, start]
  );

  // Timer effect
  useEffect(() => {
    const initTime = new Date();

    if (!start) {
      return;
    }

    const id = setInterval(() => {
      const left = count + (new Date().getTime() - initTime.getTime());
      setCount(left);
      showTimer(left);
    }, 10);

    return () => clearInterval(id);
  }, [start, count]);

  // Card matching logic
  useEffect(() => {
    const flippedCards = gridItems.filter(
      (item) => item.flipped && !item.matched
    );

    if (flippedCards.length === 2) {
      setIsFlipping(true);
      const timeoutId = setTimeout(() => {
        setGridItems((prevGridItems) => {
          const isMatch = flippedCards[0].pairKey === flippedCards[1].pairKey;
          const pairKeyToCheck = flippedCards[0].pairKey;

          if (isMatch) {
            setMatchedPairs((prev) => new Set([...prev, pairKeyToCheck]));
          }

          return prevGridItems.map((item) => {
            if (item.pairKey === pairKeyToCheck) {
              return { ...item, flipped: isMatch, matched: isMatch };
            } else if (item.flipped && !item.matched) {
              return { ...item, flipped: false };
            }
            return item;
          });
        });

        setIsFlipping(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [gridItems]);

  // Stop timer when game is won
  const hasWon = matchedPairs.size === totalPairs && totalPairs > 0;

  useEffect(() => {
    if (hasWon && start) {
      setStart(false);

      // Save score to local storage
      const difficulty: Difficulty =
        rows === 4 ? "easy" : rows === 5 ? "medium" : "hard";
      const scores: Moves = JSON.parse(
        localStorage.getItem("memoryScores") || "{}"
      );

      if (!scores[difficulty]) {
        scores[difficulty] = [];
      }

      scores[difficulty].push({
        moves: flipCounter,
        time: time,
        date: new Date().toISOString(),
      });

      // Sort scores by moves (fewer is better)
      scores[difficulty].sort((a, b) => a.moves - b.moves);

      // Keep only top 5 scores
      scores[difficulty] = scores[difficulty].slice(0, 5);

      localStorage.setItem("memoryScores", JSON.stringify(scores));
    }
  }, [hasWon, start, flipCounter, time, rows]);

  // Initialize grid items when hook is first used
  useEffect(() => {
    setGridItems(getGridItems());
  }, [getGridItems]);

  // Helper function to shuffle array (should ideally be imported from utils)
  const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return {
    gridItems,
    flipCounter,
    hasWon,
    time,
    isFlipping,
    matchedPairs,
    startGame,
    resetGame,
    handleCardClick,
  };
}
