import PropTypes from "prop-types";

const SingleLineTextField = ({
  title,
  name,
  baseline,
  required,
  SingleLineTextValue,
  setSingleLineTextValue,
}) => {
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
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          onChange={(e) => setSingleLineTextValue(e.target.value)}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

SingleLineTextField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  SingleLineTextValue: PropTypes.string.isRequired,
  setSingleLineTextValue: PropTypes.func.isRequired,
};

export default SingleLineTextField;
