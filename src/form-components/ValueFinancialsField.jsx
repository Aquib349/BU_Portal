import PropTypes from "prop-types";

const ValueFinancialsField = ({ title, name, value, baseline, required }) => {
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          <span
            className={`text-red-500 font-bold ${
              required ? "static" : "hidden"
            }`}
          >
            *
          </span>
        </label>
        <input
          type="number"
          name={name}
          value={value}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
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
  required: PropTypes.bool.isRequired,
};

export default ValueFinancialsField;
