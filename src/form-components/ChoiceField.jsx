import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const ChoiceField = ({ options, title }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div>
        <label className="test-sm">{title}</label>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    </>
  );
};

ChoiceField.propTypes = {
  options: PropTypes.array.isRequired,
  title : PropTypes.string.isRequired
};

export default ChoiceField;
