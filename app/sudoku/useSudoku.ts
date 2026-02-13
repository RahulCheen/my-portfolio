import { useState, useCallback } from 'react';
import { generateSudoku, isValid, SudokuGrid, Difficulty } from '@/lib/sudokuEngine';

export interface CellState {
  value: number;
  isFixed: boolean; 
  isError: boolean; 
}

export const useSudoku = () => {
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const startNewGame = useCallback((level: Difficulty = 'easy') => {
    const newGrid = generateSudoku(level);
    const stateGrid: CellState[][] = newGrid.map(row => 
      row.map(val => ({
        value: val,
        isFixed: val !== 0,
        isError: false
      }))
    );
    setGrid(stateGrid);
    setDifficulty(level);
    setSelectedCell(null);
  }, []);

  const selectCell = useCallback((r: number, c: number) => {
    setSelectedCell(prev => {
      if (prev?.r === r && prev?.c === c) return null;
      return { r, c };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGrid(prev =>
        prev.map(row => 
          row.map(cell => ({
            ...cell,
            value: cell.isFixed ? cell.value : 0,
            isError: false
          }))
        )
      );
  }, []);

  const updateCell = (r: number, c: number, value: number) => {
    if (grid[r][c].isFixed) return;

    setGrid(prev => {
      const newGrid = prev.map(row => [...row]);
      const numGrid: SudokuGrid = newGrid.map((row, rowIndex) => 
        row.map((cell, colIndex) => {
          if (rowIndex === r && colIndex === c) return 0;
          return cell.value;
        })
    );
      const hasError = value !== 0 && !isValid(numGrid, r, c, value);
      
      newGrid[r][c] = { ...newGrid[r][c], value, isError: hasError };
      return newGrid;
    });
  };

  return { grid, difficulty, selectedCell, startNewGame, resetGame, updateCell, onSelectCell: selectCell, setSelectedCell };
};