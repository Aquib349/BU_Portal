import Tooltip from "../../../Elements/Tooltip";
import { CiCircleInfo } from "react-icons/ci";

function RelatedDocuments() {
  return (
    <>
      <div className="related-documents">
        <div className="main">
          <div className="flex items-center text-lg">
            <h1>Related Documents</h1>
            <Tooltip
              header={<CiCircleInfo />}
              message="View or Upload supporting documents to this request"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatedDocuments;
