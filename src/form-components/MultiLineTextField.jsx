import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const MultiLineTextField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  const [MultiLineValue, setMultiLineValue] = useState(initialValue || "");
  useEffect(() => {
    if (validate) {
      validate(fieldname, MultiLineValue, required);
    }
  }, [fieldname, validate, required]);
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`font-bold text-red-500`}>*</span>
          )}
        </label>
        <textarea
          name={name}
          value={MultiLineValue}
          className="w-full rounded-md border border-slate-400 p-2 text-sm outline-blue-500"
          onChange={(e) => {
            setMultiLineValue(e.target.value);
            validate(fieldname, e.target.value, required);
          }}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

MultiLineTextField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  MultiLineValue: PropTypes.string,
  setMultiLineValue: PropTypes.func,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default MultiLineTextField;
