import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { CiFileOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import PropTypes from "prop-types";
import GetFileIcon from "../../../../constants/FileExtensionName";
import Tooltip from "../../../../Elements/Tooltip";
import Accordion from "../../../../Elements/Accordion";

function Documents({ DocumentDetails }) {
  return (
    <>
      <div className="document-components mt-4 rounded-md border border-slate-300">
        <div className="main">
          <Accordion
            heading={
              <div>
                <span className="flex items-center">
                  <div className="all-documents flex items-center gap-1">
                    <h1 className="text-lg">Documents</h1>
                    <Tooltip
                      message="View or Download Contract document"
                      header={<IoMdInformationCircleOutline />}
                    />
                  </div>
                </span>
              </div>
            }
            checked={false}
            bgRequired={false}
          >
            {DocumentDetails.length > 0 ? (
              DocumentDetails.map((val) => {
                const dateObject = new Date(val.Modified);
                return (
                  <div key={val.RowKey} className="">
                    <div className="flex items-center gap-4 pt-2">
                      <div className="text-xl text-blue-600">
                        <GoDotFill />
                      </div>
                      <span>{GetFileIcon(val.DocumentUrl)}</span>
                      <span>{val.DocumentUrl.split("/").pop()}</span>
                    </div>
                    <div className="flex items-center gap-4 pl-16 text-xl">
                      <Tooltip
                        message="Document Types"
                        header={<CiFileOn />}
                      />
                      <div className="px-2 text-xl">
                        <Tooltip
                          message="Last Modified"
                          header={
                            <div className="flex items-center gap-2">
                              <CiCalendarDate />
                              <span className="text-sm">
                                {dateObject.toLocaleDateString()}
                              </span>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="px-2 text-xs">- no documents -</h1>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}

Documents.propTypes = {
  DocumentDetails: PropTypes.array,
};

export default Documents;
