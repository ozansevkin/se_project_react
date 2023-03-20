import "./Header.css";
import logo from "../../logo.svg";
import avatar from "../../avatarWithImage.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const location = "New York";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__info">
        {currentDate}, {location}
      </p>
      <a className="header__link">+ Add Clothes</a>
      <p className="header__user-name">Ozan Sevkin</p>
      <img className="header__avatar" src={avatar} alt="User Avatar" />
    </header>
  );
}

export default Header;
