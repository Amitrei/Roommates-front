import { fetchRoomDetails } from "../store/reducers/roomReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/dashboard.scss";
import Transactions from "./transactions/Transactions";
import moment from "moment";
const Dashboard = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.entities.room.room);
  const currentDate = moment().format("dddd  DD/MM/YYYY");
  useEffect(() => {
    dispatch(fetchRoomDetails());
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Dashboard<span className="dashboard-title-date">{currentDate}</span>
      </h1>

      <Transactions />
    </div>
  );
};

export default Dashboard;
