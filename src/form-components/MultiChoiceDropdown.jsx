import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const MultiChoiceDropdown = ({
  multi,
  title,
  options,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  const [MultiSelectValue, setMultiSelectValue] = useState(null);

  useEffect(() => {
    if (initialValue && options) {
      if (multi) {
        const initialOptions = initialValue.split(";").map((label) => ({
          label,
          value: label,
        }));
        setMultiSelectValue(initialOptions);
      } else {
        setMultiSelectValue({ label: initialValue, value: initialValue });
      }
    }
  }, [initialValue, multi, options]);

  useEffect(() => {
    if (validate) {
      validate(fieldname, MultiSelectValue, required);
    }
  }, [validate, fieldname, required]);

  const handleChange = (selectedOption) => {
    // setUserSelectedOption(selectedOption);
    let concatenatedLabels = "";
    if (multi) {
      concatenatedLabels = selectedOption
        ? selectedOption.map((option) => option.label).join(";")
        : "";
      setMultiSelectValue(
        selectedOption
          ? selectedOption.map((option) => option.label).join(";")
          : "",
      );
    } else {
      concatenatedLabels = selectedOption ? selectedOption.label : "";
      setMultiSelectValue(selectedOption ? selectedOption.label : "");
    }

    validate(fieldname, concatenatedLabels, required);
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
          defaultValue={MultiSelectValue}
          onChange={handleChange}
          options={options}
          isMulti={multi}
          className="css-control bg-white text-black"
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
  fieldname: PropTypes.string,
  validate: PropTypes.func,
};

export default MultiChoiceDropdown;
