import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const RadioField = ({
  title,
  required,
  fieldname,
  validate,
  CommentYes,
  CommentNo,
  CommentRequired,
  initialValue,
}) => {
  const [RadioOptionValue, setRadioOptionValue] = useState(
    initialValue || null,
  );

  useEffect(() => {
    if (initialValue) {
      setRadioOptionValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (validate) {
      validate(fieldname, RadioOptionValue, required);
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setRadioOptionValue(value);
    validate(fieldname, value, required);
  };

  return (
    <>
      <label className="px-1 text-sm">
        {title}
        {required === "true" && (
          <span className="font-bold text-red-500">*</span>
        )}
      </label>
      <div className="flex items-center justify-between py-2 text-sm">
        <div className="flex items-center gap-8 px-2">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Yes"
              checked={RadioOptionValue === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="No"
              checked={RadioOptionValue === "No"}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      <div
        className={`comment-box ${
          (RadioOptionValue === "Yes" && CommentYes === "true") ||
          (RadioOptionValue === "No" && CommentNo === "true")
            ? "static"
            : "hidden"
        }`}
      >
        <textarea
          name="comment"
          className="w-full rounded-md border border-slate-300 p-2 text-sm"
          placeholder="Add your comment.."
        />
      </div>
    </>
  );
};

RadioField.propTypes = {
  title: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
  CommentYes: PropTypes.string,
  CommentNo: PropTypes.string,
  CommentRequired: PropTypes.string,
  initialValue: PropTypes.string,
};

export default RadioField;
