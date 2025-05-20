"use client";
import React from "react";
import { Theme, useTheme } from "@/lib/theme-provider";

export const ThemeSelector = ({
  onSelectTheme,
}: {
  onSelectTheme: (theme: Theme) => void;
}) => {
  const { setTheme } = useTheme();

  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
    onSelectTheme(theme);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="p-4 text- rounded-b-xl relative flex items-center justify-center">
        <div className="bg-amber-700 absolute -top-4 mx-auto rounded-lg px-8 py-4 flex items-center justify-center border-b-4 border-amber-900">
          <span className="text-yellow-200 font-bold lg:text-2xl text-xl">
            MEMORY QUEST
          </span>
        </div>
        <div className="bg-amber-100 rounded-xl p-12 flex flex-col items-center justify-center gap-4 ">
          <p className="text-amber-900 mt-6 lg:text-2xl font-medium">
            Select the magical realm for your memory quest!
          </p>
          <div className="flex items-center justify-center gap-12 mt-8">
            <div
              onClick={() => handleThemeSelect("underwater")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative underwater rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-cyan-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">🐠</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  UNDERWATER
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Match sea creatures in ocean depths
                </p>
              </div>
            </div>

            <div
              onClick={() => handleThemeSelect("forest")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative nature rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-emerald-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">🌿</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  NATURE
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Discover wildlife hidden in lush landscapes
                </p>
              </div>
            </div>

            <div
              onClick={() => handleThemeSelect("cold")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative snow rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-emerald-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">❄️</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  SNOW
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Find matching pairs in a frosty wonderland
                </p>
              </div>
            </div>

            <div
              onClick={() => handleThemeSelect("halloween")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative halloween rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-emerald-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">🎃</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  HALLOWEEN
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Match spooky creatures in a haunted world
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
