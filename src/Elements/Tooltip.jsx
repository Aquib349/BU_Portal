import { CiCircleInfo } from "react-icons/ci";

function Tooltip() {
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="relative pt-1 px-2">
          <div className="group cursor-pointer relative inline-block text-center font-bold text-md">
            <CiCircleInfo/>
            <div className="opacity-0 w-[200px] bg-black text-white text-center text-xs rounded-lg py-2 absolute
             z-10 group-hover:opacity-100 bottom-full left-0 pointer-events-none">
              Tooltip center
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
export default Tooltip;
