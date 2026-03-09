import "./StatCard.css";

const StatCard = ({ icon, value, label, color = "blue" }) => {
  return (
    <div className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${color}`}>{icon}</div>
      <div>
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__label">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;