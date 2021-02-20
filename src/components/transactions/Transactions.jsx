import { useDispatch, useSelector } from "react-redux";
import CategoriesMenu from "./CategoriesMenu";
import CreateTransaction from "./CreateTransaction";
import TransactionsLog from "./TransactionsLog";
import "../../styles/transactions.scss";
const Transactions = () => {
  const room = useSelector((state) => state.entities.room.room);

  return (
    <div className="main-transactions-container">
      <CreateTransaction />
      {/* <h1>{room && room.totalExpenses}</h1> */}
      {/* <TransactionsLog /> */}
    </div>
  );
};

export default Transactions;
