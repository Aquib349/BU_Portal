import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiChoiceDropdown = ({ multi, options, title }) => {
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

MultiChoiceDropdown.propTypes = {
  multi: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title : PropTypes.string.isRequired
};

export default MultiChoiceDropdown;
