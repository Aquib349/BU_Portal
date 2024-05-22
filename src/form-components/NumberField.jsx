import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const NumberField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [NumberFieldValue, setNumberFieldValue] = useState(0);
  useEffect(() => {
    if (validate) {
      validate(fieldname, NumberFieldValue, required);
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
        <input
          type="number"
          name={name}
          value={NumberFieldValue}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          onChange={(e) => {
            setNumberFieldValue(e.target.value);
            validate(fieldname, e.target.value, required);
          }}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

NumberField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default NumberField;
