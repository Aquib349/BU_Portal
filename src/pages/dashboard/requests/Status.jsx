import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";

function Status({ status }) {
  if (status.toLowerCase().includes("awaiting")) {
    return (
      <div className="flex items-center pl-8">
        <span className="text-lg text-orange-500">
          <GoDotFill />
        </span>
        <span className="px-2">{status}</span>
      </div>
    );
  }
  if (status.toLowerCase().includes("new")) {
    return (
      <div className="flex items-center pl-8">
        <span className="text-lg text-green-500">
          <GoDotFill />
        </span>
        <span className="px-2">{status}</span>
      </div>
    );
  }
  if (status.toLowerCase().includes("complete")) {
    return (
      <div className="flex items-center pl-8">
        <span className="text-lg text-blue-500">
          <GoDotFill />
        </span>
        <span className="px-2">{status}</span>
      </div>
    );
  }
  if (status.toLowerCase().includes("cancel")) {
    return (
      <div className="flex items-center pl-8">
        <span className="text-lg text-slate-500">
          <GoDotFill />
        </span>
        <span className="px-2">{status}</span>
      </div>
    );
  }
  if (status.toLowerCase().includes("approved")) {
    return (
      <div className="flex items-center pl-8">
        <span className="text-lg text-blue-500">
          <GoDotFill />
        </span>
        <span className="px-2">{status}</span>
      </div>
    );
  }
  if (status.toLowerCase().includes("on hold")) {
    return (
      <div className="flex items-center pl-8">
        <span className="text-lg text-red-500">
          <GoDotFill />
        </span>
        <span className="px-2">{status}</span>
      </div>
    );
  }
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
