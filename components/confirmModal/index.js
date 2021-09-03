import { useRouter } from "next/router";
import styles from "./index.module.css";

const ConfirmModal = ({ action, content, setConfirm, onClick, logout }) => {
  const router = useRouter();
  return (
    <>
      <div className={styles.confirmModal}>
        {!logout && <h5>{`Are you sure you want to ${action} :`}</h5>}
        {logout && <h5>{`Do you want a receipt of the transactions made?`}</h5>}
        {!logout && <p>{`${content} RWF`}</p>}
        <button
          onClick={() => {
            onClick();
            setConfirm(false);
            if (logout) {
              localStorage.removeItem("user");
              router.push("/");
            }
          }}
          className={styles.button}
        >
          {logout ? (
            <a href="test.pdf" download>
              Yes
            </a>
          ) : (
            "Yes"
          )}
        </button>
        <button
          onClick={() => {
            setConfirm(false);
            if (logout) {
              localStorage.removeItem("user");
              router.push("/");
            }
          }}
          className={styles.button}
        >
          No
        </button>
      </div>
    </>
  );
};

export default ConfirmModal;
