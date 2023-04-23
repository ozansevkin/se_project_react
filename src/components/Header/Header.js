import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatarWithImage.svg";
import { useEffect } from "react";
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
  });

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
            className="header__text-button"
            onClick={() => setActiveModal("add-cloth")}
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__profile">
            <p className="header__user-name">Ozan Sevkin</p>
            <img className="header__avatar" src={avatar} alt="User Avatar" />
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
