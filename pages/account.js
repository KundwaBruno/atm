import Head from "next/head";
import styles from "../styles/account.module.css";
import Layout from "../components/Layout/index";
import PopModal from "../components/PopModal";
import Input from "../components/input";
import Button from "../components/button/index";
import cardInfos from "../utils/cardInfos";
import LoadingModal from "../components/LoadingModal";
import ConfirmModal from "../components/confirmModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

const boxesInfo = [
  {
    name: "balance",
    icon: "fas fa-coins",
    label: "Check balance",
  },
  {
    name: "deposit",
    icon: "fas fa-save",
    label: "Deposit cash",
  },
  {
    name: "cheque",
    icon: "fas fa-money-check",
    label: "Deposit cheque",
  },
  {
    name: "withdraw",
    icon: "fas fa-hand-holding-usd",
    label: "Withdraw cash",
  },
  {
    name: "transfer",
    icon: "fas fa-share-square",
    label: "Transfer money",
  },
  {
    name: "logout",
    icon: "fas fa-sign-out-alt",
    label: "Logout",
  },
];

const Balance = ({ amount }) => {
  return (
    <div className={styles.checkBalanceContainer}>
      <div>Current balance</div>
      <p>{amount}</p>
      <p>RWF</p>
    </div>
  );
};

const Transfer = ({
  confirm,
  setConfirm,
  success,
  loading,
  credentials,
  onClick,
  onChange,
  err,
}) => {
  return (
    <div className={styles.depositContainer}>
      <LoadingModal
        success={success}
        loading={loading}
        msg="Amount transfered successfull"
      />
      {confirm && (
        <ConfirmModal
          action="Transfer"
          content={credentials?.balance}
          setConfirm={setConfirm}
          onClick={onClick}
        />
      )}
      <div className={styles.popHead}>Transfer cash</div>
      <Input
        key="tr1"
        label="Amount"
        name="balance"
        type="number"
        placeholder="000"
        credentials={credentials}
        onChange={onChange}
      />
      <Input
        key="tr2"
        label="Recipeint"
        name="cardNumber"
        type="number"
        placeholder="000-000-000-0000"
        credentials={credentials}
        onChange={onChange}
      />
      <div>
        <Button onClick={() => setConfirm(true)} label="Send" />
      </div>
      <div className={styles.insufficient}>{err}</div>
    </div>
  );
};

const Logout = ({
  confirm,
  setConfirm,
  success,
  loading,
  credentials,
  onClick,
}) => {
  return (
    <div className={styles.depositContainer}>
      <LoadingModal
        success={success}
        loading={loading}
        msg="Receipt generated"
      />
      {confirm && (
        <ConfirmModal
          content={credentials?.balance}
          setConfirm={setConfirm}
          onClick={onClick}
          logout={true}
        />
      )}
      <div className={styles.popHead}>Confirm logout</div>

      <div>
        <Button onClick={() => setConfirm(true)} label="Logout" />
      </div>
    </div>
  );
};

const Withdraw = ({
  confirm,
  setConfirm,
  success,
  loading,
  credentials,
  onClick,
  onChange,
  err,
}) => {
  return (
    <div className={styles.depositContainer}>
      <LoadingModal
        success={success}
        loading={loading}
        msg="Amount withdrawn successfull"
      />
      {confirm && (
        <ConfirmModal
          action="Withdraw"
          content={credentials?.balance}
          setConfirm={setConfirm}
          onClick={onClick}
        />
      )}
      <div className={styles.popHead}>Withdraw cash</div>
      <Input
        key="deposit"
        label="Amount"
        name="balance"
        type="number"
        placeholder="000 000 000"
        credentials={credentials}
        onChange={onChange}
      />
      <div>
        <Button onClick={() => setConfirm(true)} label="Withdraw" />
      </div>
      <div className={styles.insufficient}>{err}</div>
    </div>
  );
};

const Cheque = ({
  confirm,
  setConfirm,
  success,
  loading,
  credentials,
  onClick,
  onChange,
  setOpen,
}) => {
  return (
    <div className={styles.depositContainer}>
      <LoadingModal
        success={success}
        loading={loading}
        msg="Amount withdrawn successfull"
      />
      {confirm && (
        <ConfirmModal
          action="Deposit amount on the cheque"
          content={230000}
          setConfirm={setConfirm}
          onClick={onClick}
        />
      )}
      <div className={styles.popHead}>Deposit by Cheque</div>
      <Input
        key="cheque"
        label="Upload cheque"
        name="balance"
        type="file"
        placeholder=""
      />
      <div>
        <Button onClick={() => setConfirm(true)} label="Deposit" />
      </div>
    </div>
  );
};

const Deposit = ({
  confirm,
  setConfirm,
  success,
  loading,
  credentials,
  onClick,
  onChange,
  setOpen,
}) => {
  return (
    <div className={styles.depositContainer}>
      <LoadingModal
        success={success}
        loading={loading}
        msg="Amount diposited successfull"
      />
      {confirm && (
        <ConfirmModal
          action="Deposit"
          content={credentials?.balance}
          setConfirm={setConfirm}
          onClick={onClick}
        />
      )}
      <div className={styles.popHead}>Deposit cash</div>
      <Input
        key="deposit"
        label="Amount"
        name="balance"
        type="number"
        placeholder="000 000 000"
        credentials={credentials}
        onChange={onChange}
      />
      <div>
        <Button onClick={() => setConfirm(true)} label="Deposit" />
      </div>
    </div>
  );
};

const Account = () => {
  const [pop, setPop] = useState("");
  const [err, setErr] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();
  const [user, setUser] = useState();
  const [credentials, setCredentials] = useState({});
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const transfer = () => {
    setErr("");
    setSuccess(false);
    setLoading(true);
    setTimeout(async () => {
      cardInfos.forEach((card) => {
        if (credentials.cardNumber == card.cardNumber) {
          if (credentials.balance > user.balance) {
            setLoading(false);
            setSuccess(false);
            setErr("Insufficient amount");
          } else {
            setErr("");
            const newBal =
              parseInt(user.balance) - parseInt(credentials.balance);
            card.balance = newBal;
            localStorage.setItem("user", JSON.stringify(card));
            setCredentials({});
          }
        } else {
          setLoading(false);
          setSuccess(false);
          setErr("Receipient not found");
        }
      });
      setSuccess(true);
      await setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1000);
    }, 1000);
  };

  const saveDeposit = () => {
    setSuccess(false);
    setLoading(true);
    setTimeout(() => {
      cardInfos.forEach((card) => {
        if (user.cardName === card.cardName) {
          if (!credentials.balance) {
            const newBal = parseInt(user.balance) + 230000;
            card.balance = newBal;
            localStorage.setItem("user", JSON.stringify(card));
            setCredentials({});
          } else {
            const newBal =
              parseInt(card.balance) + parseInt(credentials.balance);
            card.balance = newBal;
            localStorage.setItem("user", JSON.stringify(card));
            setCredentials({});
          }
        }
      });
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1000);
    }, 1000);
  };

  const withdraw = () => {
    setErr("");
    setSuccess(false);
    setLoading(true);
    setTimeout(() => {
      cardInfos.forEach((card) => {
        if (user.cardName === card.cardName) {
          if (credentials.balance > user.balance) {
            setLoading(false);
            setSuccess(false);
            setErr("Insufficient amount");
          } else if (!credentials.balance) {
            const newBal = parseInt(user.balance) - 0;
            card.balance = newBal;
            localStorage.setItem("user", JSON.stringify(card));
            setCredentials({});
          } else {
            const newBal =
              parseInt(card.balance) - parseInt(credentials.balance);
            card.balance = newBal;
            localStorage.setItem("user", JSON.stringify(card));
            setCredentials({});
          }
        }
      });
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1000);
    }, 1000);
  };

  const onChangeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const OpenPop = () => {
    let component;
    switch (pop) {
      case "balance":
        component = <Balance amount={user?.balance} />;
        break;
      case "deposit":
        component = (
          <Deposit
            confirm={confirm}
            setConfirm={setConfirm}
            success={success}
            loading={loading}
            onClick={saveDeposit}
            credentials={credentials}
            onChange={onChangeHandler}
          />
        );
        break;
      case "withdraw":
        component = (
          <Withdraw
            confirm={confirm}
            setConfirm={setConfirm}
            success={success}
            loading={loading}
            onClick={withdraw}
            credentials={credentials}
            onChange={onChangeHandler}
            err={err}
          />
        );
        break;
      case "transfer":
        component = (
          <Transfer
            confirm={confirm}
            setConfirm={setConfirm}
            success={success}
            loading={loading}
            onClick={transfer}
            credentials={credentials}
            onChange={onChangeHandler}
            err={err}
          />
        );
        break;
      case "logout":
        component = (
          <Logout
            confirm={confirm}
            setConfirm={setConfirm}
            success={success}
            loading={loading}
            onClick={withdraw}
          />
        );
        break;
      case "cheque":
        component = (
          <Cheque
            confirm={confirm}
            setConfirm={setConfirm}
            success={success}
            loading={loading}
            onClick={saveDeposit}
            credentials={credentials}
          />
        );
        break;
      default:
        break;
    }
    return <>{component}</>;
  };
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      router.push("/");
    } else {
      setUser(JSON.parse(data));
    }
  }, [success, router]);
  return (
    <Layout>
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={styles.accountContainer}>
        {open && (
          <PopModal setOpen={setOpen} open={open}>
            <OpenPop />
          </PopModal>
        )}
        <div className={styles.profile}>
          <div className={styles.greetings}>Greetings</div>
          <div className={styles.name}>JOHN Doe</div>
          <div className={styles.balance}>00040-2341-4544-4323-60</div>
        </div>
        <div className={styles.profileBody}>
          {boxesInfo.map((box, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setPop(box.name);
                  setOpen(true);
                }}
                className={styles.box}
              >
                <i className={box.icon} />
                <p>{box.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Account;
