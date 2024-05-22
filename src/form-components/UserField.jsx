import Select from "react-select";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const UserField = ({
  title,
  multi,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [UserselectedOption, setUserSelectedOption] = useState(null);
  const { AllUser } = useContext(UserContext);

  useEffect(() => {
    if (validate) {
      validate(fieldname, UserselectedOption, required);
    }
  }, []);

  const handleChange = (selectedOption) => {
    setUserSelectedOption(selectedOption);
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
          defaultValue={UserselectedOption}
          onChange={handleChange}
          options={AllUser}
          isMulti={multi}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

UserField.propTypes = {
  multi: PropTypes.bool,
  options: PropTypes.array,
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default UserField;
