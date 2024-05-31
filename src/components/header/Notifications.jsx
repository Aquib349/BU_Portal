import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { differenceInMonths, parseISO } from "date-fns";
import { UserSubscription } from "../../context/UserSubscriptionContext";
import { FaEyeSlash } from "react-icons/fa";

function Notification({ showModal, setShowModal, NotificationData }) {
  const handleDrawerClose = () => setShowModal(false);
  const [Active, setActive] = useState("unread");
  const { userSub } = useContext(UserSubscription);
  const now = new Date();

  useEffect(() => {
    // Prevent scrolling when the modal is open
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal, userSub]);

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-30 bg-black/70 bg-opacity-50  transition-opacity"
          onClick={handleDrawerClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        id="drawer-right-example"
        className={`fixed top-0 right-0 z-40 w-[25rem] transition-transform
         duration-300 ease-in-out ${
           showModal ? "translate-x-0" : "translate-x-full"
         }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div className="p-2 bg-slate-100 fixed w-full top-0">
          <h5
            id="drawer-right-label"
            className="inline-flex items-center mb-2 pt-2 text-base font-semibold"
          >
            Alerts
          </h5>
          <button
            type="button"
            onClick={handleDrawerClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute
           top-2.5 right-2.5 inline-flex items-center justify-center"
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>
        <div className="fixed w-full top-14">
          <div className="text-sm grid grid-cols-2 items-center text-center">
            <span
              className={`rounded-sm cursor-pointer font-medium py-1 border ${
                Active === "unread"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-500 bg-white"
              }`}
              onClick={() => setActive("unread")}
            >
              Unread
            </span>
            <span
              className={`py-1 cursor-pointer font-medium border ${
                Active === "contracts"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-500 bg-white"
              }`}
              onClick={() => setActive("contracts")}
            >
              Contracts | Follow
            </span>
          </div>
          <div className="no-scrollbar h-screen overflow-y-auto bg-white">
            {NotificationData.map((val) => {
              const monthsAgo = differenceInMonths(
                now,
                parseISO(val.NotificationDate)
              );
              const displayText =
                monthsAgo === 0 ? "a month ago" : `${monthsAgo} months ago`;
              return (
                <div
                  key={val.RowKey}
                  className={`leading-5 border-b border-slate-200 py-2 px-3 mb-2 mt-2 cursor-pointer text-sm ${
                    Active === "unread" ? "static" : "hidden"
                  }`}
                >
                  <p>
                    {val.NotificationTitle.slice(0, 40)}
                    ...
                  </p>
                  <small className="text-slate-500 text-[0.8rem]">
                    {displayText}
                  </small>
                </div>
              );
            })}
            {userSub.map((val) => (
              <div
                key={val.RowKey}
                className={`flex justify-between border-b border-slate-200 py-2 px-3 mb-2 mt-2 cursor-pointer text-sm ${
                  Active === "contracts" ? "static" : "hidden"
                }`}
              >
                <p>
                  {val.Title.slice(0, 40)}
                  ...
                </p>
                <span>
                  <FaEyeSlash />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Notification.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  NotificationData: PropTypes.array,
};

export default Notification;
