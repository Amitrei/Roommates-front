import "../../styles/sideMenu.scss";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuBtn from "./MenuBtn";
import { useSelector } from "react-redux";
const SideMenu = () => {
  const user = useSelector((state) => state.auth["user"]);
  
  return (
    <div className="side-menu-container">
      <div className="side-menu-header">
        <h1>Roommates</h1>
      </div>
      <div className="user-details">
        <img src={user.profilePicture} />
        <div className="user-details-right-side">
          <h3>{user.email}</h3>
          <h4>16/02/2021</h4>
        </div>
      </div>
      <MenuBtn link="Dashboard" Icon={<HomeIcon fontSize="large" className="btn-icon" />} />
      <MenuBtn link="My Account" Icon={<AccountBoxIcon fontSize="large" className="btn-icon" />} />
      <MenuBtn link="Logout" Icon={<ExitToAppIcon fontSize="large" className="btn-icon" />} />
    </div>
  );
};

export default SideMenu;
