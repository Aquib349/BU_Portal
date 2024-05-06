import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import PropTypes from "prop-types";

const PhoneNumberField = ({
  title,
  baseline,
  required,
  PhoneValue,
  setPhoneValue,
}) => {
  return (
    <>
      <div className="pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <PhoneInput
          value={PhoneValue}
          onChange={setPhoneValue}
          style={{
            padding: "0 10px",
            fontSize: "0.9rem",
            border: "1px solid gray",
            borderRadius: "5px",
            outline: "none",
          }}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

PhoneNumberField.propTypes = {
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  PhoneValue: PropTypes.number.isRequired,
  setPhoneValue: PropTypes.func.isRequired,
};

export default PhoneNumberField;
