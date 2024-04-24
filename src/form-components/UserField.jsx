import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const UserField = ({ title, options, multi }) => {
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
          placeholder="multi select user"
        />
      </div>
    </>
  );
};

UserField.propTypes = {
  multi: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserField;
