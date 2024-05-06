import PropTypes from "prop-types";

const FileUpload = ({ title, name, baseline, required, setUploadFile }) => {
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && <span className={`text-red-500 font-bold`}>*</span>}
        </label>
        <input
          type="file"
          name={name}
          className="p-2 text-sm rounded-md border border-slate-400 hover:outline-blue-500 w-full"
          onChange={(e) => setUploadFile(e.target.files[0])}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

FileUpload.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  setUploadFile:PropTypes.func.isRequired
};

export default FileUpload;