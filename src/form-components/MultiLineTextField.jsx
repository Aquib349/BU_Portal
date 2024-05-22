import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const MultiLineTextField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [MultiLineValue, setMultiLineValue] = useState("");
  useEffect(() => {
    if (validate) {
      validate(fieldname, MultiLineValue, required);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <textarea
          name={name}
          value={MultiLineValue}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
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
