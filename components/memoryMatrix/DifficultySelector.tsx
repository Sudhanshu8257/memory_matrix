"use client";
import { Difficulty } from "@/lib/hooks/useMemoryGame";
import { ArrowLeft } from "lucide-react";
import React from "react";

export const DifficultySelector = ({
  onSelectDifficulty,
  onBack,
}: {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="p-4 text- rounded-b-xl relative flex items-center justify-center">
        <div className="bg-amber-700 absolute z-10 -top-4 mx-auto rounded-lg px-8 py-4 flex items-center justify-center border-b-4 border-amber-900">
          <span className="text-yellow-200 font-bold lg:text-2xl text-xl">
            SELECT DIFFICULTY
          </span>
        </div>

        <div className="bg-amber-100 rounded-xl relative p-12 flex flex-col items-center justify-center gap-4 ">
          <button
            onClick={onBack}
            className="bg-[#E6C38A] p-4 rounded-2xl absolute top-4 left-4 "
          >
            <ArrowLeft color="#764015" />
          </button>
          <p className="text-amber-900 mt-6 lg:text-2xl font-medium">
            Prepare for a memory challenge that will test your skills!
          </p>

          <div
           
            className="flex items-center justify-center gap-12 mt-8"
          >
            <div  onClick={() => onSelectDifficulty("easy")} className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-xl">
              <div className=" w-[306px] h-[290px] bg-green-100 text-green-800 rounded-xl tracking-wider p-2 border-2 border-green-700 shadow-lg flex flex-col items-center justify-center">
                <span className="text-3xl  font-bold">Easy</span>
                <p className={`text-center text-lg font-bold mt-4`}>4x3 grid</p>
                <p className={`text-center text-sm  font-bold italic mt-2`}>
                  Perfect for beginners!
                </p>
              </div>
            </div>

            {/* Medium */}
            <div
              onClick={() => onSelectDifficulty("medium")}
              className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <div className=" w-[306px] text-yellow-800 h-[290px] bg-yellow-100 rounded-xl tracking-wider p-2 border-2 border-yellow-600 shadow-lg flex flex-col items-center justify-center">
                <span className="text-3xl  font-bold">Medium</span>
                <p className={`text-center text-lg font-bold mt-4`}>5x4 grid</p>
                <p className={`text-center text-sm  font-bold italic mt-2`}>
                  Challenge your memory!
                </p>
              </div>
            </div>

            {/* Hard */}
            <div
              onClick={() => onSelectDifficulty("hard")}
              className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <div className=" w-[306px] h-[290px] text-red-800 bg-red-100 rounded-xl tracking-wider p-2 border-2 border-red-700 shadow-lg flex flex-col items-center justify-center">
                <span className="text-3xl  font-bold">Hard</span>
                <p className={`text-center text-lg font-bold mt-4`}>6x5 grid</p>
                <p className={`text-center text-sm  font-bold italic mt-2`}>
                  For memory masters!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
