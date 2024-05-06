import Select from "react-select";
import PropTypes from "prop-types";

const MultiChoiceDropdown = ({
  multi,
  options,
  title,
  baseline,
  required,
  MultiSelectValue,
  setMultiSelectValue,
}) => {
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
          onChange={setMultiSelectValue}
          options={options}
          isMulti={multi}
          className="css-control"
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

MultiChoiceDropdown.propTypes = {
  multi: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  MultiSelectValue: PropTypes.any.isRequired,
  setMultiSelectValue: PropTypes.func.isRequired,
};

export default MultiChoiceDropdown;
