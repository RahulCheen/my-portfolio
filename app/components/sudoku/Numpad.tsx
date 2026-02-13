'use client';

import React from "react";

interface NumpadProps {
  onNumberClick: (num: number) => void;
  onPencilClick: () => void;
  grid: { value: number}[][];
  isNoteMode: boolean;
}

const Numpad: React.FC<NumpadProps> = ({ onNumberClick, onPencilClick, grid, isNoteMode }) => {
  const getCounts = () => {
    const counts = Array(10).fill(0);
    grid.forEach(row => row.forEach(cell => {
      if (cell.value !== 0) counts[cell.value]++;
    }));
    return counts;
};

    const counts = getCounts();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-5 gap-2 w-full max-w-md mt-6">
      {numbers.map((num) => {
        const isComplete = counts[num] >= 9;
        return (
          <button
            key={num}
            disabled={isComplete}
            onClick={() => onNumberClick(num)}
            className={`
              h-12 sm:h-14 rounded-lg text-xl font-bold transition-all border
              ${isComplete
                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
                : 'bg-slate-800 border-slate-700 text-blue-400 hover:border-blue-400 active:scale-95 cursor-pointer shadow-lg hover:bg-slate-700'}
            `}
          >
            {num}
          </button>
        );
      })}

      <button
          onClick={onPencilClick}
          className={`h-12 sm:h-14 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 border
            ${isNoteMode 
            ? 'bg-teal-500/20 border-teal-400 text-teal-300' 
            : 'bg-slate-800 border-slate-700 text-slate-300'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
};

export default Numpad;