import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

// const newFiles = { ...files };
//     const objectURL = URL.createObjectURL(file);
//     newFiles[objectURL] = file;
//     setFiles(newFiles);

const MultiFileUploader = () => {
  const [files, setFiles] = useState({});
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const addFile = (file) => {
    setFiles((prevFiles) => ({ ...prevFiles }, file));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggedOver(false);
    for (const file of event.dataTransfer.files) {
      addFile(file);
    }
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
    for (const file of event.target.files) {
      addFile(file);
    }
  };

  const handleFileDelete = (objectURL) => {
    const newFiles = { ...files };
    delete newFiles[objectURL];
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    console.log(files);
  };

  const handleCancel = () => {
    setFiles({});
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
              {Object.keys(files).map((objectURL, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-gray-400 py-1 text-sm"
                >
                  <div>{files[objectURL].name}</div>
                  <button
                    onClick={() => handleFileDelete(objectURL)}
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
              className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
              onClick={handleSubmit}
            >
              Upload now
            </button>
            <button
              id="cancel"
              type="button"
              className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default MultiFileUploader;
