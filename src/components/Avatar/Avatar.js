import "./Avatar.css";
import { useContext, useState } from "react";
import avatarPlaceHolder from "../../images/avatarPlaceholder.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Avatar({ className, size = "40px" }) {
  const currentUser = useContext(CurrentUserContext);
  const [error, setError] = useState(false);

  // Calculate fontSize based on size prop
  const fontSize = parseInt(size) / 2 + "px";

  return (
    <div className={`avatar ${className}`}>
      <img
        className="avatar__image"
        style={{ height: size, width: size }}
        src={error ? avatarPlaceHolder : currentUser.avatar}
        alt="User Avatar"
        onError={() => setError(true)}
      />
      {error && (
        <p
          className="avatar__letter"
          style={{ height: size, width: size, fontSize: fontSize }}
        >
          {currentUser.name.charAt(0)}
        </p>
      )}
    </div>
  );
}

export default Avatar;
