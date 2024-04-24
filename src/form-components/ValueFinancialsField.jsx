import PropTypes from "prop-types";

const ValueFinancialsField = ({ title, name, value }) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm">{title}</label>
        <input
          type="number"
          name={name}
          value={value}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          placeholder="value/Financials"
        />
      </div>
    </>
  );
};

ValueFinancialsField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default ValueFinancialsField;
