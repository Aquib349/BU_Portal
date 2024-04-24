import PropTypes from "prop-types";

const FileUpload = ({ title, name }) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm">{title}</label>
        <input
          type="file"
          name={name}
          className="p-2 text-sm rounded-md border border-slate-400 hover:outline-blue-500 w-full"
        />
      </div>
    </>
  );
};

FileUpload.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FileUpload;
