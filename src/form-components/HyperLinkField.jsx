import PropTypes from "prop-types";

const HyperLinkField = ({
  title,
  name,
  baseline,
  required,
  EnteredUrl,
  setEnteredUrl,
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
          type="text"
          name={name}
          value={EnteredUrl}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          onChange={(e) => setEnteredUrl(e.target.value)}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

HyperLinkField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  EnteredUrl: PropTypes.string.isRequired,
  setEnteredUrl: PropTypes.func.isRequired,
};

export default HyperLinkField;
