import "../../styles/menuBtn.scss";
const MenuBtn = ({ link = "Menu btn", Icon }) => {
  return (
    <div className="menu-btn">
      <div className="btn-icon-title">
        {Icon}
        <a>{link}</a>
      </div>
    </div>
  );
};

export default MenuBtn;
