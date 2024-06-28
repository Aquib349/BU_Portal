import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";
import Accordion from "../../../Elements/Accordion";
import { StatusColor } from "../../../constants/StatusColor";

function ViewStatusUpdates({
  StatusUpdates,
  status,
  UpdateStatus,
  setShowModal,
}) {
  const [currentStatus, ...olderStatuses] = StatusUpdates;
  if (StatusUpdates.length === 0) {
    return (
      <>
        <div className="status-update-component flex items-center justify-between">
          <h1 className="text-xl font-semibold">Status Updates</h1>
          <button
            type="button"
            className={`rounded border border-slate-600 px-2 py-2 text-xs text-slate-500 hover:bg-slate-500 hover:text-white ${
              UpdateStatus === "Request Completed" ? "hidden" : ""
            }`}
            onClick={() => setShowModal(true)}
          >
            +Update/Post
          </button>
        </div>
        <div className="mt-4 rounded border bg-blue-50 p-2 text-xs">
          <div className="leading-5">
            <div className="heading-status flex items-center gap-2 text-sm font-semibold">
              <span>
                <StatusColor status={status} />
              </span>
              <span>
                {status} <b className="">(current)</b>
              </span>
            </div>
            <p className="px-5 py-1">
              Post an update about the status of this Request
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="status-update-component flex items-center justify-between">
        <h1 className="text-xl font-semibold">Status Updates</h1>
        <div className="update-post-button">
          {UpdateStatus !== "Request Completed" && (
            <button
              type="button"
              className={`rounded border border-slate-600 px-2 py-2 text-xs text-slate-500 hover:bg-slate-500 hover:text-white ${
                UpdateStatus === "Request Completed" ? "hidden" : ""
              }`}
              onClick={() => setShowModal(true)}
            >
              +Update/Post
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 rounded border border-slate-300">
        {/* Render current status */}
        {currentStatus && (
          <div
            key={currentStatus.RowKey}
            className="border-b bg-blue-50 p-2 text-xs"
          >
            <div className="leading-5">
              <div className="heading-status flex items-center gap-2 text-sm font-semibold">
                <span>
                  <StatusColor status={currentStatus.CurrentStatus} />
                </span>
                <span>
                  {currentStatus.CurrentStatus} <b className="">(current)</b>
                </span>
              </div>
              <p className="px-6">{currentStatus.Post}</p>
              <p className="px-6 text-slate-500">
                {currentStatus.ModifiedBy} on{" "}
                {new Date(currentStatus.Modified).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {olderStatuses.length > 0 && (
          <Accordion heading="Older" checked={true}>
            {/* Render older statuses */}
            {olderStatuses.map((val) => {
              const dateObject = new Date(val.Modified);
              return (
                <div key={val.RowKey} className="border-b p-2 text-xs">
                  <div className="leading-5">
                    <div className="heading-status flex items-center gap-2 text-sm font-semibold">
                      <span>
                        <StatusColor status={val.CurrentStatus} />
                      </span>
                      <span>{val.CurrentStatus}</span>
                    </div>
                    <p className="px-6">{val.Post}</p>
                    <p className="px-6 text-slate-500">
                      {val.ModifiedBy} on {dateObject.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </Accordion>
        )}
      </div>
    </>
  );
}

ViewStatusUpdates.propTypes = {
  StatusUpdates: PropTypes.array,
  status: PropTypes.any,
};

export default ViewStatusUpdates;
