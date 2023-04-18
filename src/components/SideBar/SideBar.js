import "./SideBar.css";
import avatar from "../../images/avatarWithImage.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="User Avatar" />
        <p className="sidebar__user-name">Ozan Sevkin</p>
      </div>
    </aside>
  );
}

export default SideBar;
