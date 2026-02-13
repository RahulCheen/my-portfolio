'use client';

import { useEffect } from 'react';
import SudokuBoard from '../components/sudoku/SudokuBoard';
import Controls from '../components/sudoku/Controls';
import { useSudoku } from './useSudoku';
import Numpad from '../components/sudoku/Numpad';
import MarkdownView from '@/app/components/features/MarkdownView';

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

      <section className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-teal-300 mb-4">
          How it works
        </h2>
        <MarkdownView content={
`## Technical Deep Dive: The Sudoku Engine

The core of this application is a custom Sudoku engine that handles **valid generation**, **difficulty scaling**, and **constraint validation**. The logic follows three stages:

### 1. Randomized Seed Generation
To ensure every game is unique without hitting computational &quot;dead ends,&quot; the engine begins by filling the three **diagonal 3x3 boxes**. 

Because diagonal boxes are independent of each other (they don&apos;t share any rows or columns), they can be filled with a randomized set of numbers (1-9) without any validation checks. This provides a unique &quot;seed&quot; for the board before the more complex logic begins.

### 2. The Backtracking Solver
To fill the remainder of the board, the engine employs a **Depth-First Search (DFS)** backtracking algorithm.

* **Recursive Exploration**: The algorithm identifies the next empty cell and attempts to place a number (1-9).
* **Constraint Checking**: For every placement, it verifies three rules:
    1.  **Row Uniqueness**: The number is not already in the current row.
    2.  **Column Uniqueness**: The number is not already in the current column.
    3.  **Box Uniqueness**: The number is not in the current 3x3 subgrid.
* **Backtrack Mechanism**: If a placement leads to a state where no numbers can legally be placed in a subsequent cell, the algorithm &quot;backtracks&quot; by nullifying the current cell and trying the next available number.



### 3. Difficulty Mapping (Puzzle Carving)
Once a fully solved 9x9 grid is generated, the engine &quot;carves&quot; a puzzle out of it based on the user&apos;s selected difficulty by removing values at random coordinates.

| Difficulty | Clues Remaining | Logic Profile |
| :--- | :--- | :--- |
| **Easy** | 40 - 50 | High density; solvable via basic elimination. |
| **Medium** | 30 - 39 | Requires scanning for &quot;naked singles.&quot; |
| **Hard** | 22 - 29 | Low density; requires advanced &quot;hidden&quot; logic. |

### Complexity Analysis
* **Time Complexity**: $O(9^n)$, where $n$ is the number of empty cells. While technically exponential, the 9x9 constraints and diagonal seeding keep generation time to sub-10ms.
* **Space Complexity**: $O(n)$ for the recursion stack during the backtracking phase.
        `} />
      </section>

    </div>
  );
}