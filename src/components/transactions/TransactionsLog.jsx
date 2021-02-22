import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomTransactions, deleteTranscation } from "../../store/reducers/roomReducer";
import "../../styles/transactionsLog.scss";
import Seperator from "./../Seperator";

const TransactionsLog = ({ isDeleteTransactions }) => {
  const dispatch = useDispatch();
  const roomTransactions = useSelector((state) => state.entities.room.roomTransactions);
  const currentUserEmail = useSelector((state) => state.auth.user.email);
  useEffect(() => {
    dispatch(getRoomTransactions());
  }, []);

  const trimLog = (amountOfTransactions) => {
    const length = roomTransactions.length;
  
    return length >= 5 ? roomTransactions.slice(length - amountOfTransactions, length) : roomTransactions;
  };

  const getAllUserTransactions = () => {
    return roomTransactions.filter((t) => t.madeByEmail === currentUserEmail);
  };

  return !isDeleteTransactions ? (
    <div
      className={
        roomTransactions?.length ? "transactions-log-container" : "transactions-empty-log-container"
      }>
      {roomTransactions &&
        trimLog(5).map((transaction) => (
          <div key={transaction._id} className="transaction-row">
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
      <h3>Transaction logs</h3>
    </div>
  ) : (
    <div>
      <h3 style={{ marginBottom: "2rem", fontSize: "1.7rem" }}>Remove transaction</h3>
      {roomTransactions &&
        getAllUserTransactions().map((transaction) => (
          <div key={transaction._id} className="transaction-row">
            <div
              className="delete-transaction-mark"
              onClick={() => {
                dispatch(deleteTranscation(transaction._id));
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
