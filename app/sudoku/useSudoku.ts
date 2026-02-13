import { useState, useCallback, useEffect, useRef } from 'react';
import { generateSudoku, isValid, SudokuGrid, Difficulty } from '@/lib/sudokuEngine';

export interface CellState {
  value: number;
  isFixed: boolean; 
  isError: boolean; 
  notes: number[];
}

export const useSudoku = () => {
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const isWon = grid.length > 0 &&
              grid.every(row => row.every(cell => cell.value !== 0)) &&
              !grid.some(row => row.some(cell => cell.isError));

  useEffect(() => {
    if (!isWon) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {if (timerRef.current) clearInterval(timerRef.current); };
  }, [isWon]);

  const startNewGame = useCallback((level: Difficulty = 'easy') => {
    const newGrid = generateSudoku(level);
    const stateGrid: CellState[][] = newGrid.map(row => 
      row.map(val => ({
        value: val,
        isFixed: val !== 0,
        isError: false,
        notes: []
      }))
    );
    setGrid(stateGrid);
    setDifficulty(level);
    setSelectedCell(null);
    setSeconds(0);
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

  const toggleNoteMode = () => setIsNoteMode(prev => !prev);

  const updateCell = (r: number, c: number, value: number) => {
    if (grid[r][c].isFixed) return;

    setGrid(prev => {
      const newGrid = prev.map(row => [...row]);
      const cell = newGrid[r][c];

      if (isNoteMode) {
        const notes = cell.notes.includes(value)
          ? cell.notes.filter(n => n !== value)
          : [...cell.notes, value].sort();
        newGrid[r][c] = { ...cell, value: 0, notes };
      } else {
        const numberGrid: SudokuGrid = newGrid.map((row, ri) => 
          row.map((col, ci) => (ri === r && ci === c ? 0 : col.value))
        );
        const hasError = value !== 0 && !isValid(numberGrid, r, c, value);
        newGrid[r][c] = { ...cell, value, notes: [], isError: hasError };
      }
      return newGrid;
    });
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return {
    grid,
    difficulty,
    selectedCell,
    isNoteMode,
    gameStatus: isWon ? 'won' : 'playing',
    timerText: formatTime(seconds),
    startNewGame,
    resetGame,
    toggleNoteMode,
    updateCell,
    onSelectCell:selectCell,
    setSelectedCell };
};