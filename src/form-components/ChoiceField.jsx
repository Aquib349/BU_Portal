import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const ChoiceField = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div>
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
};

export default ChoiceField;
