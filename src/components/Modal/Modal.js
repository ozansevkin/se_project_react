import "./Modal.css";
import { useEffect } from "react";
import closeButtonIcon from "../../images/closeButtonIcon.svg";

const Modal = ({ name, onClose, children }) => {
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [onClose]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClose}>
      <div className={`modal__container modal__container--type_${name}`}>
        {children}

        <button className="modal__close-button" type="button" onClick={onClose}>
          <img src={closeButtonIcon} alt="X shaped close button icon" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
