import PropTypes from "prop-types";

const RadioField = ({
  title,
  required,
  RadioOptionValue,
  setRadioOptionValue,
}) => {
  return (
    <>
      <label className="text-sm px-1">
        {title}
        {required === "true" && (
          <span className={`text-red-500 font-bold`}>*</span>
        )}
      </label>
      <div className="py-2 text-sm flex justify-between items-center">
        <div className="flex px-2 items-center gap-8">
          <label className="flex gap-1 items-center">
            <input
              type="radio"
              value="Yes"
              checked={RadioOptionValue === "Yes"}
              onChange={(e) => setRadioOptionValue(e.target.value)}
            />
            Yes
          </label>
          <label className="flex gap-1 items-center">
            <input
              type="radio"
              value="No"
              checked={RadioOptionValue === "No"}
              onChange={(e) => setRadioOptionValue(e.target.value)}
            />
            No
          </label>
        </div>
      </div>

      <div
        className={`comment-box ${
          //  RadioOptionValue.toLowerCase() === "yes" ? "static" : "hidden"
          RadioOptionValue === "Yes" ? "static" : "hidden"
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
  required: PropTypes.string.isRequired,
  RadioOptionValue: PropTypes.string.isRequired,
  setRadioOptionValue: PropTypes.func.isRequired,
};

export default RadioField;
