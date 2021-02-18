import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomTransactions } from "../../store/reducers/roomReducer";
import "../../styles/transactionsLog.scss";
import Seperator from "./../Seperator";
const TransactionsLog = () => {
  const dispatch = useDispatch();
  const roomTransactions = useSelector((state) => state.entities.room.roomTransactions);
  useEffect(() => {
    dispatch(getRoomTransactions());
  }, []);

  return (
    <div className="transactions-log-container">
      {roomTransactions &&
        roomTransactions.map((transaction) => (
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
  );
};

export default TransactionsLog;
