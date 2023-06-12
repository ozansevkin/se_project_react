import "./SideBar.css";
import { useContext } from "react";
import avatarPlaceholder from "../../images/avatarPlaceholder.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ setActiveModal, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="User Avatar"
        />
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
