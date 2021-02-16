import "../styles/badge.scss";
const Badge = ({ number, disabled }) => {
  return <div className={disabled ? "badge badge-disabled" : "badge"}>{number}</div>;
};

export default Badge;
