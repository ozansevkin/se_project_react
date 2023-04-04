import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatarWithImage.svg";
import { useEffect } from "react";

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
      if (window.innerWidth >= 750 && isMobileMenuOpened) {
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
            ? "header__menu-modal header__menu-modal_menu-opened"
            : "header__menu-modal"
        }
      >
        <div
          className={
            isMobileMenuOpened
              ? "header__wrapper-right header__wrapper-right_menu-opened"
              : "header__wrapper-right"
          }
        >
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
              ? "header__menu-button menu-button menu-button_menu-opened"
              : "header__menu-button menu-button"
          }
          type="button"
          onClick={toggleMobileMenu}
        >
          <span
            className={
              isMobileMenuOpened
                ? "menu-button__bar menu-button__bar_menu-opened"
                : "menu-button__bar"
            }
          ></span>
          <span
            className={
              isMobileMenuOpened
                ? "menu-button__bar menu-button__bar_menu-opened"
                : "menu-button__bar"
            }
          ></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
