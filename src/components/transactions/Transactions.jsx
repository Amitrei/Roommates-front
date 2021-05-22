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
import { openInviteMemberWindow, openMemberListWindow } from "./../../store/reducers/roomReducer";
import MembersList from "./../MembersList";
import { motion } from "framer-motion";
import transition from "../../utils/transitionFramer";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ...transition,
    },
  },
};

// Framer motions animations

const dasboardMenuContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ...transition,
    },
  },
};

const item = (x = 0, y = 0) => ({
  hidden: { opacity: 0, x, y },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8 } },
});

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

  const isRemoveMember = useSelector((state) => state.entities.room.memberListWindow);

  const handleCreateTransactionClick = () => {
    dispatch(renderCreateTransaction());
  };

  const handleDeleteTransactionClick = () => {
    dispatch(renderDeleteTransaction());
  };

  const handleInviteMemberClick = () => {
    dispatch(openInviteMemberWindow());
  };

  const handleRemoveMemberClick = () => {
    dispatch(openMemberListWindow());
  };

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {isCreateTransaction && <CreateTransaction />}
      {isDeleteTransaction && <DeleteTransaction />}
      {isInviteMember && <InviteMember dashboardPopup />}
      {isRemoveMember && <MembersList editMode />}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="main-transactions-container">
        <motion.div variants={item(0, -10)} className="dashboard-top-menu">
          <div className="room-name-container">
            <HouseIcon className="dashboard-house-icon" />
            <h1>{room && room.name}</h1>
          </div>
          <motion.div
            variants={dasboardMenuContainer}
            initial="hidden"
            animate="show"
            className="dashboard-menu-btns-container">
            <motion.div variants={item(-15, 0)}>
              <DashboardMenuBtn
                icon={addMember}
                content="Add member"
                onClick={handleInviteMemberClick}
              />
            </motion.div>

            <motion.div variants={item(-15, 0)}>
              <DashboardMenuBtn
                icon={removeMember}
                content="Remove member"
                onClick={handleRemoveMemberClick}
              />
            </motion.div>

            <motion.div variants={item(-15, 0)}>
              <DashboardMenuBtn
                icon={addTransaction}
                content="Add transaction"
                onClick={handleCreateTransactionClick}
              />
            </motion.div>
            <motion.div variants={item(-15, 0)}>
              <DashboardMenuBtn
                icon={deleteTransaction}
                content="Delete transaction"
                onClick={handleDeleteTransactionClick}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={item(15)} className="transaction-log-grid">
          <TransactionsLog />
        </motion.div>
        <motion.div variants={item(-15)} className="transaction-total-exp-grid">
          <TotalExpenses />
        </motion.div>
        <motion.div variants={item(-15)} className="transaction-by-users-grid">
          <BarChart />
        </motion.div>
        <motion.div variants={item(0, 15)} className="members-list-grid">
          <MembersList />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Transactions;
