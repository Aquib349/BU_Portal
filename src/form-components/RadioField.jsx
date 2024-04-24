import { useState } from "react";
import PropTypes from "prop-types";

const RadioField = ({ title }) => {
  // State to track the selected radio button value
  const [selectedOption, setSelectedOption] = useState("");

  // Handler function to update the selected radio button value
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <label className="text-sm px-1">{title}</label>
      <div className="py-2 text-sm flex justify-between items-center">
        <div className="flex px-2 items-center gap-8">
          <label className="flex gap-1 items-center">
            <input
              type="radio"
              value="Yes"
              checked={selectedOption === "Yes"}
              onChange={handleOptionChange}
            />
            Yes
          </label>
          <label className="flex gap-1 items-center">
            <input
              type="radio"
              value="No"
              checked={selectedOption === "No"}
              onChange={handleOptionChange}
            />
            No
          </label>
        </div>
      </div>

      <div
        className={`comment-box ${
          selectedOption.toLowerCase() === "yes" ? "static" : "hidden"
        }`}
      >
        <textarea
          name="comment"
          id="comment"
          className="border border-slate-300 w-full rounded-md text-sm p-2"
          placeholder="Add your comment.."
        />
      </div>
    </>
  );
};

RadioField.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RadioField;