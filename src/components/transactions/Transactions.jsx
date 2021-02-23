import TransactionsLog from "./TransactionsLog";
import TotalExpenses from "./TotalExpenses";
import BarChart from "./charts/BarChart";
import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from "./CreateTransaction";
import HouseIcon from "@material-ui/icons/House";
import addMember from "../../assets/addMember.svg";
import removeMember from "../../assets/removeMember.svg";
import addTransaction from "../../assets/addTransaction.svg";
import deleteTransaction from "../../assets/deleteTransaction.svg";
import {
  renderCreateTransaction,
  renderDeleteTransaction,
} from "../../store/reducers/transactionsReducer";
import "../../styles/transactions.scss";
import DashboardMenuBtn from "./../DashboardMenuBtn";
import DeleteTransaction from "./DeleteTransaction";
import InviteMember from "./../createRoom/InviteMember";
import { openInviteMemberWindow } from "./../../store/reducers/roomReducer";

const Transactions = () => {
  const room = useSelector((state) => state.entities.room.room);
  const dispatch = useDispatch();
  const isCreateTransaction = useSelector(
    (state) => state.entities.transactions.createTransaction.render
  );
  const isDeleteTransaction = useSelector(
    (state) => state.entities.transactions.deleteTransaction.render
  );

  const isInviteMember = useSelector((state) => state.entities.room.inviteMemberWindow);

  const handleCreateTransactionClick = () => {
    dispatch(renderCreateTransaction());
  };

  const handleDeleteTransactionClick = () => {
    dispatch(renderDeleteTransaction());
  };

  const handleInviteMemberClick = () => {
    dispatch(openInviteMemberWindow());
  };

  return (
    <>
      {isCreateTransaction && <CreateTransaction />}
      {isDeleteTransaction && <DeleteTransaction />}
      {isInviteMember && <InviteMember dashboardPopup />}
      <div>{/* <button onClick={handleCreateTransactionClick}>create transaction</button> */}</div>

      <div className="main-transactions-container">
        <div className="dashboard-top-menu">
          <div className="room-name-container">
            <HouseIcon className="dashboard-house-icon" />
            <h1>{room && room.name}</h1>
          </div>
          <div className="dashboard-menu-btns-container">
            <DashboardMenuBtn
              icon={addMember}
              content="Add Member"
              onClick={handleInviteMemberClick}
            />
            <DashboardMenuBtn icon={removeMember} content="Remove Member" />
            <DashboardMenuBtn
              icon={addTransaction}
              content="Add Transaction"
              onClick={handleCreateTransactionClick}
            />
            <DashboardMenuBtn
              icon={deleteTransaction}
              content="Delete Transaction"
              onClick={handleDeleteTransactionClick}
            />
          </div>
        </div>

        <div className="transaction-log-grid">
          <TransactionsLog />
        </div>
        <div className="transaction-total-exp-grid">
          <TotalExpenses />
        </div>
        <div className="transaction-by-users-grid">
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default Transactions;
