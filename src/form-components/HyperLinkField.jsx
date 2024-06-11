import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const HyperLinkField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  const [EnteredUrl, setEnteredUrl] = useState(initialValue || "");
  useEffect(() => {
    if (validate) {
      validate(fieldname, EnteredUrl, required);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <input
          type="text"
          name={name}
          value={EnteredUrl}
          className={`p-2 text-sm rounded-md border w-full border-slate-400 outline-blue-400`}
          onChange={(e) => {
            setEnteredUrl(e.target.value);
            validate(fieldname, e.target.value, required);
          }}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

HyperLinkField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default HyperLinkField;
