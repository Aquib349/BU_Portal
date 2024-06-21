import { CiViewList } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineNoteAdd } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { UserSubscription } from "../../../context/UserSubscriptionContext";
import AddNote from "./Add contract note/AddNote";
import { motion, AnimatePresence } from "framer-motion";

function ManageBookmarks({
  DeleteBookmark,
  ID,
  title,
  object,
  FollowAndGetAlerts,
  getContractSummary,
  ContractID,
  setContractID,
}) {
  const [show, setShow] = useState(false);
  const [AddNoteModal, setAddNoteModal] = useState(false);
  const dropdownBookmark = useRef(null);
  const { userSub } = useContext(UserSubscription);
  const [followed, setFollowed] = useState(false);
  const list = [
    {
      id: 1,
      name: "View Summary",
      icon: <CiViewList />,
      click: () => {
        setShow(!show);
        getContractSummary(ID);
        setContractID(ID);
      },
    },
    {
      id: 2,
      name: "Remove Bookmark",
      icon: <CiBookmark />,
      click: () => {
        setShow(!show);
        DeleteBookmark(ID);
      },
    },
    followed
      ? {
          id: 5,
          name: "UnFollow",
          icon: <FaEyeSlash />,
          click: () => {
            setShow(!show);
          },
        }
      : {
          id: 3,
          name: "Follow / Get Alerts",
          icon: <IoEyeOutline />,
          click: () => {
            setShow(!show);
            FollowAndGetAlerts(title, object, ID);
          },
        },
    {
      id: 4,
      name: "Add a Note",
      icon: <MdOutlineNoteAdd />,
      click: () => {
        setShow(!show);
        setAddNoteModal(!AddNoteModal);
        setContractID(ID);
      },
    },
  ];

  useEffect(() => {
    const closeDropdown = (event) => {
      if (
        dropdownBookmark.current &&
        !dropdownBookmark.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  useEffect(() => {
    for (const { ObjectId } of userSub) {
      if (ID === ObjectId) {
        setFollowed(true);
      }
    }
  }, [ID, userSub]);

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* add note modal */}
      <AddNote
        AddNoteModal={AddNoteModal}
        setAddNoteModal={setAddNoteModal}
        ContractID={ContractID}
      />
      <div className="relative inline-block text-left" ref={dropdownBookmark}>
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-[4px] bg-white px-3 py-[4px] text-[0.8rem] font-medium hover:bg-gray-50"
            onClick={() => setShow(!show)}
          >
            <BsThreeDotsVertical />
          </button>
        </div>
        <AnimatePresence>
          {show && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={dropdownVariants}
              className="absolute right-4 z-10 mt-2 w-60 origin-top-right rounded-md border border-slate-400 bg-white shadow-md"
            >
              <div className="py-1">
                {list.map((val) => (
                  <div
                    key={val.id}
                    className="flex cursor-pointer items-center gap-1 px-4 hover:bg-slate-200"
                    onClick={val.click}
                  >
                    <span>{val.icon}</span>
                    <span className="block p-2 text-sm">{val.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

ManageBookmarks.propTypes = {
  DeleteBookmark: PropTypes.func,
  ID: PropTypes.string,
  setShowSpinner: PropTypes.func,
  title: PropTypes.string,
  object: PropTypes.string,
  FollowAndGetAlerts: PropTypes.func,
};

export default ManageBookmarks;
