import CategoriesMenu from "./CategoriesMenu";
import TransactionForm from "./TransactionForm";
import "../../styles/createTransaction.scss";
import { unrenderedCreateTransaction } from "../../store/reducers/transactionsReducer";
import { useDispatch, useSelector } from "react-redux";
const CreateTransaction = () => {
  const dispatch = useDispatch();
  const isCreateTransaction = useSelector(
    (state) => state.entities.transactions.createTransaction.render
  );
  return (
    <div className="create-transaction-container">
      <span
        className="create-transaction-close-btn"
        onClick={() => dispatch(unrenderedCreateTransaction())}>
        X
      </span>
      <h1>Submit transaction</h1>
      <CategoriesMenu />
      <TransactionForm />
    </div>
  );
};

export default CreateTransaction;
