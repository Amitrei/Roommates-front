import TransactionsLog from "./TransactionsLog";
import TotalExpenses from "./TotalExpenses";
import BarChart from "./charts/BarChart";
import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from "./CreateTransaction";
import {
  renderedCreateTransaction,
  unrenderedCreateTransaction,
} from "../../store/reducers/transactionsReducer";
import "../../styles/transactions.scss";

const Transactions = () => {
  const room = useSelector((state) => state.entities.room.room);
  const dispatch = useDispatch();
  const isCreateTransaction = useSelector(
    (state) => state.entities.transactions.createTransaction.render
  );

  const handleCreateTransactionClick = () => {
    dispatch(renderedCreateTransaction());
  };
  return (
    <>
      <div>
        <button onClick={handleCreateTransactionClick}>create transaction</button>
      </div>
      <div className="main-transactions-container">
        {isCreateTransaction && <CreateTransaction />}

        <div className="transaction-log-grid">
          <TransactionsLog />
        </div>
        <div className="transaction-total-exp-grid">
          <TotalExpenses />
        </div>
        <div className="transaction-by-users-grid">
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default Transactions;
