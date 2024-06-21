import { GoBookmarkFill } from "react-icons/go";
import ManageBookmarks from "./ManageBookmarks";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { UserSubscription } from "../../../context/UserSubscriptionContext";
import Tooltip from "../../../Elements/Tooltip";
import ContractSummary from "./contract-summary/ContractSummary";
import Modal from "../../../Elements/Modal";

const headers = {
  "eContracts-ApiKey":
    "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
};

const toastOptions = {
  position: "top-center",
  style: {
    backgroundColor: "black",
    color: "white",
    fontSize: "0.8rem",
  },
};

const errorToastOptions = {
  position: "bottom-left",
  style: {
    backgroundColor: "red",
    color: "white",
    fontSize: "0.8rem",
  },
};

const Bookmarks = ({ BookmarkData, getAllBookmarks, setShowSpinner }) => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [loading, setLoading] = useState(true);
  const [ContractDetails, setContractDetails] = useState({});
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [ContractID, setContractID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { getUserSubscription } = useContext(UserSubscription);

  const handleRequest = async (
    request,
    successMessage,
    errorMessage,
    callback,
  ) => {
    let toastId;

    if (loading) {
      toastId = toast.loading("Processing...", toastOptions);
    }

    try {
      const response = await request();
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        callback();
        toast.success(successMessage, { ...toastOptions, duration: 1200 });
      }
    } catch (error) {
      console.error(errorMessage, error);
      toast.error(errorMessage, errorToastOptions);
    } finally {
      if (toastId) {
        toast.dismiss(toastId);
      }
      setLoading(true);
    }
  };

  const DeleteBookmark = async (id) => {
    await handleRequest(
      () =>
        axios.delete(`${api}/api/accounts/${account_id}/portal/bookmark`, {
          headers,
          params: { id, userId: "ThfohBn4" },
        }),
      "Bookmark removed successfully",
      "Failed to delete bookmark.",
      getAllBookmarks,
    );
  };

  const FollowAndGetAlerts = async (title, object, objectId) => {
    const body = {
      Title: title,
      Object: object,
      ObjectId: objectId,
      UserName: "Santosh Dutta",
      UserEmailId: "santoshdutta@econtracts.onmicrosoft.com",
    };

    await handleRequest(
      () =>
        axios.post(
          `${api}/api/accounts/${account_id}/portal/subscription`,
          body,
          { headers },
        ),
      "You will now be notified in case any Renewals or Expirations happen to this Contract",
      "Failed to follow.",
      getUserSubscription,
    );
  };

  // function to get the contract summary
  async function getContractSummary(ID) {
    setShowSpinner(true);
    setLoadingNotes(true);

    const headers = {
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    const response = await axios.get(
      `${api}/api/accounts/${account_id}/portal/contractDetails?contractId=${ID}`,
      { headers },
    );
    if (response.status === 200) {
      setShowSpinner(false);
      setShowModal(true);
      setLoadingNotes(false);
    }
    setContractDetails(response.data);
  }

  // function to handle the toggle state of modal
  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      {showModal && (
        <Modal
          heading={"Contract Summary"}
          toggleModal={toggleModal}
          set_Width={true}
        >
          <div className="p-2">
            <ContractSummary
              ContractDetails={ContractDetails}
              ContractID={ContractID}
              getContractSummary={getContractSummary}
              loading={loadingNotes}
            />
          </div>
        </Modal>
      )}
      <div className="bookmark-component">
        <div className="main">
          <div className="requests">
            <div className="bookmark-content">
              {BookmarkData.map((val) => (
                <div
                  key={val.RowKey}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex items-center gap-4">
                    <span className="cursor-pointer text-xl text-slate-600">
                      <Tooltip
                        message="Remove Bookmark"
                        header={
                          <GoBookmarkFill
                            onClick={() => DeleteBookmark(val.ObjectID)}
                          />
                        }
                      />
                    </span>
                    <div>
                      <img
                        src="/assets/contract-icon.png"
                        alt="agreement"
                        className="w-3"
                      />
                    </div>
                    <span
                      className="cursor-pointer text-sm transition-all duration-300 ease-in-out hover:scale-105 hover:font-semibold hover:text-blue-600"
                      onClick={() => {
                        setContractID(val.ObjectID);
                        getContractSummary(val.ObjectID);
                      }}
                    >
                      {val.Title}
                    </span>
                  </div>
                  <ManageBookmarks
                    ID={val.ObjectID}
                    title={val.Title}
                    object={val.Object}
                    DeleteBookmark={DeleteBookmark}
                    FollowAndGetAlerts={FollowAndGetAlerts}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    getContractSummary={getContractSummary}
                    ContractID={ContractID}
                    setContractID={setContractID}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Bookmarks.propTypes = {
  BookmarkData: PropTypes.array.isRequired,
  getAllBookmarks: PropTypes.func.isRequired,
  setShowSpinner: PropTypes.func.isRequired,
};

export default Bookmarks;
