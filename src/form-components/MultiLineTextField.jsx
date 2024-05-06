import PropTypes from "prop-types";

const MultiLineTextField = ({
  title,
  name,
  baseline,
  required,
  MultiLineValue,
  setMultiLineValue,
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
        <textarea
          name={name}
          value={MultiLineValue}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          onChange={(e) => setMultiLineValue(e.target.value)}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

MultiLineTextField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  MultiLineValue: PropTypes.string.isRequired,
  setMultiLineValue: PropTypes.func.isRequired,
};

export default MultiLineTextField;
