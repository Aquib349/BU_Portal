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
}) => {
  const [LookupMultiValue, setLookupMultiValue] = useState(null);
  useEffect(() => {
    if (validate) {
      validate(fieldname, LookupMultiValue, required);
    }
  }, []);

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
            <span className={`text-red-500 font-bold`}>*</span>
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
