import { Loader } from "rsuite";
import styles from "./index.module.css";

const LoadingModal = ({ loading, success, msg }) => {
  return (
    <>
      {loading && (
        <div className={styles.loaderContainer}>
          {success ? (
            <>
              <i className="far fa-check-circle"></i>
              <p>{msg}</p>
            </>
          ) : (
            <Loader size="md" />
          )}
        </div>
      )}
    </>
  );
};

export default LoadingModal;
