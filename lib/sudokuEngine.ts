export type SudokuGrid = number[][];
export type Difficulty = "easy" | "medium" | "hard";

export interface SolverResult {
  solvable: boolean;
  level: "easy" | "medium" | "hard";
}

export const cloneGrid = (grid: SudokuGrid): SudokuGrid => grid.map((row) => [...row]);

export const isValid = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

export const countSolutions = (grid: SudokuGrid): number => {
  let minOptions = 10;
  let bestCell: { r: number; c: number; options: number[] } | null = null;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) {
        const options: number[] = [];
        for (let n = 1; n <= 9; n++) {
          if (isValid(grid, r, c, n)) options.push(n);
        }
        if (options.length === 0) return 0;
        if (options.length < minOptions) {
          minOptions = options.length;
          bestCell = { r, c, options };
        }
        if (minOptions === 1) break;
      }
    }
    if (minOptions === 1) break;
  }

  if (!bestCell) return 1;

  let count = 0;
  for (const num of bestCell.options) {
    grid[bestCell.r][bestCell.c] = num;
    count += countSolutions(grid);
    grid[bestCell.r][bestCell.c] = 0;
    if (count > 1) return 2;
  }
  return count;
};

export const logicalSolve = (grid: SudokuGrid): SolverResult => {
  const tempGrid = cloneGrid(grid);
  let maxLevel: Difficulty = "easy";

  const getCandidates = (g: SudokuGrid) => {
    const candidates: Set<number>[][] = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => new Set())
    );

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c] === 0) {
          for (let n = 1; n <= 9; n++) {
            if (isValid(g, r, c, n)) candidates[r][c].add(n);
          }
        }
      }
    }
    return candidates;
  };

  while (true) {
    let changed = false;
    const candidates = getCandidates(tempGrid);

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (tempGrid[r][c] === 0 && candidates[r][c].size === 1) {
          tempGrid[r][c] = Array.from(candidates[r][c])[0];
          changed = true;
        }
      }
    }
    if (changed) continue;

    for (let val = 1; val <= 9; val++) {
      for (let i = 0; i < 9; i++) {
        const units = [
          Array.from({ length: 9 }, (_, k) => [i, k]), 
          Array.from({ length: 9 }, (_, k) => [k, i]), 
          Array.from({ length: 9 }, (_, k) => [
            Math.floor(i / 3) * 3 + Math.floor(k / 3),
            (i % 3) * 3 + (k % 3),
          ]),
        ];

        for (const unit of units) {
          const poss = unit.filter(([r, c]) => candidates[r][c].has(val));
          if (poss.length === 1) {
            const [r, c] = poss[0];
            tempGrid[r][c] = val;
            changed = true;
          }
        }
      }
    }
    if (changed) continue;

    for (let r = 0; r < 9; r++) {
      const potentials = Array.from({ length: 9 }, (_, c) => c).filter(
        (c) => candidates[r][c].size === 2
      );
      for (let i = 0; i < potentials.length; i++) {
        for (let j = i + 1; j < potentials.length; j++) {
          const c1 = potentials[i];
          const c2 = potentials[j];
          const s1 = candidates[r][c1];
          const s2 = candidates[r][c2];
          if (Array.from(s1).every((v) => s2.has(v))) {
            for (let c = 0; c < 9; c++) {
              if (c !== c1 && c !== c2) {
                const prevSize = candidates[r][c].size;
                s1.forEach((v) => candidates[r][c].delete(v));
                if (candidates[r][c].size !== prevSize) {
                  changed = true;
                  maxLevel = "medium";
                }
              }
            }
          }
        }
      }
    }

    if (!changed) break;
  }

  const solved = tempGrid.every((row) => row.every((cell) => cell !== 0));
  return { solvable: solved, level: maxLevel };
};

export const generateSudoku = (difficulty: Difficulty): SudokuGrid => {
  const grid: SudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  const fill = (g: SudokuGrid): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c] === 0) {
          const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (const num of nums) {
            if (isValid(g, r, c, num)) {
              g[r][c] = num;
              if (fill(g)) return true;
              g[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fill(grid);
  //const solution = cloneGrid(grid);

  const targetClues = { easy: 40, medium: 34, hard: 28 }[difficulty];
  const cells = Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9]).sort(
    () => Math.random() - 0.5
  );

  let clues = 81;
  for (const [r, c] of cells) {
    if (clues <= targetClues) break;
    if (grid[r][c] === 0) continue;

    const rOpp = 8 - r;
    const cOpp = 8 - c;
    const backup1 = grid[r][c];
    const backup2 = grid[rOpp][cOpp];

    grid[r][c] = 0;
    grid[rOpp][cOpp] = 0;

    if (countSolutions(cloneGrid(grid)) !== 1) {
      grid[r][c] = backup1;
      grid[rOpp][cOpp] = backup2;
      continue;
    }

    const { solvable, level } = logicalSolve(grid);
    if (difficulty === "easy" && (!solvable || level !== "easy")) {
      grid[r][c] = backup1;
      grid[rOpp][cOpp] = backup2;
      continue;
    } else if (difficulty === "medium" && !solvable) {
      grid[r][c] = backup1;
      grid[rOpp][cOpp] = backup2;
      continue;
    }

    clues -= r === rOpp && c === cOpp ? 1 : 2;
  }

  return grid;
};