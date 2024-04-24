import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const LookupField = ({ options, title }) => {
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

LookupField.propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default LookupField;
