import CategoriesMenu from "./CategoriesMenu";
import TransactionForm from "./TransactionForm";
import "../../styles/createTransaction.scss";
const CreateTransaction = () => {
  return (
    <div className="create-transaction-container">
      <h1>Submit transaction</h1>
      <CategoriesMenu />
      <TransactionForm />
    </div>
  );
};

export default CreateTransaction;
