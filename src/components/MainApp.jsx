import FirstLogin from "./firstTime/FirstLogin";
import SideMenu from "./sideMenu/SideMenu";
import "react-toastify/dist/ReactToastify.css";
import "../styles/mainApp.scss";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
const MainApp = ({ user }) => {
  useEffect(() => {});
  return (
    <div className="main-app">
      <SideMenu />
      <div className="app-content">{!user.roomId ? <FirstLogin /> : <Dashboard />}</div>
    </div>
  );
};

export default MainApp;
