import "./SideBar.css";
import { useContext } from "react";
import Avatar from "../Avatar/Avatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ setActiveModal, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <Avatar size="56px" />
        <p className="sidebar__user-name">{currentUser.name}</p>
      </div>
      <button
        className="page__text-button sidebar__text-button"
        onClick={() => setActiveModal("edit-profile")}
      >
        Change profile data
      </button>
      <button
        className="page__text-button sidebar__text-button"
        onClick={onLogout}
      >
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
