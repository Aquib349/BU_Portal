import Select from "react-select";
import PropTypes from "prop-types";

const LookupField = ({
  options,
  title,
  baseline,
  required,
  LookupValue,
  setLookupValue,
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
          defaultValue={LookupValue}
          onChange={setLookupValue}
          options={options}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

LookupField.propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  LookupValue: PropTypes.string.isRequired,
  setLookupValue: PropTypes.func.isRequired,
};

export default LookupField;
