import PropTypes from "prop-types";

const SingleLineTextField = ({ title, name, value }) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm">{title}</label>
        <input
          type="text"
          name={name}
          value={value}
          className="p-2 text-sm rounded-md border border-slate-400 outline-blue-500 w-full"
          placeholder="single line text"
        />
      </div>
    </>
  );
};

SingleLineTextField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SingleLineTextField;
