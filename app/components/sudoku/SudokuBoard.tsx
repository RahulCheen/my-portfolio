'use client';

import React from 'react';
import { CellState } from '../../sudoku/useSudoku';

interface Props {
  grid: CellState[][];
  selectedCell: { r: number, c: number } | null;
  onSelectCell: (r: number, c: number) => void;
  onCellChange: (r: number, c: number, val: number) => void;
}

const SudokuBoard: React.FC<Props> = ({ grid, selectedCell, onSelectCell, onCellChange }) => {
  if (grid.length === 0) return <div className="text-slate-400">Loading board...</div>;

  const selectedValue = selectedCell ? grid[selectedCell.r][selectedCell.c].value : null;

  return (
    <div 
      className="grid grid-cols-9 border-2 border-slate-700 bg-slate-800 shadow-2xl mx-auto select-none"
      onKeyDown={(e) => {
        if (!selectedCell) return;
        if (e.key === 'Escape') {
          onSelectCell(selectedCell.r, selectedCell.c);
        } else if (/^[1-9]$/.test(e.key)) {
          onCellChange(selectedCell.r, selectedCell.c, parseInt(e.key));
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          onCellChange(selectedCell.r, selectedCell.c, 0);
        }
      }}
      tabIndex={0}
    >
      {grid.map((row, rIdx) => (
        row.map((cell, cIdx) => {
          const isSelected = selectedCell?.r === rIdx && selectedCell?.c === cIdx;
          const isSameRowCol = selectedCell?.r === rIdx || selectedCell?.c === cIdx;
          const isSameBox = selectedCell && 
            Math.floor(rIdx / 3) === Math.floor(selectedCell.r / 3) &&
            Math.floor(cIdx / 3) === Math.floor(selectedCell.c / 3);
          const isSameNumber = selectedValue !== 0 && cell.value === selectedValue;

          const isHighlighted = isSameRowCol || isSameBox;

          const borderRight = (cIdx + 1) % 3 === 0 && cIdx !== 8 ? 'border-r-4 border-slate-600' : 'border-r border-slate-700';
          const borderBottom = (rIdx + 1) % 3 === 0 && rIdx !== 8 ? 'border-b-4 border-slate-600' : 'border-b border-slate-700';

          return (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => onSelectCell(rIdx, cIdx)}
              className={`
                relative w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transition-all cursor-pointer outline-none
                ${borderRight} ${borderBottom}
                ${isSelected 
                  ? (cell.isFixed ? 'bg-blue-900/60' : 'bg-blue-500/40') 
                  : isSameNumber 
                    ? (cell.isFixed ? 'bg-blue-900/40' : 'bg-blue-400/20')
                    : isHighlighted 
                      ? (cell.isFixed ? 'bg-slate-700/40' : 'bg-blue-500/10')
                      : cell.isFixed ? 'bg-slate-900' : 'bg-slate-800'
                }
              `}
            >
              {cell.value !== 0 ? (
                <span className={`text-xl font-bold ${
                  cell.isFixed ? 'text-slate-400' : 
                  cell.isError ? 'text-red-400 decoration-2' : 'text-blue-400'
                }`}>
                  {cell.value}
                </span>
              ) : (
                <div className="grid grid-cols-3 w-full h-full p-1 pointer-events-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <span 
                      key={n} 
                      className="text-[9px] sm:text-[11px] leading-none text-slate-500 flex items-center justify-center font-medium"
                    >
                      {cell.notes.includes(n) ? n : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })
      ))}
    </div>
  );
};

export default SudokuBoard;