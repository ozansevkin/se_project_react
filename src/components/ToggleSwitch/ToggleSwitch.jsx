import "./ToggleSwitch.css";
import { useContext, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [checked, setChecked] = useState(
    currentTemperatureUnit === "F" ? false : true
  );

  function handleChange() {
    setChecked(!checked);
    handleToggleSwitchChange();
  }

  return (
    <>
      <input
        id="switch-toggle"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="switch__checkbox"
      />
      <label htmlFor="switch-toggle" className="switch__label">
        <span
          className={
            checked
              ? `switch__unit switch__unit--inactive`
              : `switch__unit switch__unit--active`
          }
        >
          F
        </span>
        <span className="switch__button"></span>
        <span
          className={
            checked
              ? `switch__unit switch__unit--active`
              : `switch__unit switch__unit--inactive`
          }
        >
          C
        </span>
      </label>
    </>
  );
}

export default ToggleSwitch;
