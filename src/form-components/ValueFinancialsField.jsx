import PropTypes from "prop-types";

const ValueFinancialsField = ({
  title,
  name,
  baseline,
  required,
  ValueFinancials,
  setValueFinancials,
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
          value={ValueFinancials}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          onChange={(e) => setValueFinancials(e.target.value)}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

ValueFinancialsField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  ValueFinancials: PropTypes.number.isRequired,
  setValueFinancials: PropTypes.func.isRequired,
};

export default ValueFinancialsField;
