import NumberCard from "./NumberCard";
import "./SudokuCard.css";
const SudokuCard = ({ board = [[]], setBoard, editable }) => {
  return (
    <div className="sudokuCard">
      {board.map((row, rowIndex) => {
        return row.map((element, colIndex) => {
          return (
            <NumberCard
              value={element}
              bgColor={element === "." ? "red" : "green"}
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
