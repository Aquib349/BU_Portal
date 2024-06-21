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
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const { AllUser } = useContext(UserContext);

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
      const concatenatedLabels = userSelectedOption
        ? multi
          ? userSelectedOption.map((option) => option.label).join("; ")
          : userSelectedOption.label
        : "";
      validate(fieldname, concatenatedLabels, required);
    }
  }, [userSelectedOption, multi, fieldname, required]);

  return (
    <div className="pb-3">
      <label className="text-sm">
        {title}
        {required && <span className="font-bold text-red-500">*</span>}
      </label>
      <Select
        value={userSelectedOption}
        onChange={handleChange}
        options={AllUser}
        isMulti={multi}
      />
      <small className="text-slate-500">{baseline}</small>
    </div>
  );
};

UserField.propTypes = {
  title: PropTypes.string,
  multi: PropTypes.bool,
  baseline: PropTypes.string,
  required: PropTypes.any,
  fieldname: PropTypes.string,
  validate: PropTypes.func,
  initialValue: PropTypes.string,
};

export default UserField;
