import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SingleLineTextField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [SingleLineTextValue, setSingleLineTextValue] = useState("");

  useEffect(() => {
    if (validate) {
      validate(fieldname, SingleLineTextValue, required);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" ? (
            <span className="text-red-500 font-bold">*</span>
          ) : null}
        </label>

        <input
          type="text"
          name={name}
          value={SingleLineTextValue}
          className={`p-2 text-sm rounded-md border w-full border-slate-400 outline-blue-400`}
          onChange={(e) => {
            setSingleLineTextValue(e.target.value);
            validate(fieldname, e.target.value, required);
          }}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

SingleLineTextField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  SingleLineTextValue: PropTypes.string,
  setSingleLineTextValue: PropTypes.func,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default SingleLineTextField;
