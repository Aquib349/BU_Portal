import Select from "react-select";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserField = ({
  title,
  multi,
  baseline,
  required,
  UserselectedOption,
  setUserSelectedOption,
}) => {
  const { AllUser } = useContext(UserContext);
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
          options={AllUser}
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
