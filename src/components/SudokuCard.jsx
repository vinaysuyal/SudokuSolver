import NumberCard from "./NumberCard";
import "./SudokuCard.css";
const SudokuCard = ({ board = [[]], setBoard, editable, visited }) => {
  return (
    <div className="sudokuCard">
      {board.map((row, rowIndex) => {
        return row.map((element, colIndex) => {
          return (
            <NumberCard
              value={element}
              bgColor={
                element === "."
                  ? visited[rowIndex][colIndex]
                    ? "#00FF80"
                    : "#ECEFF1 "
                  : "#FF4040"
              }
              id={rowIndex + "" + colIndex}
              row={rowIndex}
              col={colIndex}
              gridValues={board}
              setGridValues={setBoard}
              editable={editable}
            />
          );
        });
      })}
    </div>
  );
};
export default SudokuCard;
