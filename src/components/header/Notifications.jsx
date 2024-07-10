import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { UserSubscription } from "../../context/UserSubscriptionContext";
import { FaEyeSlash } from "react-icons/fa";
import { UnSubscribe } from "../../constants/UnSubscribe";

function Notification({ showModal, setShowModal, NotificationData }) {
  const handleDrawerClose = () => setShowModal(false);
  const [Active, setActive] = useState("unread");
  const { userSub, getUserSubscription } = useContext(UserSubscription);

  // function to unscribe the contracts
  async function handleUnSubscribe(id) {
    const res = UnSubscribe(id);
    res.then((result) => {
      if (result === "Deleted") {
        getUserSubscription();
      }
    });
  }

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
          className="fixed inset-0 z-30 bg-black/70 bg-opacity-50 transition-opacity"
          onClick={handleDrawerClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        id="drawer-right-example"
        className={`fixed right-0 top-0 z-40 w-[25rem] transition-transform duration-300 ease-in-out ${
          showModal ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div className="fixed top-0 w-full bg-slate-100 p-2">
          <h5
            id="drawer-right-label"
            className="mb-2 inline-flex items-center pt-2 text-base font-semibold"
          >
            Alerts
          </h5>
          <button
            type="button"
            onClick={handleDrawerClose}
            className="absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>
        <div className="fixed top-14 w-full">
          <div className="grid grid-cols-2 items-center text-center text-sm">
            <span
              className={`cursor-pointer rounded-sm border py-1 font-medium ${
                Active === "unread"
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-500 bg-white"
              }`}
              onClick={() => setActive("unread")}
            >
              Unread
            </span>
            <span
              className={`cursor-pointer border py-1 font-medium ${
                Active === "contracts"
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-500 bg-white"
              }`}
              onClick={() => setActive("contracts")}
            >
              Contracts | Follow
            </span>
          </div>
          <div className="no-scrollbar h-screen overflow-y-auto bg-white">
            {NotificationData.map((val) => {
              const parsedDate = parseISO(val.NotificationDate);
              const timeAgo = formatDistanceToNow(parsedDate, {
                addSuffix: true,
              });
              return (
                <div
                  key={val.RowKey}
                  className={`mb-2 mt-2 cursor-pointer border-b border-slate-200 px-3 py-2 text-sm leading-5 ${
                    Active === "unread" ? "static" : "hidden"
                  }`}
                >
                  <p>
                    {val.NotificationTitle.slice(0, 40)}
                    ...
                  </p>
                  <small className="text-[0.8rem] text-blue-500">
                    {timeAgo}
                  </small>
                </div>
              );
            })}
            {userSub.map((val) => (
              <div
                key={val.RowKey}
                className={`mb-2 mt-2 flex cursor-pointer justify-between border-b border-slate-200 px-3 py-2 text-sm ${
                  Active === "contracts" ? "static" : "hidden"
                }`}
              >
                <p>
                  {val.Title.slice(0, 40)}
                  ...
                </p>
                <span>
                  <FaEyeSlash onClick={() => handleUnSubscribe(val.RowKey)} />
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
