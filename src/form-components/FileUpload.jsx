import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "../Elements/Modal";
import MultiFileUploader from "../components/MultiFileUploader";

const FileUpload = ({
  title,
  name,
  baseline,
  required,
  fieldname,
  validate,
}) => {
  const [UploadFile, setUploadFile] = useState(null);
  const [show, setShow] = useState(false);

  // function to handle modal
  function toggleModal() {
    setShow(!show);
  }

  useEffect(() => {
    if (validate) {
      validate(fieldname, UploadFile, required);
    }
  }, []);

  return (
    <>
      {show && (
        <Modal
          toggleModal={toggleModal}
          heading="Upload Your Multiple File"
          set_Width={true}
        >
          <MultiFileUploader />
        </Modal>
      )}
      <div className="flex flex-col pb-3 pt-1">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className="text-red-500 font-bold">*</span>
          )}
        </label>
        <div
          className="border border-slate-400 flex items-center text-xs p-2 w-2/12 my-1 rounded cursor-pointer font-medium"
          onClick={() => setShow(!show)}
        >
          +Upload file
        </div>
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

FileUpload.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  baseline: PropTypes.string,
  required: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

export default FileUpload;
