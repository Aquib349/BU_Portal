import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PhoneNumberField = ({
  title,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  const [PhoneValue, setPhoneValue] = useState(null);

  useEffect(() => {
    if (initialValue) {
      setPhoneValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (validate) {
      validate(fieldname, PhoneValue, required);
    }
  }, []);

  const handleChange = (value) => {
    setPhoneValue(value);
    validate(fieldname, value, required);
  };

  return (
    <div className="pb-3">
      <label className="text-sm">
        {title}
        {required === "true" && (
          <span className="text-red-500 font-bold">*</span>
        )}
      </label>
      <PhoneInput
        value={PhoneValue}
        onChange={handleChange}
        style={{
          padding: "0 10px",
          fontSize: "0.9rem",
          border: `1px solid ${
            !PhoneValue && required === "true" ? "red" : "gray"
          }`,
          borderRadius: "5px",
          outline: "none",
        }}
      />
      <small className="text-slate-500">{baseline}</small>
    </div>
  );
};

PhoneNumberField.propTypes = {
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
  initialValue: PropTypes.string,
};

export default PhoneNumberField;
