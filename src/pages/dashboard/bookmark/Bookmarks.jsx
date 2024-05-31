import { GoBookmarkFill } from "react-icons/go";
import ManageBookmarks from "./ManageBookmarks";
import PropTypes from "prop-types";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import { UserSubscription } from "../../../context/UserSubscriptionContext";
import Tooltip from "../../../Elements/Tooltip";

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
  const { getUserSubscription } = useContext(UserSubscription);

  const handleRequest = async (
    request,
    successMessage,
    errorMessage,
    callback
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
      getAllBookmarks
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
          { headers }
        ),
      "You will now be notified in case any Renewals or Expirations happen to this Contract",
      "Failed to follow.",
      getUserSubscription
    );
  };

  return (
    <>
      <div className="bookmark-component">
        <div className="main">
          <div className="requests">
            <div className="bookmark-content">
              {BookmarkData.map((val) => (
                <div
                  key={val.RowKey}
                  className="flex justify-between items-center p-2"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl text-slate-600 cursor-pointer">
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
                    <span className="text-sm">{val.Title}</span>
                  </div>
                  <ManageBookmarks
                    ID={val.ObjectID}
                    title={val.Title}
                    object={val.Object}
                    DeleteBookmark={DeleteBookmark}
                    setShowSpinner={setShowSpinner}
                    FollowAndGetAlerts={FollowAndGetAlerts}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

Bookmarks.propTypes = {
  BookmarkData: PropTypes.array.isRequired,
  getAllBookmarks: PropTypes.func.isRequired,
  setShowSpinner: PropTypes.func.isRequired,
};

export default Bookmarks;
