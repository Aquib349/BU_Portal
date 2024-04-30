import Dropdown from "../Elements/Dropdown";
import { FaBell } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import Notification from "./Notifications";
import { useState } from "react";

function Header() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="Header-component border-b border-slate-300 h-16 flex items-center bg-white sticky top-0 z-20">
        <div className="main w-[95%] m-auto">
          <div className="grid grid-cols-4 items-center">
            <div className="dropdown-menu flex items-center gap-4">
              <img src="/assets/logo.gif" alt="logo" className="w-[130px]" />
              <Dropdown title="Navigate To">
                <div className="py-1">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
                    id="menu-item-0"
                  >
                    My Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
                    id="menu-item-1"
                  >
                    Admin Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
                    id="menu-item-2"
                  >
                    Global Insights
                  </a>
                </div>
              </Dropdown>
            </div>
            <div className="global-search col-span-2 flex justify-center items-center">
              <input
                type="search"
                name="search"
                id="global-search"
                placeholder="Search with Contract, Document or Counterparty name"
                className="p-2 rounded-md text-sm border border-slate-300 w-9/12 outline-2 outline-blue-500/50"
              />
            </div>
            <div className="notification-user flex gap-8 justify-center items-center">
              <div className="relative">
                <span className="text-[1.1rem]">
                  <FaBell
                    onClick={() => setShowModal(!showModal)}
                    className="cursor-pointer"
                  />
                </span>
                <div
                  className="absolute flex justify-center items-center font-medium bg-red-600 text-white text-[0.7rem]
                 w-auto left-2 h-4 p-1 rounded-full top-[-0.6rem]"
                >
                  233
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[1.1rem]">
                  <FaCircleUser />
                </span>
                <div className="text-sm">
                  <span>Hello, windows User</span>
                  {/* dropdown if required */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Header;
