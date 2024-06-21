import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";
import Tooltip from "../../../../Elements/Tooltip";
import Accordion from "../../../../Elements/Accordion";

function StatusUpdates({ Status, Stage }) {
  return (
    <>
      <div className="status-updates mt-3 rounded-md border border-slate-300">
        <div className="main">
          <Accordion
            heading={
              <span className="flex items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">Status & Updates</h1>
                  <Tooltip
                    message="View Status History & Update of Contracts"
                    header={<IoMdInformationCircleOutline />}
                  />
                </div>
              </span>
            }
            checked={false}
            bgRequired={true}
          >
            <div className="status">
              <div className="flex items-center gap-2 text-sm">
                <span>
                  <GoDotFill />
                </span>
                <span>
                  {Status} ({Stage})
                </span>
              </div>
              <p className="py-1 pl-5 text-xs text-slate-400">
                Santosh Dutta posted on 11/22/2023
              </p>
              <p className="pl-5 text-xs">
                "It is waiting for signature from the Legal Team"
              </p>
              <div className="older-status pl-5 pt-3">
                <h1 className="w-full border bg-gray-200 p-2 font-medium">
                  Older
                </h1>
              </div>

              {/* older messages */}
              <div className="px-2 pt-2">
                <div className="flex items-center gap-2 pl-5 text-sm">
                  <span>
                    <GoDotFill />
                  </span>
                  <span>Awaiting Signature</span>
                </div>
                <p className="py-1 pl-10 text-xs text-slate-400">
                  Santosh Dutta posted on 11/20/2023
                </p>
                <p className="pl-10 text-xs">"test"</p>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default StatusUpdates;
