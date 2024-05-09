import Tooltip from "../../../Elements/Tooltip";
import { CiCircleInfo } from "react-icons/ci";
import PropTypes from "prop-types";
import useRelatedDocuments from "../../../customhooks/useRelatedDocuments";

function RelatedDocuments({ status, RowKey }) {
  const { DocumentData } = useRelatedDocuments(RowKey);
  console.log(DocumentData);
  return (
    <>
      <div className="related-documents">
        <div className="main flex justify-between">
          <div className="flex items-center text-lg">
            <h1>Related Documents</h1>
            <div className="mb-1">
              <Tooltip
                header={<CiCircleInfo />}
                message="View or Upload supporting documents to this request"
              />
            </div>
          </div>
          {status !== "Request Completed" && (
            <div className="update-post-button">
              <button
                type="button"
                className="px-2 py-2 border border-slate-500 text-slate-500 hover:bg-slate-500
             hover:text-white rounded text-xs"
              >
                +Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

RelatedDocuments.propTypes = {
  status: PropTypes.any.isRequired,
  RowKey: PropTypes.string.isRequired,
};

export default RelatedDocuments;
