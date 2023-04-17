import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatarWithImage.svg";
import { useEffect } from "react";
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

  return (
    <header className="header">
      {!isMobileMenuOpened && (
        <div className="header__wrapper-left">
          <img className="header__logo" src={logo} alt="logo" />
          <p className="header__info">
            {currentDate}, {city}
          </p>
        </div>
      )}

      <div
        className={
          isMobileMenuOpened
            ? "header__menu-modal header__menu-modal--menu-opened"
            : "header__menu-modal"
        }
      >
        <div
          className={
            isMobileMenuOpened
              ? "header__wrapper-right header__wrapper-right--menu-opened"
              : "header__wrapper-right"
          }
        >
          <ToggleSwitch />
          <button
            className="header__text-button"
            onClick={() => setActiveModal("add-clothes")}
          >
            + Add Clothes
          </button>
          <p className="header__user-name">Ozan Sevkin</p>
          <img className="header__avatar" src={avatar} alt="User Avatar" />
        </div>
        <button
          className={
            isMobileMenuOpened
              ? "header__menu-button menu-button menu-button--menu-opened"
              : "header__menu-button menu-button"
          }
          type="button"
          onClick={toggleMobileMenu}
        >
          <span
            className={
              isMobileMenuOpened
                ? "menu-button__bar menu-button__bar--menu-opened"
                : "menu-button__bar"
            }
          ></span>
          <span
            className={
              isMobileMenuOpened
                ? "menu-button__bar menu-button__bar--menu-opened"
                : "menu-button__bar"
            }
          ></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
