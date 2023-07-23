import NumberCard from "./NumberCard";
import "./SudokuCard.css";
const SudokuCard = ({ board = [[]], color }) => {
  return (
    <div className="sudokuCard">
      {board.map((row, index1) => {
        return row.map((element, index2) => {
          return (
            <NumberCard
              value={element}
              bgColor={element === "." ? "red" : "green"}
              id={index1 + "" + index2}
            />
          );
        });
      })}
    </div>
  );
};
export default SudokuCard;
