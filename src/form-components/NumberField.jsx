import PropTypes from "prop-types";

const NumberField = ({
  title,
  name,
  baseline,
  required,
  NumberFieldValue,
  setNumberFieldValue,
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
          type="number"
          name={name}
          value={NumberFieldValue}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          onChange={(e) => setNumberFieldValue(e.target.value)}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

NumberField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  NumberFieldValue: PropTypes.number.isRequired,
  setNumberFieldValue: PropTypes.func.isRequired,
};

export default NumberField;
