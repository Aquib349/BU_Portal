import PropTypes from "prop-types";

function Tooltip({ message, header }) {
  const tooltipWidth = Math.min(200, message.length * 8);

  return (
    <>
      <div className="flex flex-col justify-center -z-0">
        <div className="relative pt-1 w-full">
          <div className="group cursor-pointer w-2 text-center flex justify-start px-2">
            <span className="text-md">{header}</span>
            <div
              className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10
                       group-hover:opacity-100 bottom-full ml-2 transform -translate-x-1/2 px-3 pointer-events-none mb-1"
              style={{ width: `${tooltipWidth}px` }}
            >
              {message}
              <svg
                className="absolute text-black h-2 w-full left-0 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xmlSpace="preserve"
              >
                <polygon   
                  className="fill-current"
                  points="0,0 127.5,127.5 255,0"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  header: PropTypes.any.isRequired,
};

export default Tooltip;
