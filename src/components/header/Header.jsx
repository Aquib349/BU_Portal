import { FaBell, FaCircleUser } from "react-icons/fa6";
import Notification from "./Notifications";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../../Elements/searchbox/Search";
import axios from "axios";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { TiHome } from "react-icons/ti";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [NotificationData, setNotificationData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { instance } = useMsal();
  const dropdownBookmark = useRef(null);
  const location = useLocation();
  const userType = localStorage.getItem("userType");

  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  async function getUserNotification() {
    const user = localStorage.getItem("username");
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/myAlerts?userName=${user}`,
        { headers },
      );
      setNotificationData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // function to handle the logout;
  async function handleLogout() {
    sessionStorage.clear();
    localStorage.clear();
    await instance.logoutRedirect().catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    getUserNotification();
  }, []);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (
        dropdownBookmark.current &&
        !dropdownBookmark.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  function handleShowProfile() {
    toast.custom((t) => (
      <div className="flex w-[100vw] justify-end">
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } pointer-events-auto relative mr-4 mt-14 flex w-3/12 flex-col rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex p-4">
            <div className="logo">
              <img
                src="/assets/user_219986.png"
                alt="logo"
                className="h-16 w-16 rounded bg-white"
              />
            </div>
            <div className="px-6 leading-4">
              <h1 className="font-bold">Hello</h1>
              <h1 className="text-sm">{localStorage.getItem("username")}</h1>
              <button
                type="button"
                className="mt-2 flex h-4 w-[4.5rem] items-center justify-center rounded border-2 border-red-500 p-2 text-[0.6rem] font-bold tracking-[0.05rem] text-red-600 hover:bg-red-500 hover:text-white"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          </div>
          <div className="absolute right-2 top-2 cursor-pointer">
            <RxCross2 onClick={() => toast.dismiss(t.id)} />
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="Header-component sticky top-0 z-20 flex h-16 items-center bg-white shadow-md shadow-slate-300">
        <div className="main m-auto w-[95%]">
          <div className="grid grid-cols-4 items-center">
            <div
              className="dropdown-menu flex items-center gap-4"
              ref={dropdownBookmark}
            >
              <img src="/assets/logo.gif" alt="logo" className="w-[130px]" />
              {userType.split(";").length > 1 &&
                userType.split(";")[0] !== "Portal User" && (
                  <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className="relative"
                  >
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center gap-2 rounded border border-slate-200 px-2 py-1 text-xs"
                    >
                      Navigate To
                      <motion.div
                        variants={{
                          open: { rotate: 180 },
                          closed: { rotate: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.55 }}
                      >
                        <svg width="10" height="10" viewBox="0 0 20 20">
                          <path d="M0 7 L 20 7 L 10 16" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <motion.ul
                      className="absolute mt-5 w-44 bg-white text-sm shadow-lg"
                      variants={{
                        open: {
                          clipPath: "inset(0% 0% 0% 0% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                          },
                        },
                        closed: {
                          clipPath: "inset(10% 50% 90% 50% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3,
                          },
                        },
                      }}
                      style={{ pointerEvents: isOpen ? "auto" : "none" }}
                    >
                      <motion.li
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                        variants={itemVariants}
                        onClick={() => {
                          navigate("error");
                          setIsOpen(false);
                        }}
                      >
                        My Dashboard
                      </motion.li>
                      <motion.li
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                        variants={itemVariants}
                        onClick={() => {
                          navigate("error");
                          setIsOpen(false);
                        }}
                      >
                        Admin Dashboard
                      </motion.li>
                      <motion.li
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                        variants={itemVariants}
                        onClick={() => {
                          navigate("error");
                          setIsOpen(false);
                        }}
                      >
                        Global Insights
                      </motion.li>
                    </motion.ul>
                  </motion.nav>
                )}
            </div>
            <div className="global-search col-span-2 flex items-center justify-center">
              {/* other nav items */}
            </div>
            <div className="notification-user flex items-center justify-end gap-6">
              <div className="flex cursor-pointer items-center gap-1">
                <SearchBar />
              </div>
              <div className="relative cursor-pointer">
                <span className="text-[1.1rem]">
                  <FaBell
                    onClick={() => setShowModal(!showModal)}
                    className="cursor-pointer"
                  />
                </span>
                <div className="absolute left-2 top-[-0.6rem] flex h-4 w-auto items-center justify-center rounded-full bg-red-600 p-1 text-[0.7rem] font-medium text-white">
                  {NotificationData.length}
                </div>
              </div>
              <div
                className="flex cursor-pointer items-center gap-1"
                onClick={handleShowProfile}
              >
                <span className="text-[1.1rem]">
                  <FaCircleUser />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`home-button absolute top-20 flex cursor-pointer items-center justify-center ${location.pathname !== "/" ? "left-8" : "left-[-100%]"} transition-all duration-700 ease-in-out`}
          onClick={() => navigate("/")}
        >
          <span className="flex flex-col items-center text-xl">
            <TiHome className="text-blue-600" />
            <span className="text-xs font-medium">Home</span>
          </span>
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
