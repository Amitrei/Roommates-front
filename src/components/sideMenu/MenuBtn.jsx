import "../../styles/menuBtn.scss";
import { NavLink } from "react-router-dom";
const MenuBtn = ({ link = "Menu btn", Icon, linkHref }) => {
  return (
    <div className="side-menu-btn-container">
      <NavLink to={linkHref}>
        <div className="side-menu-btn">
          <div className="btn-icon-title">
            {Icon}
            <span className="menu-btn-link">{link}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default MenuBtn;
