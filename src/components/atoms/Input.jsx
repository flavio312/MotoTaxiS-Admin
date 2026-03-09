import "./Input.css";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
}) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input--error" : ""}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

export default Input;