import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const LookupMultiSelect = ({
  multi,
  options,
  title,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  const [LookupMultiValue, setLookupMultiValue] = useState(null);

  useEffect(() => {
    if (initialValue && options) {
      if (multi) {
        const initialOptions = initialValue.split(";").map((label) => ({
          label,
          value: label,
        }));
        setLookupMultiValue(initialOptions);
      } else {
        setLookupMultiValue({ label: initialValue, value: initialValue });
      }
    }
  }, [initialValue, multi, options]);

  useEffect(() => {
    if (validate) {
      validate(fieldname, LookupMultiValue, required);
    }
  }, [validate, fieldname, required]);

  const handleChange = (selectedOption) => {
    setLookupMultiValue(selectedOption);
    validate(fieldname, selectedOption.label, required);
  };
  return (
    <>
      <div className="pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`font-bold text-red-500`}>*</span>
          )}
        </label>
        <Select
          defaultValue={LookupMultiValue}
          onChange={handleChange}
          options={options}
          isMulti={multi}
          value={LookupMultiValue}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

LookupMultiSelect.propTypes = {
  multi: PropTypes.bool,
  options: PropTypes.array,
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  LookupMultiValue: PropTypes.any,
  setLookupMultiValue: PropTypes.func,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default LookupMultiSelect;
