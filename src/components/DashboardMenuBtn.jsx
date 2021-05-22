import "../styles/dashboardMenuBtn.scss";

const DashboardMenuBtn = ({ icon, onClick = null, content = "" }) => {
  return (
    <div className="dashboard-menu-btn" onClick={onClick}>
      <img src={icon} />
      <span className="dashboard-btn-description">{content}</span>
    </div>
  );
};

export default DashboardMenuBtn;
