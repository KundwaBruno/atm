import styles from "./index.module.css";

const Input = ({ label, name, credentials, type, placeholder, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.label}>{label}</div>
      <input
        className={styles.input}
        name={name}
        value={credentials ? credentials[name] : ""}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
