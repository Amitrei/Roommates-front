import { useSelector } from "react-redux";
import PieChart from "./charts/PieChart";
import "../../styles/totalExpenses.scss";
import Seperator from "./../Seperator";
const TotalExpenses = () => {
  const room = useSelector((state) => state.entities.room.room);

  return (
    <div className="total-expenses-container">
      <h3>Total expenses</h3>
      <div className="total-expenses-flex-container">
        <div className="total-expenses-left-side">
          <span className="total-expenses-amount">{room?.totalExpenses}</span>
        </div>
        {/* <Seperator /> */}
        <div className="total-expenses-right-side">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default TotalExpenses;
