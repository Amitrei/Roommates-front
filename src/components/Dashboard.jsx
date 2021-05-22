import { fetchRoomDetails } from "../store/reducers/roomReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/dashboard.scss";
import Transactions from "./transactions/Transactions";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import transition from "../utils/transitionFramer";
import { useHistory } from "react-router-dom";
import FilterByDate from "./filterByDate/FilterByDate";
const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.entities.room.room);
  const user = useSelector((state) => state.auth["user"]);
  const currentDate = moment().format("dddd  DD/MM/YYYY");

  useEffect(() => {
    if (!user?.roomId) {
      history.push("/");
    } else {
      dispatch(fetchRoomDetails());
    }
  }, []);

  // Checking if user have a room

  return (
    <motion.div exit={{ opacity: 0 }} className="dashboard-container">
      <FilterByDate />
      <motion.h1
        initial={{ opacity: 0 }}
        transition={{ ...transition }}
        animate={{ opacity: 1, x: 20, transition: { ...transition } }}
        className="dashboard-title">
        Dashboard<span className="dashboard-title-date">{currentDate}</span>
      </motion.h1>
      {user?.roomId && <Transactions />}
    </motion.div>
  );
};

export default Dashboard;
