import PropTypes from "prop-types";
import { useState } from "react";

function Dropdown({ title }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="relative inline-block text-left" onClick={() => setShow(!show)}>
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-[4px] bg-white px-3 py-[4px] text-[0.8rem] font-medium   
                    ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {title}
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25
                         4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              />
            </svg>
          </button>
        </div>

        <div
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white
                   shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                     show ? "static" : "hidden"
                   }`}
        >
          <div className="py-1">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              id="menu-item-0"
            >
              Account settings
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              id="menu-item-1"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              id="menu-item-2"
            >
              License
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Dropdown;
