import PropTypes from "prop-types";
import React from "react";


function Tooltip({ message, header }) {
  const tooltipWidth = Math.min(
    200,
    message.length > 7 ? message.length * 8 : message.length * 13
  );

  return (
    <div className="relative flex justify-start group">
      <div className="icon pt-1">{header}</div>
      <div
        className="tooltip opacity-0 invisible group-hover:opacity-100 group-hover:visible
        bg-black text-white text-xs text-center font-medium p-2 rounded-md shadow-lg absolute bottom-full mb-2 left-1/2 transform
         -translate-x-1/2"
        style={{ width: tooltipWidth }}
      >
        {message}
        <div className="tooltip-arrow w-2 h-2 bg-black absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  header: PropTypes.any.isRequired,
};

export default Tooltip;
