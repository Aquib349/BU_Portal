import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";
import Tooltip from "../../../../Elements/Tooltip";
import Accordion from "../../../../Elements/Accordion";
import useContractStatusUpdates from "../../../../customhooks/useContractStatusUpdates";
import React from "react";
import { statusColor } from "../../../../constants/StatusColor";

function StatusUpdates({ Status, Stage, ID }) {
  const { contractStatus, loading, error } = useContractStatusUpdates(ID);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!contractStatus || contractStatus.length === 0) {
    return (
      <div className="status-updates mt-3 rounded-md border border-slate-300">
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
          checked={true}
          bgRequired={false}
        >
          <div className="status">
            <div
              className={`flex items-center gap-2 text-sm ${statusColor(Status)}`}
            >
              <span className="text-xl">
                <GoDotFill />
              </span>
              <span>
                {Status}
                <b className="px-2 text-xs text-black">(Current)</b>
              </span>
            </div>
            <p className="pl-7 pt-1 text-xs">No Recent Updates</p>
          </div>
        </Accordion>
      </div>
    );
  }

  return (
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
          checked={true}
          bgRequired={false}
        >
          <div className="status">
            <div
              className={`flex items-center gap-2 text-sm ${statusColor(contractStatus[0].CurrentStatus)}`}
            >
              <span className="text-xl">
                <GoDotFill />
              </span>
              <span>
                {contractStatus[0].CurrentStatus}
                <b className="px-2 text-xs text-black">(Current)</b>
              </span>
            </div>
            <p className="py-1 pl-7 text-xs text-slate-400">
              {contractStatus[0].CreatedBy} posted on{" "}
              {new Date(contractStatus[0].Timestamp).toLocaleDateString()}
            </p>
            <p className="pl-7 text-xs">{contractStatus[0].Post}</p>
          </div>

          <div className="older-status pl-5 pt-3">
            <h1 className="w-full border bg-gray-200 p-2 font-medium">Older</h1>
          </div>
          {contractStatus?.slice(1)?.map((val) => {
            const dateObject = new Date(val.Timestamp);
            return (
              <div key={val.RowKey} className="status py-2 pl-6">
                <div
                  className={`flex items-center gap-2 text-sm ${statusColor(val.CurrentStatus)}`}
                >
                  <span className="text-xl">
                    <GoDotFill />
                  </span>
                  <span>{val.CurrentStatus}</span>
                </div>
                <p className="py-1 pl-7 text-xs text-slate-400">
                  {val.CreatedBy} posted on {dateObject.toLocaleDateString()}
                </p>
                <p className="pl-7 text-xs">{val.Post}</p>
              </div>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

StatusUpdates.propTypes = {
  Status: PropTypes.string,
  Stage: PropTypes.string,
  ID: PropTypes.string.isRequired,
};

export default StatusUpdates;
