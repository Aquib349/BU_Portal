import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiChoiceDropdown = ({ multi, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div>
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
};

export default MultiChoiceDropdown;
