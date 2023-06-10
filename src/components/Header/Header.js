import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.svg";
import avatarPlaceHolder from "../../images/avatarPlaceholder.svg";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { headerMobileBreakpointWidth as mobileBreakPointWidth } from "../../utils/constants";

const currentDate = new Date().toLocaleDateString("default", {
  month: "long",
  day: "numeric",
});

function Header({
  city,
  setActiveModal,
  isMobileMenuOpened,
  toggleMobileMenu,
}) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const handleResizeWindow = () => {
      if (window.innerWidth >= mobileBreakPointWidth && isMobileMenuOpened) {
        toggleMobileMenu();
      }
    };
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [isMobileMenuOpened, toggleMobileMenu]);

  function setClassForMobileMenu(className) {
    return `${className} ${isMobileMenuOpened && `${className}--menu-opened`}`;
  }
  return (
    <header className="header">
      {!isMobileMenuOpened && (
        <div className="header__wrapper-left">
          <Link to="/">
            <img className="header__logo" src={logo} alt="logo" />
          </Link>
          <p className="header__info">
            {currentDate}, {city}
          </p>
        </div>
      )}

      <div className={setClassForMobileMenu("header__menu-modal")}>
        <div className={setClassForMobileMenu("header__wrapper-right")}>
          <ToggleSwitch />
          <button
            className="page__text-button header__text-button"
            onClick={() => setActiveModal("add-cloth")}
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__profile">
            <p className="header__user-name">{currentUser.name}</p>
            <div className="header__avatar">
              <img
                className="header__avatar-image"
                src={
                  currentUser.avatar ? currentUser.avatar : avatarPlaceHolder
                }
                alt="User Avatar"
              />
              {!currentUser.avatar && (
                <p className="header__avatar-letter">{currentUser.name[0]}</p>
              )}
            </div>
          </Link>
        </div>
        <button
          className={setClassForMobileMenu("header__menu-button menu-button")}
          type="button"
          onClick={toggleMobileMenu}
        >
          <span className={setClassForMobileMenu("menu-button__bar")}></span>
          <span className={setClassForMobileMenu("menu-button__bar")}></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
