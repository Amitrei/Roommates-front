import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomTransactions, deleteTranscation } from "../../store/reducers/roomReducer";
import "../../styles/transactionsLog.scss";
import Seperator from "./../Seperator";
import { motion } from "framer-motion";
import PersonIcon from "@material-ui/icons/Person";
import transition from "../../utils/transitionFramer";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ...transition,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const TransactionsLog = ({ isDeleteTransactions }) => {
  const dispatch = useDispatch();
  const roomTransactions = useSelector((state) => state.entities.room.roomTransactions);
  const filteredTransactions = useSelector((state) => state.entities.room.filteredTransactions);
  const currentUserEmail = useSelector((state) => state.auth.user.email);
  const [emailFilter, setEmailFilter] = useState(false);

  useEffect(() => {
    dispatch(getRoomTransactions());
  }, []);

  const trimLog = (amountOfTransactions) => {
    let transactions;
    let length;
    if (filteredTransactions.length) {
      transactions = [...filteredTransactions];
      length = filteredTransactions.length;
    } else {
      transactions = [...roomTransactions];
      length = roomTransactions.length;
    }

    if (emailFilter)
      transactions = transactions.filter((trans) => trans.madeByEmail === currentUserEmail);

    return length >= amountOfTransactions
      ? transactions.slice(length - amountOfTransactions, length)
      : transactions;
  };

  const handleFilterClicked = () => {
    setEmailFilter(!emailFilter);
  };
  const getAllUserTransactions = () => {
    return roomTransactions.filter((t) => t.madeByEmail === currentUserEmail);
  };

  const handleDeleteTransaction = (transactionId) => {
    return dispatch(deleteTranscation(transactionId));
  };

  return !isDeleteTransactions ? (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={
        roomTransactions?.length
          ? "transactions-log-container"
          : "transactions-log-container transactions-empty-log-container"
      }>
      <div className="transactions-log-filters">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={
            emailFilter
              ? "transactions-log-filter-container filter-clicked"
              : "transactions-log-filter-container"
          }
          onClick={handleFilterClicked}>
          <PersonIcon className={emailFilter ? "person-filter-clicked" : ""} fontSize="medium" />
        </motion.div>
      </div>

      <h3>Transaction logs</h3>
      {!roomTransactions.length && (
        <div className="empty-delete-transactions">
          <img src={"https://img.icons8.com/wired/128/000000/empty-box.png"} />
          <h4 style={{ fontSize: "1.4rem", color: "grey" }}>You have no transactions</h4>
        </div>
      )}
      {roomTransactions &&
        trimLog(6).map((transaction) => (
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05, transition: { ...transition, duration: 0.3 } }}
            key={transaction._id}
            initial="hidden"
            animate="show"
            className="transaction-row">
            <span>{transaction.date}</span>
            <div className="transaction-row-seperator">
              <Seperator height="20px" />
            </div>
            <span>{transaction.amount}$</span>
            <div className="transaction-row-seperator">
              <Seperator height="20px" />
            </div>
            <span>{transaction.category}</span>
            <div className="transaction-row-seperator">
              <Seperator height="20px" />
            </div>
            <span className="email-transaction-log">
              {transaction.madeByEmail.substr(0, transaction.madeByEmail.indexOf("@"))}
            </span>
          </motion.div>
        ))}
    </motion.div>
  ) : (
    <div>
      <h3 style={{ marginBottom: "2rem", fontSize: "1.7rem" }}>Remove transaction</h3>
      {roomTransactions &&
        getAllUserTransactions().map((transaction, i) => (
          <div key={i} className="transaction-row">
            <div
              className="delete-transaction-mark"
              onClick={() => {
                handleDeleteTransaction(transaction._id);
                dispatch(getRoomTransactions());
              }}>
              X
            </div>
            <span>{transaction.date}</span>
            <div className="transaction-row-seperator">
              <Seperator height="20px" />
            </div>
            <span>{transaction.amount}$</span>
            <div className="transaction-row-seperator">
              <Seperator height="20px" />
            </div>
            <span>{transaction.category}</span>
            <div className="transaction-row-seperator">
              <Seperator height="20px" />
            </div>
            <span>{transaction.madeByEmail}</span>
          </div>
        ))}
      {!getAllUserTransactions().length && (
        <div className="empty-delete-transactions">
          <img src={"https://img.icons8.com/wired/128/000000/empty-box.png"} />
          <h4 style={{ fontSize: "1.4rem", color: "grey" }}>You have no transactions</h4>
        </div>
      )}
    </div>
  );
};

export default TransactionsLog;
