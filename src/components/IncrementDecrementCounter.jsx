import React from "react";

const IncrementDecrementCounter = ({
  onPlusClick,
  onMinusClick,
  value,
  label,
}) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <button style={styles.button} onClick={onMinusClick}>
        -
      </button>
      <span style={styles.value}>{value}</span>
      <button style={styles.button} onClick={onPlusClick}>
        +
      </button>
    </div>
  );
};

export default IncrementDecrementCounter;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "10px",
  },
  button: {
    padding: "5px 10px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "0 5px",
  },
  value: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 10px",
  },
};
