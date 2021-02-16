import FirstLogin from "./firstTime/FirstLogin";
import SideMenu from "./sideMenu/SideMenu";
import "../styles/mainApp.scss";
const MainApp = ({ user }) => {
  return (
    <div className="main-app">
      <SideMenu />
      <div className="app-content">
        <FirstLogin />
      </div>
    </div>
  );
};

export default MainApp;
