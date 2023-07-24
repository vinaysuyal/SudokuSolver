import { useEffect, useState } from "react";
import "./App.css";
import IncrementDecrementCounter from "./components/IncrementDecrementCounter";
import SudokuCard from "./components/SudokuCard";
import data from "./utils/sampleSudoku.json";
import getSudokuSolver, { deepCopy } from "./utils/sudokuSolver";

function App() {
  const [board, setBoard] = useState(deepCopy(data[0]));
  const [pace, setPace] = useState(1);
  const [solving, setSolving] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [visited, setVisited] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
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

  const onSolveSudoku = () => {
    if (findEmptyCells(board).length == 0) {
      alert(
        "All fields filled. Please Enter custom Values or use Sample Values"
      );
      return;
    }
    if (findEmptyCells(board).length > 55) {
      alert("Enter at least 25 values");
      return;
    }
    setCustomInput(false);
    setSolving(true);
    const a = getSudokuSolver(
      deepCopy(board),
      deepCopy(visited),
      pace,
      (newBoard) => {
        setBoard(newBoard);
      },
      () => {
        setSolving(false);
      },
      (newVisited) => {
        setVisited(newVisited);
      }
    );
    const result = a();
    if (result == false) {
      alert("Invalid Sudoku. On Clicking on Ok, You can see the tracking.");
    }
  };
  return (
    <div className="App">
      <h1>Backtracking Sudoku Solver Visualiser</h1>
      {
        <SudokuCard
          board={board}
          setBoard={setBoard}
          editable={customInput}
          visited={visited}
        />
      }
      {!solving && (
        <>
          <span>
            <input
              checked={customInput}
              onChange={(e) => {
                setCustomInput((prev) => !prev);
              }}
              type="checkbox"
            />
            Edit
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
                onSolveSudoku();
              }}
            >
              Solve Sudoku
            </button>
            <button
              onClick={() => {
                setBoard(deepCopy(data[0]));
                setVisited(
                  Array.from({ length: 9 }, () => Array(9).fill(false))
                );
              }}
            >
              Use Sample Input
            </button>
            <button
              onClick={() => {
                clearBoard();
              }}
            >
              Clear Board
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
