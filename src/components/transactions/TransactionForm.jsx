import { useState } from "react";
import Form from "./../inputs/Form";
import { createTransaction } from "../../store/reducers/roomReducer";
import { useDispatch, useSelector } from "react-redux";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState({ amountError: false, descriptionError: false });
  const isCategoryPicked = useSelector(
    (state) => state.entities.transactions.createTransaction.category
  );
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const formFields = [
    {
      value: amount,
      onChange: handleAmountChange,
      label: "amount",
      error: error.amountError,
    },
  ];

  return (
    <div>
      <Form
        error={!isCategoryPicked}
        fieldsArray={formFields}
        onSubmit={() => dispatch(createTransaction({ amount, category: isCategoryPicked }))}
      />
    </div>
  );
};

export default TransactionForm;
