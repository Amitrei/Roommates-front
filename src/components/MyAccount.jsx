import { motion } from "framer-motion";
import transition from "../utils/transitionFramer";
import "../styles/myAccount.scss";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetails, leaveRoom } from "../store/reducers/roomReducer";
import TransactionsLog from "./transactions/TransactionsLog";

const MyAccount = () => {
  const history = useHistory();
  const user = useSelector((state) => state.auth["user"]);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.entities.room.room);

  useEffect(() => {
    if (!user?.roomId) {
      history.push("/");
    } else {
      dispatch(fetchRoomDetails());
    }
  }, []);

  const handleLeaveClicked = () => {
    dispatch(leaveRoom(user.email));
  };
  return (
    <motion.div
      className="my-account-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.h1
        initial={{ opacity: 0 }}
        transition={{ ...transition }}
        animate={{ opacity: 1, x: 20, transition: { ...transition } }}
        className="dashboard-title">
        My Account
      </motion.h1>{" "}
      <div className="my-account-rooms">
        <h3>My rooms</h3>

        <div className="my-account-room-actions">
          <span className="room-actions-room-name">{room?.name}</span>
          <Button
            variant="contained"
            color="secondary"
            className="leave-room-btn"
            onClick={handleLeaveClicked}>
            Leave room
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyAccount;
