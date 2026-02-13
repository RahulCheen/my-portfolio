'use client';

import React from 'react';

interface SudokuCell {
  value: number;
  isFixed: boolean;
  isError: boolean;
}

interface Props {
  grid: SudokuCell[][];
  selectedCell: { r: number, c: number } | null;
  onSelectCell: (r: number, c: number) => void;
  onCellChange: (r: number, c: number, val: number) => void;
}

const SudokuBoard: React.FC<Props> = ({ grid, selectedCell, onSelectCell, onCellChange }) => {
  if (grid.length === 0) return <div className="text-slate-400">Loading board...</div>;

  const selectedValue = selectedCell ? grid[selectedCell.r][selectedCell.c].value : null;

  return (
    <div className="grid grid-cols-9 border-2 border-slate-700 bg-slate-800 shadow-2xl mx-auto">
      {grid.map((row, rIdx) => (
        row.map((cell, cIdx) => {
          const isSelected = selectedCell?.r === rIdx && selectedCell?.c === cIdx;
          const isSameRowCol= selectedCell?.r === rIdx || selectedCell?.c === cIdx;
          const isSameBox = selectedCell && 
            Math.floor(rIdx / 3) === Math.floor(selectedCell.r / 3) &&
            Math.floor(cIdx / 3) === Math.floor(selectedCell.c / 3);
          const isSameNumber = selectedValue !== 0 && cell.value === selectedValue;
          const isHighlighted = isSameRowCol || isSameBox || isSameNumber;

          const borderRight = (cIdx + 1) % 3 === 0 && cIdx !== 8 ? 'border-r-4 border-slate-600' : 'border-r border-slate-700';
          const borderBottom = (rIdx + 1) % 3 === 0 && rIdx !== 8 ? 'border-b-4 border-slate-600' : 'border-b border-slate-700';

          return (
            <input
              key={`${rIdx}-${cIdx}`}
              type="text"
              readOnly={cell.isFixed}
              inputMode="numeric"
              maxLength={1}
              value={cell.value === 0 ? '' : cell.value}
              onFocus={() => onSelectCell(rIdx, cIdx)}
              onChange={(e) => {
                const val = parseInt(e.target.value.slice(-1));
                onCellChange(rIdx, cIdx, isNaN(val) ? 0 : val);
              }}
              className={`
                w-10 h-10 sm:w-14 sm:h-14 text-center text-xl font-bold transition-all outline-none cursor-pointer
                ${borderRight} ${borderBottom}
                ${cell.isFixed ? 'text-slate-400' : 'text-blue-400'}
                ${isSelected 
                  ? (cell.isFixed ? 'bg-blue-900/60' : 'bg-blue-500/40') 
                  : isSameNumber 
                    ? (cell.isFixed ? 'bg-blue-900/40' : 'bg-blue-400/20')
                    : isHighlighted 
                      ? (cell.isFixed ? 'bg-slate-900/50' : 'bg-slate-700/50')
                      : cell.isFixed ? 'bg-slate-900/50' : 'bg-slate-800'
                }
              `}
            />
          );
        })
      ))}
    </div>
  );
};

export default SudokuBoard;