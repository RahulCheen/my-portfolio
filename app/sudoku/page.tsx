'use client';

import { useEffect } from 'react';
import SudokuBoard from '../components/sudoku/SudokuBoard';
import Controls from '../components/sudoku/Controls';
import { useSudoku } from './useSudoku';

export default function SudokuPage() {
const { grid, difficulty, startNewGame, updateCell, resetGame } = useSudoku();
  useEffect(() => {
    startNewGame('easy');
  }, [startNewGame]);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-teal-300 mb-8">
        Sudoku
      </h1>
      
      <div className="flex flex-col items-center w-full px-4 gap-10">
        <Controls 
            currentDifficulty={difficulty} 
            onNewGame={startNewGame} 
            onReset={resetGame} 
        />

        <SudokuBoard grid={grid} onCellChange={updateCell} />
      </div>
      <p className="mt-8 text-slate-400 max-w-md text-center">
        Blue numbers are your guesses; grey are fixed clues; red guesses are wrong.
      </p>
    </div>
  );
}