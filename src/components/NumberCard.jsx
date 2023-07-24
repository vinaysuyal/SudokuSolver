import "./NumberCard.css";
const NumberCard = ({
  value,
  row,
  col,
  bgColor,
  gridValues,
  setGridValues,
  editable,
}) => {
  const handleInputChange = (row, col, value) => {
    const newGridValues = [...gridValues];
    newGridValues[row][col] = value > 9 ? 9 : value < 1 ? 1 : value;
    setGridValues(newGridValues);
  };
  return (
    <div className="numberCard" style={{ backgroundColor: bgColor }}>
      {!editable && <p>{value}</p>}
      {editable && (
        <input
          type="number"
          maxLength={1}
          value={value === "." ? "" : value}
          onChange={(e) =>
            handleInputChange(
              row,
              col,
              e.target.value === "" ? "." : e.target.value
            )
          }
        />
      )}
    </div>
  );
};
export default NumberCard;
