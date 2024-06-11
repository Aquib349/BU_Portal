import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SingleLineTextField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
  initialValue, // Add initialValue prop
}) => {
  const [SingleLineTextValue, setSingleLineTextValue] = useState(
    initialValue || ""
  ); // Set initial value

  useEffect(() => {
    if (validate) {
      validate(fieldname, SingleLineTextValue, required);
    }
  }, []);

  return (
    <div className="flex flex-col pb-3">
      <label className="text-sm">
        {title}
        {required === "true" && (
          <span className="text-red-500 font-bold">*</span>
        )}
      </label>

      <input
        type="text"
        name={name}
        value={SingleLineTextValue}
        className="p-2 text-sm rounded-md border w-full border-slate-400 outline-blue-400"
        onChange={(e) => {
          setSingleLineTextValue(e.target.value);
          validate(fieldname, e.target.value, required);
        }}
      />
      <small className="text-slate-500">{baseline}</small>
    </div>
  );
};

SingleLineTextField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
  initialValue: PropTypes.string
};

export default SingleLineTextField;
