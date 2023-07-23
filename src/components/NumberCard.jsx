import "./NumberCard.css";
const NumberCard = ({ value, bgColor }) => {
  return (
    <div className="numberCard" style={{ backgroundColor: bgColor }}>
      <p>{value}</p>
    </div>
  );
};
export default NumberCard;
