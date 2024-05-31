import { CiViewList } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineNoteAdd } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import Modal from "../../../Elements/Modal";
import ContractSummary from "../../contract-summary/ContractSummary";
import axios from "axios";
import PropTypes from "prop-types";
import { UserSubscription } from "../../../context/UserSubscriptionContext";

function ManageBookmarks({
  DeleteBookmark,
  ID,
  setShowSpinner,
  title,
  object,
  FollowAndGetAlerts,
}) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ContractDetails, setContractDetails] = useState({});
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
      },
    },
  ];

  // function to handle the toggle state of modal
  function toggleModal() {
    setShowModal(!showModal);
  }

  // function to get the contract summary
  async function getContractSummary(ID) {
    setShowSpinner(true);

    const headers = {
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    const response = await axios.get(
      `${api}/api/accounts/${account_id}/portal/contractDetails?contractId=${ID}`,
      { headers }
    );
    if (response.status === 200) {
      setShowSpinner(false);
      setShowModal(!showModal);
    }
    console.log(response.data);
    setContractDetails(response.data);
  }

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

  return (
    <>
      {showModal && (
        <Modal
          heading={"Contract Summary"}
          toggleModal={toggleModal}
          set_Width={true}
        >
          <div className="p-2">
            <ContractSummary ContractDetails={ContractDetails} />
          </div>
        </Modal>
      )}
      <div className="relative inline-block text-left" ref={dropdownBookmark}>
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-[4px] bg-white px-3 py-[4px]
                       text-[0.8rem] font-medium hover:bg-gray-50"
            onClick={() => setShow(!show)}
          >
            <BsThreeDotsVertical />
          </button>
        </div>
        <div
          className={`absolute right-4 z-10 mt-2 w-60 origin-top-right rounded-md bg-white border border-slate-400
       ${show ? "static" : "hidden"}`}
        >
          <div className="py-1">
            {list.map((val) => (
              <div
                key={val.id}
                className="flex items-center gap-1 hover:bg-slate-100 px-4 cursor-pointer"
                onClick={val.click}
              >
                <span>{val.icon}</span>
                <span className="block p-2 text-sm">{val.name}</span>
              </div>
            ))}
          </div>
        </div>
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
