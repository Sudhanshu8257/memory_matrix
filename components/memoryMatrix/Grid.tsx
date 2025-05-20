"use client";
import {
  halloweenEmojis,
  natureEmojis,
  snowEmojis,
  underwaterEmojis,
} from "@/lib/emoji";
import { Theme } from "@/lib/theme-provider";
import React, { useState } from "react";
import { Difficulty, useMemoryGame } from "@/lib/hooks/useMemoryGame";
import { ThemeSelector } from "./ThemeSelect";
import { DifficultySelector } from "./DifficultySelector";
import { Scoreboard } from "./Scoreboard";

const Grid = () => {
  const [gameStage, setGameStage] = useState<"theme" | "difficulty" | "game">(
    "theme"
  );
  const [selectedTheme, setSelectedTheme] = useState<Theme>("forest");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("easy");

  // Define grid dimensions based on difficulty
  const difficultySettings = {
    easy: { rows: 4, cols: 3 },
    medium: { rows: 5, cols: 4 },
    hard: { rows: 6, cols: 5 },
  };

  // Get the appropriate emoji set based on the selected theme
  const getThemeEmojis = () => {
    switch (selectedTheme) {
      case "halloween":
        return halloweenEmojis;
      case "underwater":
        return underwaterEmojis;
      case "cold":
        return snowEmojis;
      case "forest":
      default:
        return natureEmojis;
    }
  };

  // Custom hook for game logic
  const {
    gridItems,
    flipCounter,
    hasWon,
    time,
    startGame,
    resetGame,
    handleCardClick,
  } = useMemoryGame(
    getThemeEmojis(),
    difficultySettings[selectedDifficulty!].rows,
    difficultySettings[selectedDifficulty!].cols
  );

  // Handle theme selection
  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setGameStage("difficulty");
  };

  // Handle difficulty selection
  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setGameStage("game");
    startGame();
  };

  // Dynamic styles based on theme
  const getThemeStyles = () => {
    switch (selectedTheme) {
      case "halloween":
        return {
          background: "bg-gradient-to-b from-orange-900 to-purple-950",
          tile: "bg-gradient-to-b from-orange-500 to-purple-800 border-purple-900",
          text: "text-orange-100",
          glow: "glow-orange",
        };
      case "underwater":
        return {
          background: "bg-gradient-to-b from-cyan-500 to-blue-900",
          tile: "bg-gradient-to-b from-cyan-400 to-blue-700 border-cyan-900",
          text: "text-cyan-100",
          glow: "glow-cyan",
        };
      case "cold":
        return {
          background: "bg-gradient-to-b from-blue-300 to-indigo-900",
          tile: "bg-gradient-to-b from-blue-400 to-indigo-700 border-blue-900",
          text: "text-blue-100",
          glow: "glow-blue",
        };
      case "forest":
      default:
        return {
          background: "bg-gradient-to-b from-green-600 to-emerald-900",
          tile: "bg-gradient-to-b from-green-500 to-emerald-700 border-emerald-900",
          text: "text-emerald-100",
          glow: "glow-green",
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Card flip styles
  const cardStyles = `
    .flip-card {
      perspective: 8000px;
      width: 104px;
      height: 104px;
    }
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }
    .flip-card.flipped .flip-card-inner {
      transform: rotateY(180deg);
    }
    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 0.75rem;
    }
    .flip-card-back {
      transform: rotateY(180deg);
    }
    .glow-orange { text-shadow: 0 0 10px rgba(255, 166, 0, 0.7); }
    .glow-cyan { text-shadow: 0 0 10px rgba(6, 182, 212, 0.7); }
    .glow-blue { text-shadow: 0 0 10px rgba(59, 130, 246, 0.7); }
    .glow-green { text-shadow: 0 0 10px rgba(16, 185, 129, 0.7); }
  `;

  // Determine the grid template based on difficulty
  const getGridTemplate = () => {
    if (!selectedDifficulty) return "grid-cols-4";

    switch (selectedDifficulty) {
      case "easy":
        return "grid-cols-3";
      case "medium":
        return "grid-cols-4";
      case "hard":
        return "grid-cols-5";
      default:
        return "grid-cols-4";
    }
  };

  return (
    <div className={`min-h-screen w-full p-4 transition-all duration-500`}>
      <style>{cardStyles}</style>
      {/* <Scoreboard
            theme={"forest"}
            difficulty={"easy"}
            moves={12}
            time={"00:00:00"}
          /> */}

      {gameStage === "theme" && (
        <ThemeSelector onSelectTheme={handleThemeSelect} />
      )}

      {gameStage === "difficulty" && (
        <DifficultySelector
          onSelectDifficulty={handleDifficultySelect}
          onBack={() => setGameStage("theme")}
        />
      )}

      {gameStage === "game" && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-5">
          <div className="flex w-full items-center justify-center gap-8 mb-6">
            
            <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-lg px-8 py-4 flex items-center justify-center">
              <span className="text-yellow-200 font-bold lg:text-2xl text-xl">
                Moves: {flipCounter}
              </span>
            </div>

            <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-lg px-8 py-4 flex items-center justify-center">
              <span className="text-yellow-200 font-bold lg:text-2xl text-xl">
                Time: {time}
              </span>
            </div>

            <button
              onClick={() => {
                resetGame();
                setGameStage("theme");
              }}
              className="bg-black bg-opacity-30 backdrop-blur-lg rounded-lg px-8 py-4 flex items-center justify-center"
            >
              <span className="text-yellow-200 font-bold lg:text-2xl text-xl">
                New Game
              </span>
            </button>
          </div>

          {/* Game grid */}
          <div className={`grid ${getGridTemplate()} gap-3 w-fit mx-auto`}>
            {gridItems?.map((item, i) => (
              <div
                key={i}
                onClick={() => handleCardClick(i)}
                className={`flip-card ${
                  item.flipped || item.matched ? "flipped" : ""
                } shrink-0 flex items-center justify-center rounded-xl cursor-pointer`}
              >
                <div className="flip-card-inner">
                  <div
                    className={`flip-card-front w-full h-full theme-tile shadow-xl flex items-center justify-center border-2 border-opacity-30 hover:border-opacity-70 transition-all duration-300`}
                  >
                    <div className="bg-white bg-opacity-20 rounded-full"></div>
                  </div>
                  <div className="flip-card-back text-2xl w-full h-full bg-white bg-opacity-10 backdrop-blur-md shadow-xl flex items-center justify-center">
                    <p className="text-4xl font-bold">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasWon && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
              <div
                className={`bg-amber-100  p-8 rounded-xl flex flex-col items-center gap-6 shadow-2xl border-2 text-yellow-200 border-opacity-20`}
              >
                <div className="text-5xl mb-2">🏆</div>
                <h2 className={`text-3xl font-bold text-amber-700 `}>
                  Congratulations!
                </h2>
                <p className={`text-amber-700 text-lg`}>
                  You found all pairs in {flipCounter} moves!
                </p>
                <Scoreboard
                  theme={selectedTheme}
                  difficulty={selectedDifficulty!}
                  moves={flipCounter}
                  time={time}
                />
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={resetGame}
                    className={`px-6 py-3 rounded-lg bg-amber-700 text-yellow-200 font-semibold hover:brightness-110 transition-all duration-300`}
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => {
                      resetGame();
                      setGameStage("theme");
                    }}
                    className={`px-6 py-3 bg-gray-800 bg-opacity-60 rounded-lg ${themeStyles.text} font-semibold hover:bg-opacity-80 transition-all duration-300`}
                  >
                    Change Theme
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Grid;
