'use client';

import React from 'react';

interface SudokuCell {
  value: number;
  isFixed: boolean;
  isError: boolean;
}

interface Props {
  grid: SudokuCell[][];
  onCellChange: (r: number, c: number, val: number) => void;
}

const SudokuBoard: React.FC<Props> = ({ grid, onCellChange }) => {
  if (grid.length === 0) return <div className="text-slate-400">Loading board...</div>;

  return (
    <div className="grid grid-cols-9 border-2 border-slate-700 bg-slate-800 shadow-2xl">
      {grid.map((row, rIdx) => (
        row.map((cell, cIdx) => {
          const borderRight = (cIdx + 1) % 3 === 0 && cIdx !== 8 ? 'border-r-4 border-slate-600' : 'border-r border-slate-700';
          const borderBottom = (rIdx + 1) % 3 === 0 && rIdx !== 8 ? 'border-b-4 border-slate-600' : 'border-b border-slate-700';

          return (
            <input
              key={`${rIdx}-${cIdx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={cell.value === 0 ? '' : cell.value}
              disabled={cell.isFixed}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                onCellChange(rIdx, cIdx, isNaN(val) ? 0 : val);
              }}
              className={`
                w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold transition-colors outline-none
                ${borderRight} ${borderBottom}
                ${cell.isFixed ? 'text-slate-400 bg-slate-900/50' : 'text-blue-400 bg-slate-800'}
                ${cell.isError ? 'bg-red-900/30 text-red-400' : 'focus:bg-slate-700'}
              `}
            />
          );
        })
      ))}
    </div>
  );
};

export default SudokuBoard;