export default function getSudokuSolver(
  board,
  timeDifference,
  onChangeValue,
  onCompletion
) {
  let time = 0;

  const debounceMessage = () => {
    let timeout = null;
    return function () {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        onCompletion();
      }, time + 1000);
    };
  };
  const debouncer = debounceMessage();
  const changeValue = (newBoard, r, c) => {
    time = time + timeDifference;
    debouncer();
    setTimeout(() => {
      onChangeValue(newBoard);
    }, time);
  };

  let isValid = function (board, r, c, n) {
    let rowStart = Math.floor(r / 3) * 3;
    let columnStart = Math.floor(c / 3) * 3;
    for (let i = rowStart; i <= rowStart + 2; i++) {
      for (let j = columnStart; j <= columnStart + 2; j++) {
        if (board[i][j] == n) return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (board[r][i] == n || board[i][c] == n) return false;
    }
    return true;
  };

  var solveSudoku = function (r = 0, c = 0) {
    if (r == 9) return true;
    if (board[r][c] != ".") {
      let temp = board[r][c];
      board[r][c] = ".";
      if (!isValid(board, r, c, "" + temp)) {
        board[r][c] = temp;
        return false;
      }
      board[r][c] = temp;
      return solveSudoku(c == 8 ? r + 1 : r, c == 8 ? 0 : c + 1);
    }

    for (let i = 1; i <= 9; i++) {
      if (isValid(board, r, c, "" + i)) {
        board[r][c] = "" + i;
        changeValue(deepCopy(board), r, c);
        if (solveSudoku(c == 8 ? r + 1 : r, c == 8 ? 0 : c + 1)) return true;
        board[r][c] = ".";
        changeValue(deepCopy(board), r, c);
      }
    }
    return false;
  };
  return solveSudoku;
}

export const deepCopy = (originalObject) =>
  JSON.parse(JSON.stringify(originalObject));
