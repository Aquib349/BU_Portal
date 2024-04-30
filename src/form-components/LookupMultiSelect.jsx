import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const LookupMultiSelect = ({ multi, options, title, baseline, required }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div className="pb-3">
        <label className="text-sm">
          {title}
          {required && <span className={`text-red-500 font-bold`}>*</span>}
        </label>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
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
  required: PropTypes.bool.isRequired,
};

export default LookupMultiSelect;
