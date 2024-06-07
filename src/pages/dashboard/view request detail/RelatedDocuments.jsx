import Tooltip from "../../../Elements/Tooltip";
import { CiCircleInfo } from "react-icons/ci";
import PropTypes from "prop-types";
import useRelatedDocuments from "../../../customhooks/useRelatedDocuments";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuView } from "react-icons/lu";
import { useState } from "react";
import GetFileIcon from "../../../constants/FileExtensionName";
import SpinnerTwo from "../../../Elements/spinner2/SpinnerTwo";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFileCircleExclamation } from "react-icons/fa6";

const toastOptions = {
  position: "top-center",
  style: {
    backgroundColor: "black",
    color: "white",
    fontSize: "0.8rem",
  },
};

const errorToastOptions = {
  position: "bottom-left",
  style: {
    backgroundColor: "red",
    color: "white",
    fontSize: "0.8rem",
  },
};

function RelatedDocuments({ status, RowKey }) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [show, setShow] = useState(false);
  // const [overWrite, setOverWrite] = useState(false);
  const [Loading, setLoading] = useState(true);
  const { DocumentData, loader, getRelatedDocument, setLoader } =
    useRelatedDocuments(RowKey);

  const handleRequest = async (
    request,
    successMessage,
    errorMessage,
    callback
  ) => {
    let toastId;

    if (Loading) {
      toastId = toast.loading("Processing...", toastOptions);
    }

    try {
      const response = await request();
      if (response.status === 200 || response.status === 201) {
        setLoader(true);
        setLoading(false);
        callback(RowKey);
        toast.success(successMessage, { ...toastOptions, duration: 1200 });
      }
    } catch (error) {
      console.error(errorMessage, error);
      toast.error(errorMessage, errorToastOptions);
    } finally {
      if (toastId) {
        toast.dismiss(toastId);
      }
      setLoading(true);
    }
  };

  // function to view the document based on their types
  function handleViewDocument(url) {
    console.log(url);
  }

  // function to upload the new document in the request detail page
  const handleRequestDocumentUpload = async (e) => {
    // Check if files are selected
    if (e.target.files && e.target.files.length > 0) {
      const newDocumentName = e.target.files[0].name;

      // Check if the document already exists
      const documentExists = DocumentData.some(
        (item) =>
          item.DocumentUrl?.split("/").pop().toLowerCase() ===
          newDocumentName.toLowerCase()
      );

      const uploadDocument = async (overWrite = false) => {
        const headers = {
          "eContracts-ApiKey":
            "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
        };
        setLoading(true);
        const formData = new FormData();
        const file = e.target.files[0];

        formData.append("opmlFile", file);
        if (overWrite) {
          formData.append("OverWrite", "Yes");
        }
        formData.append("AccountID", "3Xae5Udc");
        formData.append("DocumentID", "");
        formData.append("Description", "");
        formData.append("RequestID", RowKey);
        formData.append("DocumentType", "Not Available");
        const filename = file.name.substr(0, file.name.lastIndexOf("."));
        formData.append("DocumentName", filename);
        formData.append("CreatedBy", "Santosh Dutta");
        formData.append("ModifiedBy", "Santosh Dutta");

        await handleRequest(
          () =>
            axios.post(
              `${api}/api/accounts/${account_id}/Requests/documents`,
              formData,
              { headers }
            ),
          "Document Uploaded successfully",
          "Failed to upload document.",
          getRelatedDocument
        );
      };

      if (documentExists) {
        toast.custom((t) => (
          <div className="flex items-center justify-center w-[100vw] h-screen overflow-hidden fixed top-0 bg-black/50 z-20">
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex border-b">
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="">
                        <FaFileCircleExclamation className="text-red-600 text-3xl" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="mt-1 text-sm">
                        {newDocumentName +
                          " already exists. Try a different name or overwrite."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* check for overWrite */}
              <div className="flex items-center pl-16 py-2 gap-6 text-white text-sm">
                <p className="text-black">Do You Want to Overwrite?</p>
                <button
                  type="button"
                  className="w-8 h-2 p-3 rounded bg-green-500 flex justify-center items-center"
                  onClick={async () => {
                    toast.dismiss(t.id);
                    await uploadDocument(true);
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="w-8 h-2 p-3 rounded bg-blue-600 flex justify-center items-center"
                  onClick={() => toast.dismiss(t.id)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ));
      } else {
        await uploadDocument();
      }
    } else {
      console.error("No files selected.");
    }
  };

  // functions to delete document
  async function deleteDocument(id, name) {
    const headers = {
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
      UserName: "Santosh Dutta",
      requestID: RowKey,
      DocumentName: name,
    };

    await handleRequest(
      () =>
        axios.delete(
          `${api}/api/accounts/${account_id}/Requests/documentsdelete?documentid=${id}`,
          { headers }
        ),
      "Document removed successfully",
      "Failed to delete document.",
      getRelatedDocument
    );
  }

  return (
    <>
      <div className="related-documents">
        <div className="main flex justify-between">
          <div className="flex items-center text-lg">
            <h1 className="font-semibold">Related Documents</h1>
            <div className="mb-1">
              <Tooltip
                header={<CiCircleInfo />}
                message="View or Upload supporting documents to this request"
              />
            </div>
          </div>
          {status !== "Request Completed" && (
            <div className="update-post-button p-1">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleRequestDocumentUpload}
              />
              <label
                htmlFor="fileInput"
                className="px-2 py-2 border border-slate-500 text-slate-500 hover:bg-slate-500
              hover:text-white rounded text-xs cursor-pointer"
              >
                +Upload
              </label>
            </div>
          )}
        </div>
        {loader ? (
          <SpinnerTwo />
        ) : (
          <div className="related-documents-viewer pb-2">
            {DocumentData.map((val) => (
              <div
                key={val.RowKey}
                className="relative flex items-center justify-between text-sm pt-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {GetFileIcon(val.DocumentUrl)}
                  </span>
                  <span>{val.DocumentName}</span>
                </div>
                <div className="flex items-center gap-4 px-2">
                  <span className="text-lg cursor-pointer text-slate-500 px-2">
                    <LuView
                      onClick={() => handleViewDocument(val.DocumentUrl)}
                    />
                  </span>
                  <span className="text-lg cursor-pointer text-slate-500">
                    <RiDeleteBin6Fill
                      onClick={() =>
                        deleteDocument(val.RowKey, val.DocumentName)
                      }
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

RelatedDocuments.propTypes = {
  status: PropTypes.string.isRequired,
  RowKey: PropTypes.string.isRequired,
};

export default RelatedDocuments;