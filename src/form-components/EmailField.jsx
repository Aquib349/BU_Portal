import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const EmailField = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  const [Emailvalue, setEmailValue] = useState(initialValue || "");
  useEffect(() => {
    if (validate) {
      validate(fieldname, Emailvalue, required);
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
          type="email"
          name={name}
          value={Emailvalue}
          className={`p-2 text-sm rounded-md border w-full border-slate-400 outline-blue-400`}
          onChange={(e) => {
            setEmailValue(e.target.value);
            validate(fieldname, e.target.value, required);
          }}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

EmailField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default EmailField;
