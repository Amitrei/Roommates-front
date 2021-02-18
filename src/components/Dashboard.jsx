import { fetchRoomDetails } from "../store/reducers/roomReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HouseIcon from "@material-ui/icons/House";
import "../styles/dashboard.scss";
import Transactions from "./transactions/Transactions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.entities.room.room);

  useEffect(() => {
    dispatch(fetchRoomDetails());
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-room-name">
        <HouseIcon className="dashboard-house-icon" />
        <h1>{room && room.name}</h1>
      </div>
      <Transactions />
    </div>
  );
};

export default Dashboard;
