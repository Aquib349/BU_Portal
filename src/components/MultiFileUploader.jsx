import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import PropTypes from "prop-types";

const MultiFileUploader = ({
  toggleModal,
  setUploadFile,
  validate,
  fieldname,
  required,
}) => {
  const [files, setFiles] = useState([]);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggedOver(false);
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    event.target.value = null;
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    if (event.dataTransfer.types.indexOf("Files") > -1) {
      setIsDraggedOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  const handleDragOver = (event) => {
    if (event.dataTransfer.types.indexOf("Files") > -1) {
      event.preventDefault();
    }
  };

  const handleFileInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    event.target.value = null;
  };

  const handleFileDelete = (fileToDelete) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  const handleSubmit = () => {
    validate(fieldname, files, required);
    setUploadFile(files);
    setFiles([]);
    toggleModal();
  };

  return (
    <div className="file uploader">
      <main className="container mx-auto max-w-screen-lg h-auto">
        <article
          aria-label="File Upload Modal"
          className={`relative flex flex-col ${
            isDraggedOver ? "draggedover" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >
          <section className="h-full overflow-auto p-8 w-full flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;
                <span>files anywhere or</span>
              </p>
              <input
                id="hidden-input"
                type="file"
                accept=".pdf, .png, .jpg, .jpeg, .gif, .bmp, .doc, .xls, .ppt, .docx, .xlsx, .txt, .pptx, .dotx, .xps, .rtf, .odt, .dotm, .docm, .msg, .tif, .tiff, .csv, .zip, .ZIP"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
              />
              <button
                id="button"
                type="button"
                className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={() => document.getElementById("hidden-input").click()}
              >
                Upload a file
              </button>
            </header>

            {/* Display uploaded files */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Uploaded Files:</h2>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-gray-400 py-1 text-sm"
                >
                  <div>{file.name}</div>
                  <button
                    onClick={() => handleFileDelete(file)}
                    className="text-red-600 hover:text-red-800 text-lg"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              ))}
            </div>
          </section>
          <footer className="flex justify-end px-8 pb-8 pt-4">
            <button
              id="submit"
              type="button"
              className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white focus:shadow-outline focus:outline-none"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              id="cancel"
              type="button"
              className="ml-3 rounded-sm px-3 py-1 bg-gray-500 text-white hover:bg-gray-600 focus:shadow-outline focus:outline-none"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
};

MultiFileUploader.propTypes = {
  toggleModal: PropTypes.func,
};

export default MultiFileUploader;
