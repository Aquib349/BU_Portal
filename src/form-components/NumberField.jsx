import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const NumberField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  const [NumberFieldValue, setNumberFieldValue] = useState(0);

  useEffect(() => {
    if (initialValue) {
      setNumberFieldValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (validate) {
      validate(fieldname, NumberFieldValue, required);
    }
  }, [validate, fieldname, required]);
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`font-bold text-red-500`}>*</span>
          )}
        </label>
        <input
          type="number"
          name={name}
          value={NumberFieldValue}
          className="w-full rounded-md border border-slate-400 p-2 text-sm outline-blue-500"
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
