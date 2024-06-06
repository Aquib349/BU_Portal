import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "../Elements/Modal";
import MultiFileUploader from "../components/MultiFileUploader";
import { MdDeleteForever } from "react-icons/md";

const FileUpload = ({ title, baseline, required, fieldname, validate }) => {
  const [UploadFile, setUploadFile] = useState([]);
  const [show, setShow] = useState(false);

  // function to handle modal
  function toggleModal() {
    setShow(!show);
  }

  // function to delete the selected files
  const handleFileDelete = (fileToDelete) => {
    setUploadFile(UploadFile.filter((file) => file !== fileToDelete));
  };

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
          <MultiFileUploader
            toggleModal={toggleModal}
            setUploadFile={setUploadFile}
            validate={validate}
            fieldname={fieldname}
            required={required}
          />
        </Modal>
      )}
      <div className="flex flex-col pb-3 pt-1">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className="text-red-500 font-bold">*</span>
          )}
        </label>
        <div className="flex flex-col border border-slate-400 rounded p-2">
          <div
            className="border border-slate-400 flex items-center text-xs p-2 w-2/12 my-1 rounded cursor-pointer 
            font-medium bg-gray-600 text-white"
            onClick={() => setShow(!show)}
          >
            +Upload file
          </div>
          <div>
            {UploadFile.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-gray-400 py-1 text-sm"
              >
                <div>{file.name}</div>
                <button
                  type="button"
                  onClick={() => handleFileDelete(file)}
                  className="text-red-600 hover:text-red-800 text-lg"
                >
                  <MdDeleteForever />
                </button>
              </div>
            ))}
          </div>
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
