import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";

function Status({ status }) {
  return (
    <>
      <div className="flex items-center pl-3">
        <span
          className={`text-lg 
                      ${
                        status.toLowerCase().includes("awaiting")
                          ? "text-orange-500"
                          : "text-slate-300"
                      }`}
        >
          <GoDotFill />
        </span>
        <span
          className={`text-lg 
                      ${
                        status.toLowerCase().includes("new")
                          ? "text-green-500"
                          : "text-slate-300"
                      }`}
        >
          <GoDotFill />
        </span>
        <span
          className={`text-lg 
                      ${
                        status.toLowerCase().includes("complete")
                          ? "text-blue-500"
                          : "text-slate-300"
                      }`}
        >
          <GoDotFill />
        </span>
        <span
          className={`text-lg 
                      ${
                        status.toLowerCase().includes("cancel")
                          ? "text-slate-500"
                          : "text-slate-300"
                      }`}
        >
          <GoDotFill />
        </span>
        <span
          className={`text-lg 
                      ${
                        status.toLowerCase().includes("approved")
                          ? "text-blue-500"
                          : "text-slate-300"
                      }`}
        >
          <GoDotFill />
        </span>
        <span
          className={`text-lg 
                      ${
                        status.toLowerCase().includes("on hold")
                          ? "text-red-500"
                          : "text-slate-300"
                      }`}
        >
          <GoDotFill />
        </span>
        <span className="px-2 text-black">{status}</span>
      </div>
    </>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
