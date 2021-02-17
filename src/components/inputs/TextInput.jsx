import "../../styles/textInput.scss";
const TextInput = ({ label, error, ...rest }) => {
  return (
    <div>
      <label className="custom-label-container">
        <span className="custom-label">{label}</span>
        <input className="custom-text-input" {...rest} />
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TextInput;
