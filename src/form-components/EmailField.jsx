import PropTypes from "prop-types";

const EmailField = ({
  title,
  name,
  Emailvalue,
  setEmailValue,
  baseline,
  required,
}) => {
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
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

EmailField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Emailvalue: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  setEmailValue: PropTypes.func.isRequired,
};

export default EmailField;
