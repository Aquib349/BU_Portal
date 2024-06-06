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
}) => {
  const [RadioOptionValue, setRadioOptionValue] = useState(null);
  useEffect(() => {
    if (validate) {
      validate(fieldname, RadioOptionValue, required);
    }
  }, []);
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
              onChange={(e) => {
                console.log(CommentYes);
                setRadioOptionValue(e.target.value);
                validate(fieldname, e.target.value, required);
              }}
            />
            Yes
          </label>
          <label className="flex gap-1 items-center">
            <input
              type="radio"
              value="No"
              checked={RadioOptionValue === "No"}
              onChange={(e) => {
                console.log(CommentNo);
                setRadioOptionValue(e.target.value);
                validate(fieldname, e.target.value, required);
              }}
            />
            No
          </label>
        </div>
      </div>

      <div
        className={`comment-box ${
          //  RadioOptionValue.toLowerCase() === "yes" ? "static" : "hidden"
          (RadioOptionValue === "Yes" && CommentYes === "true") ||
          (RadioOptionValue === "No" && CommentNo === "true")
            ? "static"
            : "hidden"
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
  title: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
  CommentYes: PropTypes.string,
  CommentNo: PropTypes.string,
  CommentRequired: PropTypes.string,
};

export default RadioField;
