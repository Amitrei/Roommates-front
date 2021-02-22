import { useDispatch } from "react-redux";
import "../../styles/deleteTransaction.scss";
import TransactionsLog from "./TransactionsLog";
import { unRenderDeleteTransaction } from "../../store/reducers/transactionsReducer";
const DeleteTransaction = () => {
  const dispatch = useDispatch();
  return (
    <div className="delete-transaction-container">
      <span
        className="delete-transaction-close-btn"
        onClick={() => dispatch(unRenderDeleteTransaction())}>
        X
      </span>
      <TransactionsLog isDeleteTransactions={true} />
    </div>
  );
};

export default DeleteTransaction;
