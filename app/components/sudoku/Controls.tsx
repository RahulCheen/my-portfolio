'use client';

import React from 'react';
import { Difficulty } from '@/lib/sudokuEngine';

interface ControlsProps {
  currentDifficulty: Difficulty;
  onNewGame: (level: Difficulty) => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ currentDifficulty, onNewGame, onReset }) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-8">
      <div className="grid grid-cols-3 gap-3 w-full">
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() => onNewGame(level)}
            className={`px-2 py-2.5 rounded-lg capitalize transition-all border font-medium text-sm sm:text-base ${
              currentDifficulty === level
                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/50'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-400 hover:bg-slate-700'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button
          onClick={() => onNewGame(currentDifficulty)}
          className="w-full py-3 bg-linear-to-r from-blue-500 to-teal-400 hover:from-blue-400 hover:to-teal-300 text-slate-950 font-bold rounded-xl transition-transform active:scale-95 shadow-xl cursor-pointer"
        >
          New Game
        </button>
        
        <button
          onClick={onReset}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors cursor-pointer"
        >
          Reset Board
        </button>
      </div>
    </div>
  );
};

export default Controls;