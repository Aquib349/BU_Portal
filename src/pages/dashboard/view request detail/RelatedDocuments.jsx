import Tooltip from "../../../Elements/Tooltip";
import { CiCircleInfo } from "react-icons/ci";
import PropTypes from "prop-types";
import useRelatedDocuments from "../../../customhooks/useRelatedDocuments";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuView } from "react-icons/lu";
import { useState } from "react";
import Spinner from "../../../Elements/loading spinner/Spinner";
import GetFileIcon from "../../../constants/FileExtensionName";

function RelatedDocuments({ status, RowKey }) {
  const [show, setShow] = useState(false);
  const { DocumentData, loader } = useRelatedDocuments(RowKey);
  // console.log(DocumentData);

  // function to view the document based on their types
  function handleViewDocument(url) {
    console.log(url);
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
              <input type="file" id="fileInput" className="hidden" />
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
          <Spinner />
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
                    <RiDeleteBin6Fill />
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
  status: PropTypes.any,
  RowKey: PropTypes.string,
};

export default RelatedDocuments;
