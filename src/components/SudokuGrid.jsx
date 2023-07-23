import React, { useState } from "react";

const SudokuGrid = ({ gridValues, setGridValues }) => {
  const handleInputChange = (row, col, value) => {
    const newGridValues = [...gridValues];
    newGridValues[row][col] = value;
    setGridValues(newGridValues);
  };

  const renderGrid = () => {
    return gridValues.map((rowValues, row) => (
      <div key={`row-${row}`} style={styles.row}>
        {rowValues.map((value, col) => (
          <input
            key={`input-${row}-${col}`}
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
            style={styles.input}
          />
        ))}
      </div>
    ));
  };

  return <div>{renderGrid()}</div>;
};

const styles = {
  row: {
    display: "flex",
  },
  input: {
    width: "30px",
    height: "30px",
    textAlign: "center",
    margin: "2px",
    appearance: "none", // Hide the increment and decrement arrows in modern browsers
    MozAppearance: "textfield", // Firefox-specific styling
    WebkitAppearance: "none", // Hide the increment and decrement arrows in Chrome
    msAppearance: "none", // Hide the increment and decrement arrows in Edge
  },
};

export default SudokuGrid;
