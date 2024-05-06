import Select from "react-select";
import PropTypes from "prop-types";

const ChoiceField = ({
  options,
  title,
  baseline,
  required,
  ChoiceOption,
  setChoiceOption,
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
          defaultValue={ChoiceOption}
          onChange={setChoiceOption}
          options={options}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

ChoiceField.propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  ChoiceOption: PropTypes.string.isRequired,
  setChoiceOption: PropTypes.func.isRequired,
};

export default ChoiceField;
