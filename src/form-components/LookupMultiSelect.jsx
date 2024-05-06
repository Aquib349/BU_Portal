import Select from "react-select";
import PropTypes from "prop-types";

const LookupMultiSelect = ({
  multi,
  options,
  title,
  baseline,
  required,
  LookupMultiValue,
  setLookupMultiValue,
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
          defaultValue={LookupMultiValue}
          onChange={setLookupMultiValue}
          options={options}
          isMulti={multi}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

LookupMultiSelect.propTypes = {
  multi: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  LookupMultiValue: PropTypes.any.isRequired,
  setLookupMultiValue: PropTypes.func.isRequired,
};

export default LookupMultiSelect;
