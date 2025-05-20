"use client";
import { Difficulty, Move } from "@/lib/hooks/useMemoryGame";
import { Theme } from "@/lib/theme-provider";
import React, { useEffect, useState } from "react";

export const Scoreboard = ({
  theme,
  difficulty,
  moves,
  time,
}: {
  theme: Theme;
  difficulty: Difficulty;
  moves: number;
  time: string;
}) => {
  const [scores, setScores] = useState<Move[] | []>([]);
  const [showScoreboard, setShowScoreboard] = useState(false);

  // Load scores from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedScores = JSON.parse(
        localStorage.getItem("memoryScores") || "{}"
      );
      const difficultyScores = savedScores[difficulty] || [];
      setScores(difficultyScores);
    }
  }, [difficulty]);

  // Theme-based styles
  const getThemeStyles = () => {
    switch (theme) {
      case "halloween":
        return {
          background: "bg-gradient-to-b from-orange-900/50 to-purple-950/50",
          text: "text-orange-100",
          highlight: "text-orange-300",
          border: "border-purple-700",
          button: "bg-gradient-to-r from-orange-600 to-purple-700",
          row: {
            odd: "bg-purple-900/30",
            even: "bg-purple-800/30",
          },
        };
      case "underwater":
        return {
          background: "bg-gradient-to-b from-cyan-700/50 to-blue-900/50",
          text: "text-cyan-100",
          highlight: "text-cyan-300",
          border: "border-blue-700",
          button: "bg-gradient-to-r from-cyan-600 to-blue-700",
          row: {
            odd: "bg-blue-900/30",
            even: "bg-blue-800/30",
          },
        };
      case "cold":
        return {
          background: "bg-gradient-to-b from-blue-500/50 to-indigo-900/50",
          text: "text-blue-100",
          highlight: "text-blue-300",
          border: "border-indigo-700",
          button: "bg-gradient-to-r from-blue-600 to-indigo-700",
          row: {
            odd: "bg-indigo-900/30",
            even: "bg-indigo-800/30",
          },
        };
      case "forest":
      default:
        return {
          background: "bg-gradient-to-b from-green-700/50 to-emerald-900/50",
          text: "text-emerald-100",
          highlight: "text-emerald-300",
          border: "border-emerald-700",
          button: "bg-gradient-to-r from-green-600 to-emerald-700",
          row: {
            odd: "bg-emerald-900/30",
            even: "bg-emerald-800/30",
          },
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Add current score
  const currentScore = { moves, time, date: new Date().toLocaleDateString() };
  const hasCurrentScore = scores.some(
    (score) => score.moves === moves && score.time === time
  );

  // Format date to be more readable
  const formatDate = (dateString:string) => {
    try {
      if (dateString.includes("T")) {
        // ISO format
        return new Date(dateString).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } else {
        // Already formatted
        return dateString;
      }
    } catch (e) {
      console.error(e)
      return dateString;
    }
  };

  // Get readable difficulty name
  const getDifficultyName = () => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!showScoreboard ? (
        <button
          onClick={() => setShowScoreboard(true)}
          className={`px-6 py-3 rounded-lg  font-semibold bg-amber-700 text-yellow-200 hover:opacity-90 transition-opacity shadow-lg`}
        >
          Show High Scores
        </button>
      ) : (
        <div
          className={`w-full max-w-md bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-4 shadow-lg`}
        >
          <h3
            className={`text-xl font-bold text-yellow-600  mb-3 text-center`}
          >
            {getDifficultyName()} Mode High Scores
          </h3>

          <div className="overflow-hidden rounded-lg border border-opacity-20">
            <table className="w-full">
              <thead
                className={`bg-black  bg-opacity-30 border-b  border-opacity-50`}
              >
                <tr>
                  <th className={`px-4 py-2 text-left text-white`}>
                    Rank
                  </th>
                  <th className={`px-4 py-2 text-left text-white`}>
                    Moves
                  </th>
                  <th className={`px-4 py-2 text-left text-white`}>
                    Time
                  </th>
                  <th className={`px-4 py-2 text-left text-white`}>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.slice(0, 5).map((score, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-black backdrop-blur-md bg-opacity-50" 
                        : "bg-black backdrop-blur-md bg-opacity-60"
                    }`}
                  >
                    <td className={`px-4 py-2 text-white`}>
                      #{index + 1}
                    </td>
                    <td className={`px-4 py-2 text-white`}>
                      {score.moves}
                    </td>
                    <td className={`px-4 py-2 text-white`}>
                      {score.time}
                    </td>
                    <td className={`px-4 py-2 text-white`}>
                      {formatDate(score.date)}
                    </td>
                  </tr>
                ))}

                {/* Show current score if it's not already in the list */}
                {!hasCurrentScore && (
                  <tr className="bg-yellow-500/20 border-t-2 border-b-2 border-yellow-400">
                    <td className={`px-4 py-2 text-amber-700 font-bold`}>
                      New!
                    </td>
                    <td className={`px-4 py-2 text-amber-700 font-bold`}>
                      {currentScore.moves}
                    </td>
                    <td className={`px-4 py-2 text-amber-700 font-bold`}>
                      {currentScore.time}
                    </td>
                    <td className={`px-4 py-2 text-amber-700 font-bold`}>
                      {currentScore.date}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowScoreboard(false)}
              className={`px-6 py-2 ${themeStyles.text} bg-amber-700 text-yellow-200  rounded-lg hover:bg-opacity-80 transition-opacity`}
            >
              Close Scoreboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
