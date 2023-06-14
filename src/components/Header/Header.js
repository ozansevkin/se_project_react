import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Avatar from "../Avatar/Avatar";
import logo from "../../images/logo.svg";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { MOBILE_BREAKPOINT_WIDTH } from "../../utils/constants";

const currentDate = new Date().toLocaleDateString("default", {
  month: "long",
  day: "numeric",
});

function Header({
  city,
  setActiveModal,
  isMobileMenuOpened,
  toggleMobileMenu,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const handleResizeWindow = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT_WIDTH && isMobileMenuOpened) {
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
          <Link to="/" className="header__logo-link">
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
          {isLoggedIn ? (
            <>
              <button
                className="page__text-button header__text-button"
                onClick={() => setActiveModal("add-cloth")}
              >
                + Add Clothes
              </button>
              <Link to="/profile" className="header__profile-link">
                <p className="header__user-name">{currentUser.name}</p>
                <Avatar className="header__avatar" size="40px" />
              </Link>
            </>
          ) : (
            <>
              <button
                className="page__text-button header__text-button"
                onClick={() => setActiveModal("register")}
              >
                Sign Up
              </button>
              <button
                className="page__text-button header__text-button"
                onClick={() => setActiveModal("login")}
              >
                Log In
              </button>
            </>
          )}
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
