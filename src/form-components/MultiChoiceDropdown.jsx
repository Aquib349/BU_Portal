import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const MultiChoiceDropdown = ({
  multi,
  options,
  title,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [MultiSelectValue, setMultiSelectValue] = useState(null);

  useEffect(() => {
    if (validate) {
      validate(fieldname, MultiSelectValue, required);
    }
  }, []);

  const handleChange = (selectedOption) => {
    setMultiSelectValue(selectedOption);
    validate(fieldname, selectedOption, required);
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
          defaultValue={MultiSelectValue}
          onChange={handleChange}
          options={options}
          isMulti={multi}
          value={MultiSelectValue}
          className="css-control text-black bg-white"
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

MultiChoiceDropdown.propTypes = {
  multi: PropTypes.bool,
  options: PropTypes.array,
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  MultiSelectValue: PropTypes.any,
  setMultiSelectValue: PropTypes.func,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default MultiChoiceDropdown;
