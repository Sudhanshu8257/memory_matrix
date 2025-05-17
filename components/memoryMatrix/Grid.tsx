"use client";
import { halloweenEmojis, natureEmojis, snowEmojis } from "@/lib/emoji";
import { shuffleArray } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { ThemeSelector } from "./theme-selector";

const Grid = () => {
  const items = natureEmojis.map((emoji, index) => ({
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
  const [startGame, setStartGame] = useState(false);
  const [gridItems, setGridItems] = useState(getGridItems(6));
  const [flipCounter, setFlipCounter] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(new Set());

  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");

  const initTime = new Date();

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
      const left =
        count + (new Date().getTime() - new Date(initTime).getTime());
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
  return startGame ? (
    // <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-md flex flex-col items-center justify-center p-4 lg:p-6">
    //   <h1 className="text-4xl font-bold text-amber-300 mb-4 tracking-wider drop-shadow-md">SELECT DIFFICULTY</h1>
    //   <p className="text-xl text-cyan-200 mb-10">Prepare for a memory challenge that will test your skills!</p>

    //   <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
    //     {/* Easy Difficulty Card */}
    //     <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
    //       <div className="relative bg-gradient-to-b from-green-400 to-green-600 rounded-xl p-8 border-4 border-emerald-900 shadow-lg shadow-emerald-900/50 w-64 h-60 flex flex-col items-center justify-center overflow-hidden">
    //         {/* Background decorative elements */}
    //         <div className="absolute top-0 left-0 w-full h-full opacity-10">
    //           {Array(12).fill().map((_, i) => (
    //             <div key={i} className="absolute rounded-full bg-white"
    //                  style={{
    //                    width: `${Math.random() * 20 + 10}px`,
    //                    height: `${Math.random() * 20 + 10}px`,
    //                    top: `${Math.random() * 100}%`,
    //                    left: `${Math.random() * 100}%`,
    //                    animation: `pulse ${Math.random() * 4 + 2}s infinite`
    //                  }} />
    //           ))}
    //         </div>

    //         {/* Difficulty Text */}
    //         <h2 className="text-4xl font-bold text-yellow-100 tracking-wider mb-2 text-center drop-shadow-lg">EASY</h2>
    //         <p className="text-center text-emerald-100 text-lg font-semibold">4×3 grid</p>
    //         <p className="text-center text-emerald-100 text-sm italic mt-2">Perfect for beginners!</p>

    //         {/* Hover effect highlight */}
    //         <div className="absolute inset-0 bg-emerald-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    //       </div>
    //       {/* Card shadow/reflection effect */}
    //       <div className="h-3 bg-emerald-900/30 blur-sm rounded-full mx-6 mt-2"></div>
    //     </div>

    //     {/* Medium Difficulty Card */}
    //     <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
    //       <div className="relative bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-amber-900/50 w-64 h-60 flex flex-col items-center justify-center overflow-hidden">
    //         {/* Background decorative elements */}
    //         <div className="absolute top-0 left-0 w-full h-full opacity-10">
    //           {Array(12).fill().map((_, i) => (
    //             <div key={i} className="absolute rounded-full bg-white"
    //                  style={{
    //                    width: `${Math.random() * 20 + 10}px`,
    //                    height: `${Math.random() * 20 + 10}px`,
    //                    top: `${Math.random() * 100}%`,
    //                    left: `${Math.random() * 100}%`,
    //                    animation: `pulse ${Math.random() * 4 + 2}s infinite`
    //                  }} />
    //           ))}
    //         </div>

    //         {/* Difficulty Text */}
    //         <h2 className="text-4xl font-bold text-amber-100 tracking-wider mb-2 text-center drop-shadow-lg">MEDIUM</h2>
    //         <p className="text-center text-amber-100 text-lg font-semibold">5×4 grid</p>
    //         <p className="text-center text-amber-100 text-sm italic mt-2">Challenge your memory!</p>

    //         {/* Hover effect highlight */}
    //         <div className="absolute inset-0 bg-amber-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    //       </div>
    //       {/* Card shadow/reflection effect */}
    //       <div className="h-3 bg-amber-900/30 blur-sm rounded-full mx-6 mt-2"></div>
    //     </div>

    //     {/* Hard Difficulty Card */}
    //     <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
    //       <div className="relative bg-gradient-to-b from-red-400 to-red-600 rounded-xl p-8 border-4 border-red-900 shadow-lg shadow-red-900/50 w-64 h-60 flex flex-col items-center justify-center overflow-hidden">
    //         {/* Background decorative elements */}
    //         <div className="absolute top-0 left-0 w-full h-full opacity-10">
    //           {Array(12).fill().map((_, i) => (
    //             <div key={i} className="absolute rounded-full bg-white"
    //                  style={{
    //                    width: `${Math.random() * 20 + 10}px`,
    //                    height: `${Math.random() * 20 + 10}px`,
    //                    top: `${Math.random() * 100}%`,
    //                    left: `${Math.random() * 100}%`,
    //                    animation: `pulse ${Math.random() * 4 + 2}s infinite`
    //                  }} />
    //           ))}
    //         </div>

    //         {/* Difficulty Text */}
    //         <h2 className="text-4xl font-bold text-red-100 tracking-wider mb-2 text-center drop-shadow-lg">HARD</h2>
    //         <p className="text-center text-red-100 text-lg font-semibold">6×5 grid</p>
    //         <p className="text-center text-red-100 text-sm italic mt-2">For memory masters!</p>

    //         {/* Hover effect highlight */}
    //         <div className="absolute inset-0 bg-red-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    //       </div>
    //       {/* Card shadow/reflection effect */}
    //       <div className="h-3 bg-red-900/30 blur-sm rounded-full mx-6 mt-2"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-md flex flex-col items-center justify-center p-4 lg:p-6">
      <h1 className="text-4xl font-bold text-amber-300 mb-4 tracking-wider drop-shadow-md">
        CHOOSE YOUR WORLD
      </h1>
      <p className="text-xl text-cyan-200 mb-10">
        Select the magical realm for your memory quest!
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
        {/* Halloween Theme Card */}
        <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
          <div className="relative bg-gradient-to-b from-orange-500 to-purple-800 rounded-xl p-8 border-4 border-purple-900 shadow-lg shadow-purple-900/50 w-64 h-60 flex flex-col items-center justify-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              {Array(8)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      opacity: 0.4,
                    }}
                  >
                    {
                      ["🎃", "👻", "🦇", "🕸️", "🕷️"][
                        Math.floor(Math.random() * 5)
                      ]
                    }
                  </div>
                ))}
            </div>

            {/* Theme Icon */}
            <div className="text-5xl mb-4">🎃</div>

            {/* Theme Text */}
            <h2 className="text-3xl font-bold text-orange-100 tracking-wider mb-1 text-center drop-shadow-lg">
              HALLOWEEN
            </h2>
            <p className="text-center text-purple-100 text-sm">
              Match spooky creatures in a haunted world
            </p>

            {/* Hover effect highlight */}
            <div className="absolute inset-0 bg-orange-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          {/* Card shadow/reflection effect */}
          <div className="h-3 bg-purple-900/30 blur-sm rounded-full mx-6 mt-2"></div>
        </div>

        {/* Snow Theme Card */}
        <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
          <div className="relative bg-gradient-to-b from-blue-300 to-blue-600 rounded-xl p-8 border-4 border-blue-900 shadow-lg shadow-blue-900/50 w-64 h-60 flex flex-col items-center justify-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              {Array(8)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      opacity: 0.4,
                    }}
                  >
                    {
                      ["❄️", "☃️", "🧊", "⛄", "❄️"][
                        Math.floor(Math.random() * 5)
                      ]
                    }
                  </div>
                ))}
            </div>

            {/* Theme Icon */}
            <div className="text-5xl mb-4">❄️</div>

            {/* Theme Text */}
            <h2 className="text-3xl font-bold text-blue-100 tracking-wider mb-1 text-center drop-shadow-lg">
              SNOW
            </h2>
            <p className="text-center text-sky-100 text-sm">
              Find matching pairs in a frosty wonderland
            </p>

            {/* Hover effect highlight */}
            <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          {/* Card shadow/reflection effect */}
          <div className="h-3 bg-blue-900/30 blur-sm rounded-full mx-6 mt-2"></div>
        </div>

        {/* Nature Theme Card */}
        <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
          <div className="relative bg-gradient-to-b from-green-500 to-green-700 rounded-xl p-8 border-4 border-emerald-900 shadow-lg shadow-emerald-900/50 w-64 h-60 flex flex-col items-center justify-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              {Array(8)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      opacity: 0.4,
                    }}
                  >
                    {
                      ["🌳", "🦋", "🌸", "🦊", "🌿"][
                        Math.floor(Math.random() * 5)
                      ]
                    }
                  </div>
                ))}
            </div>

            {/* Theme Icon */}
            <div className="text-5xl mb-4">🌿</div>

            {/* Theme Text */}
            <h2 className="text-3xl font-bold text-lime-200 tracking-wider mb-1 text-center drop-shadow-lg">
              NATURE
            </h2>
            <p className="text-center text-emerald-100 text-sm">
              Discover wildlife hidden in lush landscapes
            </p>

            {/* Hover effect highlight */}
            <div className="absolute inset-0 bg-emerald-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          {/* Card shadow/reflection effect */}
          <div className="h-3 bg-emerald-900/30 blur-sm rounded-full mx-6 mt-2"></div>
        </div>

        {/* Underwater Theme Card */}
        <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
          <div className="relative bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-xl p-8 border-4 border-cyan-900 shadow-lg shadow-cyan-900/50 w-64 h-60 flex flex-col items-center justify-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              {Array(8)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      opacity: 0.4,
                    }}
                  >
                    {
                      ["🐠", "🐙", "🐚", "🐬", "🦀"][
                        Math.floor(Math.random() * 5)
                      ]
                    }
                  </div>
                ))}
            </div>

            {/* Theme Icon */}
            <div className="text-5xl mb-4">🐠</div>

            {/* Theme Text */}
            <h2 className="text-3xl font-bold text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
              UNDERWATER
            </h2>
            <p className="text-center text-blue-100 text-sm">
              Match sea creatures in ocean depths
            </p>

            {/* Hover effect highlight */}
            <div className="absolute inset-0 bg-cyan-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          {/* Card shadow/reflection effect */}
          <div className="h-3 bg-cyan-900/30 blur-sm rounded-full mx-6 mt-2"></div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="w-full h-fit flex flex-col justify-center items-center gap-5">
        <style>{cardStyles.flipCard}</style>
        <div className="flex w-[33%] items-center justify-between">
          <div className="bg-white bg-opacity-10 font-semibold px-4 py-2 rounded-lg backdrop-blur-lg">
            <h1 className="text-lg glow text-yellow-400  ">
              Moves : {flipCounter}
            </h1>
          </div>

          <div className="bg-white bg-opacity-10 font-semibold px-4 py-2 rounded-lg backdrop-blur-lg">
            <h1 className="text-lg theme-text">{time}</h1>
          </div>
        </div>
        {hasWon ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl flex flex-col items-center gap-6">
              {/* <Trophy className="w-16 h-16 text-yellow-400" /> */}
              <h2 className="text-3xl font-bold text-white">
                Congratulations!
              </h2>
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
                  <div className="hover:scale-105 hover:shadow-xl transition-all duration-300 flip-card-front w-full h-full theme-hover cursor-pointer theme-tile hover:border-2 hover:border-teal-300 rounded-xl shadow-xl flex items-center justify-center">
                    <div className=" bg-white bg-opacity-20 rounded-full"></div>
                  </div>
                  <div className="flip-card-back w-full h-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center">
                    <p className="text-2xl text-white font-bold">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

// bg-gradient-to-br from-blue-500 to-purple-600
// bg-white border  bg-opacity-10 backdrop-blur-md

/*
========== Forset ==========
TEXT  = #FFC857
TILE FRONT =  bg-gradient-to-br from-[#274156] to-[#3B6978]
hover border  =  border-[#3FD1FF]
bg image src = /assets/background/Nature.jpg

=========  COLD ==========
TEXT text-blue-200
TILE FRONT  = bg-gradient-to-br from-blue-300 via-blue-100 to-blue-50
hover border-white
bg image src = /assets/background/Snow.jpg

========= UNDERWATER ==========
TEXT text-cyan-400
TILE FRONT  = bg-gradient-to-b from-blue-800 via-teal-700 to-cyan-500
hover border-teal-300
bg image src = /assets/background/Underwater.jpg

========= HALLOWEEN ==========
TEXT text-yellow-400
TILE FRONT = bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400
hover border-teal-300
bg image src = /assets/background/Snow.jpg

*/
export default Grid;
