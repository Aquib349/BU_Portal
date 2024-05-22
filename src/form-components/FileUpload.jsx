import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const FileUpload = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [UploadFile, setUploadFile] = useState(null);
  useEffect(() => {
    if (validate) {
      validate(fieldname, UploadFile, required);
    }
  }, []);
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
          type="file"
          name={name}
          className={`p-2 text-sm rounded-md border w-full border-slate-400 outline-blue-400`}
          onChange={(e) => {
            setUploadFile(e.target.files[0]);
            validate(fieldname, e.target.files[0], required);
          }}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

FileUpload.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default FileUpload;
