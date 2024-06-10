import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { CiFileOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";
import GetFileIcon from "../../../../constants/FileExtensionName";
import Tooltip from "../../../../Elements/Tooltip";

function Documents({ DocumentDetails }) {
  return (
    <>
      <div className="document-components  border border-slate-300 rounded-md p-4 mt-4">
        <div className="main">
          <div className={`relative`}>
            <input
              type="checkbox"
              className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
            />
            <div>
              <span className="flex items-center h-[40px]">
                <div className="all-documents flex items-center gap-1">
                  <h1 className="text-xl">Documents</h1>
                  <Tooltip
                    message="View or Download Contract document"
                    header={<IoMdInformationCircleOutline />}
                  />
                </div>
              </span>
            </div>
            <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
              <IoIosArrowDown />
            </div>
            <div
              className={`max-h-0 peer-checked:max-h-[600px]
          transition-all ease-in-out duration-500 overflow-auto`}
            >
              {DocumentDetails.length > 0 ? (
                DocumentDetails.map((val) => {
                  const dateObject = new Date(val.Modified);
                  return (
                    <div key={val.RowKey} className="">
                      <div className="flex items-center gap-4 pt-2">
                        <div className="text-blue-600 text-xl">
                          <GoDotFill />
                        </div>
                        <span>{GetFileIcon(val.DocumentUrl)}</span>
                        <span>{val.DocumentUrl.split("/").pop()}</span>
                      </div>
                      <div className="flex items-center text-xl gap-4 pl-14">
                        <Tooltip
                          message="Document Types  "
                          header={<CiFileOn />}
                        />
                        <div className="text-xl px-2">
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
                <h1 className="text-xs px-2">- no documents -</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Documents.propTypes = {
  DocumentDetails: PropTypes.array,
};

export default Documents;
