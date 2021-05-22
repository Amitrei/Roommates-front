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
        </div>
      </div>
      <MenuBtn
        link="Dashboard"
        linkHref="/dashboard"
        Icon={<HomeIcon fontSize="large" className="btn-icon" />}
      />
      <MenuBtn
        link="My Account"
        linkHref="/my-account"
        Icon={<AccountBoxIcon fontSize="large" className="btn-icon" />}
      />
      <MenuBtn
        logoutBtn
        link="Logout"
        linkHref="/logout"
        Icon={<ExitToAppIcon fontSize="large" className="btn-icon" />}
      />
    </div>
  );
};

export default SideMenu;
