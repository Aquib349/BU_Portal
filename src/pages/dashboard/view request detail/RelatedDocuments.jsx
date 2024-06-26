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
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Modal from "../../../Elements/Modal";

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

  const [Loading, setLoading] = useState(true);
  const { DocumentData, loader, getRelatedDocument, setLoader } =
    useRelatedDocuments(RowKey);
  const [DocumentLink, setDocumentLink] = useState([]);
  const [DocumentName, setDocumentName] = useState("");
  const [showDocument, setShowDocument] = useState(false);

  const toggleModal = () => {
    setShowDocument(!showDocument);
  };

  const handleRequest = async (
    request,
    successMessage,
    errorMessage,
    callback,
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
  function handleViewDocument(name, url) {
    console.log(url);
    setDocumentName(name);
    const arr = [];
    const data = {
      url: url,
    };
    arr.push(data);
    setDocumentLink(arr);
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
          newDocumentName.toLowerCase(),
      );

      const uploadDocument = async (overWrite = false) => {
        const user = localStorage.getItem("username");
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
        formData.append("CreatedBy", `${user}`);
        formData.append("ModifiedBy", `${user}`);

        await handleRequest(
          () =>
            axios.post(
              `${api}/api/accounts/${account_id}/Requests/documents`,
              formData,
              { headers },
            ),
          "Document Uploaded successfully",
          "Failed to upload document.",
          getRelatedDocument,
        );
      };

      if (documentExists) {
        toast.custom((t) => (
          <div className="fixed top-0 z-20 flex h-screen w-[100vw] items-center justify-center overflow-hidden bg-black/50">
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } pointer-events-auto flex w-full max-w-md flex-col rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex border-b">
                <div className="w-0 flex-1 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="">
                        <FaFileCircleExclamation className="text-3xl text-red-600" />
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
                    className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* check for overWrite */}
              <div className="flex items-center gap-6 py-2 pl-16 text-sm text-white">
                <p className="text-black">Do You Want to Overwrite?</p>
                <button
                  type="button"
                  className="flex h-2 w-8 items-center justify-center rounded bg-green-500 p-3"
                  onClick={async () => {
                    toast.dismiss(t.id);
                    await uploadDocument(true);
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="flex h-2 w-8 items-center justify-center rounded bg-blue-600 p-3"
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
          { headers },
        ),
      "Document removed successfully",
      "Failed to delete document.",
      getRelatedDocument,
    );
  }

  return (
    <>
      {showDocument && (
        <Modal
          heading={DocumentName}
          toggleModal={toggleModal}
          set_Width={true}
        >
          <DocViewer
            // pluginRenderers={DocViewerRenderers}
            documents={DocumentLink}
          />
        </Modal>
      )}
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
                className="cursor-pointer rounded border border-slate-500 px-2 py-2 text-xs text-slate-500 hover:bg-slate-500 hover:text-white"
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
                className="relative flex items-center justify-between pt-4 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {GetFileIcon(val.DocumentUrl)}
                  </span>
                  <span>{val.DocumentName}</span>
                </div>
                <div className="flex items-center gap-4 px-2">
                  <span className="cursor-pointer px-2 text-lg text-slate-500">
                    <LuView
                      onClick={() => {
                        handleViewDocument(val.DocumentName, val.DocumentUrl);
                        setShowDocument(!showDocument);
                      }}
                    />
                  </span>
                  <span className="cursor-pointer text-lg text-slate-500">
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
  status: PropTypes.string,
  RowKey: PropTypes.string,
};

export default RelatedDocuments;
