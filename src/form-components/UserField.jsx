import Select from "react-select";
import PropTypes from "prop-types";

const UserField = ({
  title,
  options,
  multi,
  baseline,
  required,
  UserselectedOption,
  setUserSelectedOption,
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
          defaultValue={UserselectedOption}
          onChange={setUserSelectedOption}
          options={options}
          isMulti={multi}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

UserField.propTypes = {
  multi: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  UserselectedOption: PropTypes.any.isRequired,
  setUserSelectedOption: PropTypes.func.isRequired,
};

export default UserField;
