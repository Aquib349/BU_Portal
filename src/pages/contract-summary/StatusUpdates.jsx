import Tooltip from "../../Elements/Tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

function StatusUpdates({ Status,Stage }) {
  return (
    <>
      <div className="status-updates border border-slate-300 rounded-md p-2 mt-3">
        <div className="main">
          <div className={`relative `}>
            <input
              type="checkbox"
              className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
            />
            <div className="px-2">
              <span className="flex items-center h-[40px]">
                <div className="flex items-center gap-1">
                  <h1 className="text-xl">Status & Updates</h1>
                  <Tooltip
                    message="View Status History & Update of Contracts"
                    header={<IoMdInformationCircleOutline />}
                  />
                </div>
              </span>
            </div>
            <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
              <IoIosArrowDown />
            </div>
            <div
              className={`max-h-0 peer-checked:max-h-[500px]
          transition-all ease-in-out duration-500 overflow-auto`}
            >
              <div className="status">
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>
                      <GoDotFill />
                    </span>
                    <span>{Status} ({Stage})</span>
                  </div>
                  <p className="text-xs text-slate-400 py-1 pl-5">
                    Santosh Dutta posted on 11/22/2023
                  </p>
                  <p className="text-xs pl-5">
                    "It is waiting for signature from the Legal Team"
                  </p>
                  <div className="older-status pl-5 pt-3">
                    <h1 className="border p-2 w-full font-medium bg-gray-200">
                      Older
                    </h1>
                  </div>

                  {/* older messages */}
                  <div className="pt-2 px-2">
                    <div className="flex items-center gap-2 text-sm pl-5">
                      <span>
                        <GoDotFill />
                      </span>
                      <span>Awaiting Signature</span>
                    </div>
                    <p className="text-xs text-slate-400 py-1 pl-10">
                      Santosh Dutta posted on 11/20/2023
                    </p>
                    <p className="text-xs pl-10">"test"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatusUpdates;
