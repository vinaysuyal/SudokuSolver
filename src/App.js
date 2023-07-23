import { useEffect, useState } from "react";
import "./App.css";
import IncrementDecrementCounter from "./components/IncrementDecrementCounter";
import SudokuCard from "./components/SudokuCard";
import SudokuGrid from "./components/SudokuGrid";
import data from "./utils/sampleSudoku.json";
import getSudokuSolver, { deepCopy } from "./utils/sudokuSolver";

function App() {
  const [board, setBoard] = useState(deepCopy(data[0]));
  const [pace, setPace] = useState(1);
  const [solving, setSolving] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [validSudoku, setValidSudoku] = useState(true);
  useEffect(() => {
    if (!board.filter((ele) => ele.includes(".")).length) {
      setSolving(false);
    }
  }, [board]);

  const clearBoard = () => {
    const initialGrid = Array.from({ length: 9 }, () => Array(9).fill("."));
    setBoard(initialGrid);
  };
  const findEmptyCells = (grid) => {
    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === ".") {
          emptyCells.push({ row, col });
        }
      }
    }
    return emptyCells;
  };
  return (
    <div className="App">
      <h1>Backtracking Sudoku Solver Visualiser</h1>
      {!customInput && <SudokuCard board={board} />}
      {customInput && (
        <SudokuGrid gridValues={board} setGridValues={setBoard} />
      )}
      {!solving && (
        <>
          <span>
            <input
              checked={customInput}
              onChange={(e) => {
                setCustomInput((prev) => !prev);
                clearBoard();
              }}
              type="checkbox"
            />
            Use Custom Input
          </span>
          <span>
            <IncrementDecrementCounter
              label={"Delay:"}
              value={pace}
              onMinusClick={() => setPace((prev) => Math.floor(prev / 2))}
              onPlusClick={() =>
                setPace((prev) => (prev === 0 ? 1 : Math.ceil(prev * 2)))
              }
            />
          </span>
          <div>
            <button
              onClick={() => {
                if (findEmptyCells(board).length == 0) {
                  alert(
                    "All fields filled. Please Enter custom Values or use Sample Values"
                  );
                }
                if (findEmptyCells(board).length > 55) {
                  alert("Enter at least 25 values");
                  return;
                }
                setCustomInput(false);
                setSolving(true);
                const a = getSudokuSolver(
                  deepCopy(board),
                  pace,
                  (newBoard) => {
                    setBoard(newBoard);
                  },
                  () => {
                    setSolving(false);
                  }
                );
                const result = a();
                if (result == false) {
                  alert(
                    "Invalid Sudoku. On Clicking on Ok, You can see the tracking."
                  );
                  setValidSudoku(false);
                }
              }}
            >
              Solve Sudoku
            </button>
            <button
              onClick={() => {
                setBoard(deepCopy(data[0]));
              }}
            >
              Use Sample Input
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
