import styles from "./index.module.css";

const PopModal = ({ header, setOpen, children }) => {
  return (
    <>
      <div className={styles.popContainer}>
        <div className={styles.popBox}>
          <div className={styles.header}>
            <div>{header}</div>
            <div onClick={() => setOpen(false)}>
              <i className="fas fa-times" />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default PopModal;
