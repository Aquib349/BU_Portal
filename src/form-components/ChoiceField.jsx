import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const ChoiceField = ({ options, title, baseline, required }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div className="pb-3">
        <label className="text-sm">
          {title}
          <span
            className={`text-red-500 font-bold ${
              required ? "static" : "hidden"
            }`}
          >
            *
          </span>
        </label>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
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
  required: PropTypes.bool.isRequired,
};

export default ChoiceField;
