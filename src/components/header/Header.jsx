import Dropdown from "../../Elements/Dropdown";
import { FaBell } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import Notification from "./Notifications";
import { useEffect, useState } from "react";
import SearchBar from "../../Elements/searchbox/Search";
import axios from "axios";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [NotificationData, setNotificationData] = useState([]);

  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  // function to get all the contract which is subscribed by user !!
  async function getUserNotification() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/myAlerts?userName=Santosh Dutta`,
        { headers }
      );
      setNotificationData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserNotification();
  }, []);
  return (
    <>
      <div className="Header-component shadow-md shadow-slate-300 h-16 flex items-center bg-white sticky top-0 z-20">
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
              {/* other nav items */}
            </div>
            <div className="notification-user flex gap-6 justify-end items-center">
              <div className="flex items-center gap-1 cursor-pointer">
                <SearchBar />
              </div>
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
                  {NotificationData.length}
                </div>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[1.1rem]">
                  <FaCircleUser />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification
        showModal={showModal}
        setShowModal={setShowModal}
        NotificationData={NotificationData}
      />
    </>
  );
}

export default Header;
