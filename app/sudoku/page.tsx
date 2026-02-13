'use client';

import { useEffect } from 'react';
import SudokuBoard from '../components/sudoku/SudokuBoard';
import Controls from '../components/sudoku/Controls';
import { useSudoku } from './useSudoku';
import Numpad from '../components/sudoku/Numpad';

export default function SudokuPage() {
  const {
    grid,
    difficulty,
    startNewGame,
    updateCell,
    resetGame,
    selectedCell,
    onSelectCell,
    isNoteMode,
    toggleNoteMode,
    gameStatus,
    timerText
  } = useSudoku();
  
  useEffect(() => {
    startNewGame('easy');
  }, [startNewGame]);

  const handleNumpadClick = (num: number) => {
    if (selectedCell) {
      updateCell(selectedCell.r, selectedCell.c, num);
    }
  };

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

        <div className="flex justify-between w-full max-w-md mb-4 px-2 font-mono text-xl text-blue-400">
          <span className="capitalize">{difficulty}</span>
          <span>{timerText}</span>
        </div>

        <SudokuBoard
          grid={grid}
          selectedCell={selectedCell}
          onSelectCell={onSelectCell}
          onCellChange={updateCell}
        />

        {gameStatus === 'won' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in rounded-lg border-2 border-teal-400/50">
            <h2 className="text-5xl font-black text-white mb-2 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]">
              You Win!
            </h2>
            <p className="text-teal-300 text-xl font-bold">Time: {timerText}</p>
            <button 
              onClick={() => startNewGame(difficulty)}
              className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-full transition-all"
            >
              Play Again
            </button>
          </div>
        )}

        <Numpad
          grid={grid}
          isNoteMode={isNoteMode}
          onNumberClick={handleNumpadClick}
          onPencilClick={toggleNoteMode}
        />

      </div>
      <p className="mt-8 text-slate-400 max-w-md text-center">
        Blue numbers are your guesses; grey are fixed clues; red guesses are wrong.
      </p>
    </div>
  );
}