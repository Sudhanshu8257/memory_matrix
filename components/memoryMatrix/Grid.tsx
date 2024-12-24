"use client";
import { halloweenEmojis } from "@/lib/emoji";
import { shuffleArray } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Grid = () => {
  const items = halloweenEmojis.map((emoji, index) => ({
    value: emoji,
    pairKey: index,
    flipped: false,
    matched: false,
  }));
  const getUniqueRandomIds = (length: number, max: number): number[] => {
    if (length > max) {
      throw new Error("Length cannot be greater than max.");
    }

    const numbers: number[] = [];
    for (let i = 0; i < max; i++) {
      numbers.push(i);
    }

    // Fisher-Yates shuffle
    const shuffledArray = shuffleArray(numbers);
    return shuffledArray.slice(0, length);
  };

  const getGridItems = (length: number) => {
    const ids = getUniqueRandomIds((length * length) / 2, items.length);
    const arr = ids.map((id) => items[id]);
    let grid = [...arr, ...arr];
    grid = shuffleArray(grid);
    return grid;
  };
  const [gridItems, setGridItems] = useState(getGridItems(6));
  const [flipCounter, setFlipCounter] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(new Set());

  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");

  const initTime = new Date();

  const showTimer = (ms:number) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    // const hour = Math.floor(ms / 1000 / 60 / 60).toString();
    setTime(
      // hour.padStart(2, "0") +
      // ":" +
      minute + ":" + second + ":" + milliseconds
    );
  };

  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
  };

  useEffect(() => {
    if (!start) {
      return;
    }
    const id = setInterval(() => {
      const left = count + (new Date().getTime() - new Date(initTime).getTime());
      setCount(left);
      showTimer(left);
      if (left <= 0) {
        setTime("00:00:00:00");
        clearInterval(id);
      }
    }, 1);
    return () => clearInterval(id);
  }, [start]);

  const resetGame = () => {
    setGridItems(getGridItems(6));
    setMatchedPairs(new Set());
    setFlipCounter(0);
    setIsFlipping(false);
  };

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
            } else {
              return item;
            }
          });
        });
        setIsFlipping(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [gridItems]);

  const totalPairs = gridItems.length / 2;
  const hasWon = matchedPairs.size === totalPairs;
  useEffect(() => {
    if (hasWon && start) {
      setStart(false);
      clearTime();
    }
  }, [hasWon]);
  const cardStyles = {
    flipCard: `
      .flip-card {
        perspective: 8000px;
        width: 75px;
        height: 75px;
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
      }
      .flip-card-back {
        transform: rotateY(180deg);
      }
    `,
  };
  return (
    <div  className="w-full h-full z-10 flex flex-col justify-center items-center gap-5">
      <style>{cardStyles.flipCard}</style>
      <div className="flex w-[33%] items-center justify-between">
        <div className="bg-white bg-opacity-10 font-semibold px-4 py-2 rounded-lg backdrop-blur-lg">
          <h1 className="text-lg glow text-yellow-400  ">
            Moves : {flipCounter}
          </h1>
        </div>
        <div className="bg-white bg-opacity-10 font-semibold px-4 py-2 rounded-lg backdrop-blur-lg">
          <h1 className="text-lg text-yellow-400">{time}</h1>
        </div>
      </div>
      {hasWon ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl flex flex-col items-center gap-6">
            {/* <Trophy className="w-16 h-16 text-yellow-400" /> */}
            <h2 className="text-3xl font-bold text-white">Congratulations!</h2>
            <p className="text-gray-300">
              You found all pairs in {flipCounter} moves!
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Play Again
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-3 grid-rows-6 rounded-xl ">
          {gridItems?.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (!start) {
                  setStart(true);
                }
                if (!item.flipped && !item.matched && !isFlipping) {
                  setFlipCounter((prev) => prev + 1);
                  setGridItems((prevGridItems) => {
                    return prevGridItems.map((item, index) => {
                      if (index === i) {
                        return { ...item, flipped: true }; // Create a new object with the updated property
                      } else {
                        return item; // Return the existing item if it's not the one to be updated
                      }
                    });
                  });
                }
              }}
              className={`flip-card ${
                item.flipped || item.matched ? "flipped" : ""
              } shrink-0 flex items-center justify-center rounded-xl `}
            >
              <div className="flip-card-inner">
                <div className="hover:scale-105 hover:shadow-xl transition-all duration-300 flip-card-front w-full h-full cursor-pointer bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400 hover:border-2 hover:border-teal-300 rounded-xl shadow-xl flex items-center justify-center">
                  <div className=" bg-white bg-opacity-20 rounded-full"></div>
                </div>
                <div className="flip-card-back w-full h-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center">
                  <p className="text-2xl text-white font-bold">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// bg-gradient-to-br from-blue-500 to-purple-600
// bg-white border  bg-opacity-10 backdrop-blur-md

/*
========== Forset ==========
TEXT  = #FFC857
TILE FRONT =  bg-gradient-to-br from-[#274156] to-[#3B6978]
hover border  =  border-[#3FD1FF]
=========  COLD ==========
TEXT text-blue-200
TILE FRONT  = bg-gradient-to-br from-blue-300 via-blue-100 to-blue-50
hover border-white

========= UNDERWATER ==========
TEXT text-cyan-400
TILE FRONT  = bg-gradient-to-b from-blue-800 via-teal-700 to-cyan-500
hover border-teal-300

========= UNDERWATER ==========
TEXT text-yellow-400
TILE FRONT  = bg-gradient-to-b from-blue-800 via-teal-700 to-cyan-500
hover border-teal-300

*/
export default Grid;
