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
  initialValue,
}) => {
  const [UserselectedOption, setUserSelectedOption] = useState(null);
  const { AllUser } = useContext(UserContext);

  useEffect(() => {
    if (initialValue && AllUser) {
      if (multi) {
        const initialOptions = initialValue.split(";").map((label) => ({
          label,
          value: label,
        }));
        setUserSelectedOption(initialOptions);
      } else {
        setUserSelectedOption({ label: initialValue, value: initialValue });
      }
    }
  }, [initialValue, multi, AllUser]);

  useEffect(() => {
    if (validate) {
      validate(fieldname, UserselectedOption, required);
    }
  }, []);

  const handleChange = (selectedOption) => {
    let concatenatedLabels = "";
    if (multi) {
      concatenatedLabels = selectedOption
        ? selectedOption.map((option) => option.label).join("; ")
        : "";
      setUserSelectedOption(selectedOption);
    } else {
      concatenatedLabels = selectedOption ? selectedOption.label : "";
      setUserSelectedOption(selectedOption);
    }

    validate(fieldname, concatenatedLabels, required);
  };

  return (
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
        value={UserselectedOption}
      />
      <small className="text-slate-500">{baseline}</small>
    </div>
  );
};

UserField.propTypes = {
  multi: PropTypes.bool,
  options: PropTypes.array,
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string,
  validate: PropTypes.func,
  initialValue: PropTypes.string,
};

export default UserField;
