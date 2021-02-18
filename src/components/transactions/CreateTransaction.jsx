import { useState } from "react";
import Form from "./../inputs/Form";
import { createTransaction } from "../../store/reducers/roomReducer";
import { useDispatch } from "react-redux";
const CreateTransaction = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const error = useState(false);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const formFields = [
    {
      value: amount,
      onChange: handleAmountChange,
      label: "amount",
      error: error,
    },
  ];
  return (
    <div>
      <Form
        fieldsArray={formFields}
        onSubmit={() => dispatch(createTransaction({ amount, category: 1 }))}
      />
    </div>
  );
};

export default CreateTransaction;
