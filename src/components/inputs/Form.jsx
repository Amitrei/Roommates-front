import TextInput from "./TextInput";
import Button from "@material-ui/core/Button";
import "../../styles/form.scss";

const Form = ({ fieldsArray = [], onSubmit, error }) => {
  return (
    <form className="custom-form">
      {fieldsArray.map((field) => (
        <TextInput key={fieldsArray.findIndex((field) => field === field)} {...field} />
      ))}

      <Button
        onClick={onSubmit}
        variant="contained"
        color="primary"
        className="create-room-btn"
        size="large"
        disabled={error}
        style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
        Submit
      </Button>
    </form>
  );
};

export default Form;
