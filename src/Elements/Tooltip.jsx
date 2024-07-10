import PropTypes from "prop-types";
import React from "react";

function Tooltip({ message, header }) {
  const tooltipWidth = Math.min(
    200,
    message?.length > 7 ? message?.length * 8 : message?.length * 13,
  );

  return (
    <div className="group relative flex justify-start">
      <div className="icon pt-1">{header}</div>
      <div
        className="tooltip invisible absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-md bg-black p-2 text-center text-xs font-medium text-white opacity-0 shadow-lg group-hover:visible group-hover:opacity-100"
        style={{ width: tooltipWidth || 0 }}
      >
        {message}
        <div className="tooltip-arrow absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-black"></div>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  message: PropTypes.string,
  header: PropTypes.any,
};

export default Tooltip;
