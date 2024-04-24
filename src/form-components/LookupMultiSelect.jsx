import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const LookupMultiSelect = ({ multi, options, title }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div>
        <label className="test-sm">{title}</label>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isMulti={multi}
        />
      </div>
    </>
  );
};

LookupMultiSelect.propTypes = {
  multi: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default LookupMultiSelect;
