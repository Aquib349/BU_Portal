import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";

function ViewStatusUpdates({ StatusUpdates }) {
  return (
    <>
      <div className="status-update-component flex justify-between items-center">
        <h1 className="text-xl font-semibold">Status Updates</h1>
        <div className="update-post-button">
          <button
            type="button"
            className="px-2 py-2 border border-slate-600 text-slate-500 hover:bg-slate-500
             hover:text-white rounded text-xs"
          >
            +Update/Post
          </button>
        </div>
      </div>
      <div className="mt-4 border border-slate-300 rounded bg-blue-50">
        {StatusUpdates.map((val) => (
          <div key={val.RowKey} className="border-b p-2 text-xs">
            <div className="leading-5">
              <div className="heading-status flex items-center gap-2 text-sm font-semibold">
                <span>
                  <GoDotFill />
                </span>
                <span>{val.CurrentStatus} <b className={``}>(current)</b></span>
              </div>
              <p className="px-6">{val.Post}</p>
              <p className="px-6 text-slate-500">Santosh Dutta on 11/22/2023</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ViewStatusUpdates.propTypes = {
  StatusUpdates: PropTypes.array.isRequired,
};

export default ViewStatusUpdates;
