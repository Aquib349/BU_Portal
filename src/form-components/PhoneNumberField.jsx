import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import PropTypes from "prop-types";

const PhoneNumberField = ({ title }) => {
  const [value, setValue] = useState();

  return (
    <>
      <div>
        <label className="text-sm">{title}</label>
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          style={{
            padding: "0 10px",
            fontSize: "0.9rem",
            border: "1px solid gray",
            borderRadius: "5px",
            outline: "none",
          }}
        />
      </div>
    </>
  );
};

PhoneNumberField.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PhoneNumberField;