import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from "./CreateTransaction";
import TransactionsLog from "./TransactionsLog";
const Transactions = () => {
  const room = useSelector((state) => state.entities.room.room);


  return (
    <div>
      <CreateTransaction />
      <h1>{room && room.totalExpenses}</h1>
      <TransactionsLog />
    </div>
  );
};

export default Transactions;
