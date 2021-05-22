import { useSelector } from "react-redux";
import PieChart from "./charts/PieChart";
import "../../styles/totalExpenses.scss";
import Seperator from "./../Seperator";
const TotalExpenses = () => {
  const room = useSelector((state) => state.entities.room.room);
  const filteredTransactions = useSelector((state) => state.entities.room.filteredTransactions);

  const getTotalExpenses = () => {
    if (filteredTransactions.length) {
      let filteredTotalCost = 0;
      filteredTransactions.forEach((trans) => {
        filteredTotalCost += trans.amount;
      });
      return filteredTotalCost;
    }

    return room?.totalExpenses;
  };

  return (
    <div className="total-expenses-container">
      <h3>Total expenses</h3>
      <div className="total-expenses-flex-container">
        <div className="total-expenses-left-side">
          <span className="total-expenses-amount">{room && `${getTotalExpenses()} $`}</span>
        </div>
        <div className="total-expenses-right-side">
          {room?.totalExpenses == 0 ? <h2 className="no-data">No data yet</h2> : <PieChart />}
        </div>
      </div>
    </div>
  );
};

export default TotalExpenses;
