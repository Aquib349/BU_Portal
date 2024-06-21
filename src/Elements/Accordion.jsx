import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function Accordion({ heading, children, checked, bgRequired }) {
  const [isOpen, setIsOpen] = useState(checked);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-xl">
      <h2>
        <div className="relative w-full p-3 text-left font-medium text-gray-500 outline-none">
          <span>{heading}</span>
          <span
            className={`absolute right-3 top-5 transform cursor-pointer transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            onClick={toggleAccordion}
          >
            <IoIosArrowDown />
          </span>
        </div>
      </h2>
      <Transition
        show={isOpen}
        enter="transition-max-height duration-300 ease-in-out"
        enterFrom="max-h-0"
        enterTo="max-h-screen"
        leave="transition-max-height duration-300 ease-in-out"
        leaveFrom="max-h-screen"
        leaveTo="max-h-0"
      >
        <div className="transition-max-height overflow-hidden duration-500 ease-in-out">
          <div
            className={`bg-white-100 border-t border-gray-200 p-2 py-2 ${bgRequired ? "bg-slate-50" : ""}`}
          >
            {children}
          </div>
        </div>
      </Transition>
    </div>
  );
}

Accordion.propTypes = {
  heading: PropTypes.any,
  children: PropTypes.any,
};

export default Accordion;
