import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

function Accordion({ heading, children, checked }) {
  return (
    <>
      <div className={`relative overflow-hidden border-b`}>
        <input
          type="checkbox"
          className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
          defaultChecked={checked}
        />
        <div className="">
          <span className="flex items-center h-[40px]">{heading}</span>
        </div>
        <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
          <IoIosArrowDown />
        </div>
        <div
          className={`max-h-0 overflow-auto peer-checked:max-h-[200px] 
          transition-all ease-in-out duration-500 no-scrollbar bg-slate-100`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

Accordion.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Accordion;