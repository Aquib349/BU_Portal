import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ChoiceField = ({
  options,
  title,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [ChoiceOption, setChoiceOption] = useState(null);
  useEffect(() => {
    if (validate) {
      validate(fieldname, ChoiceOption, required);
    }
  }, []);

  const handleChange = (selectedOption) => {
    setChoiceOption(selectedOption);
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
          className={`p-2 text-sm rounded-md border w-full border-slate-400 outline-blue-400`}
          defaultValue={ChoiceOption}
          onChange={handleChange}
          options={options}
          value={ChoiceOption}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

ChoiceField.propTypes = {
  options: PropTypes.array,
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  validate: PropTypes.func,
  fieldname: PropTypes.string,
};

export default ChoiceField;
