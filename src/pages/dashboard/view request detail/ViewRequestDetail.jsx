import { useParams } from "react-router-dom";
import useRequestDetail from "../../../customhooks/useRequestDetail";
import Tooltip from "../../../Elements/Tooltip";
import RelatedDocuments from "./RelatedDocuments";
import { CiCircleInfo } from "react-icons/ci";
import { TbCirclesRelation } from "react-icons/tb";
import useXmlConverter from "../../../customhooks/useXmlConverter";
import { useContext, useEffect, useState } from "react";
import usePortalConfig from "../../../customhooks/usePortalConfig";
import axios from "axios";
import ViewStatusUpdates from "./ViewStatusUpdate";
import SingleRequestDetails from "./SingleRequestDetails";
import RequestDetailShimmer from "../../../shimmer/RequestDetailShimmer";
import Modal from "../../../Elements/Modal";
import { StatusContext } from "../../../context/StatusContext";
import Select from "react-select";
import { UserContext } from "../../../context/UserContext";

function ViewRequestDetail() {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const headers = {
    "Content-Type": "application/json",
    "eContracts-ApiKey":
      "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
  };

  const [Data, setData] = useState({});
  const [StatusUpdates, setStatusUpdates] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [Status, setStatus] = useState(null);
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [post, setPost] = useState("");
  const { AllStatus } = useContext(StatusContext);
  const { AllUser } = useContext(UserContext);

  const { RowKey } = useParams();
  const { showStatus } = usePortalConfig();
  const { SingleRequestData } = useRequestDetail(RowKey);
  const jsonResult = useXmlConverter(SingleRequestData);

  // functions to get the status updates of the single requests !!
  async function getStatusUpdates() {
    const response = await axios.get(
      `${api}/api/accounts/${account_id}/Requests/${RowKey}/statusPosts`,
      { headers },
    );
    setStatusUpdates(response.data);
  }

  useEffect(() => {
    if (jsonResult != "") {
      setData(JSON.parse(jsonResult));
      setStatus({
        value: JSON.parse(jsonResult)?.Metadata?.Status?._text?.toLowerCase(),
        label: JSON.parse(jsonResult)?.Metadata?.Status?._text,
      });
    }
    getStatusUpdates();
  }, [jsonResult]);

  // function to handle toggle modal
  function toggleModal() {
    setShowModal(!showModal);
  }

  // function to set user
  const handleChange = (selectedOption) => {
    let concatenatedLabels = "";
    if (selectedOption.length > 1) {
      concatenatedLabels = selectedOption
        ? selectedOption.map((option) => option.label).join(";")
        : "";
      console.log(concatenatedLabels);
      setUserSelectedOption(selectedOption);
      setSelectedUser(concatenatedLabels);
    } else {
      concatenatedLabels = selectedOption
        ? selectedOption.map((option) => option.label)
        : "";
      setUserSelectedOption(selectedOption);
      setSelectedUser(concatenatedLabels[0]);
    }
  };

  async function handleUpdateStatus() {
    // check wether selected status is same as previous one
    if (Data?.Metadata?.Status?._text !== Status.label) {
      try {
        const config = {
          headers: headers,
          processData: false,
        };
        const response = await axios.put(
          `${api}/api/accounts/${account_id}/Requests/changerequeststatus?requestid=${RowKey}&status=${Status.label}`,
          {},
          config,
        );
      } catch (error) {
        console.log(error);
      }
    }

    // update a post
    try {
      let statusPost = {};
      statusPost.ObjectId = RowKey;
      statusPost.Object = "Request";
      statusPost.Post = post;
      statusPost.ModifiedBy = localStorage.getItem("username");
      statusPost.CurrentStatus = Status.label;
      statusPost.PreviousStatus = Data?.Metadata?.Status?._text;
      statusPost.PartitionKey = account_id;
      statusPost.CCUsers = selectedUser;
      statusPost.CreatedBy = localStorage.getItem("username");
      statusPost.ModifiedBy = localStorage.getItem("username");
      // console.log(statusPost);

      const response = await axios.post(
        `${api}/api/accounts/${account_id}/statusPosts`,
        statusPost,
        { headers },
      );
      if (response) {
        getStatusUpdates();
        setShowModal(!showModal);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!showStatus) {
    return (
      <>
        <RequestDetailShimmer />
      </>
    );
  }

  return (
    <>
      {showModal && (
        <Modal
          heading={"Change Status / Post an Update"}
          set_Width={false}
          toggleModal={toggleModal}
        >
          <div className="py-2 text-sm">
            <div className="flex flex-col">
              <label>Status</label>
              <Select value={Status} onChange={setStatus} options={AllStatus} />
            </div>
            <div className="flex flex-col py-3">
              <label>Post an update (250 char max)</label>
              <textarea
                id="myTextarea"
                maxLength="250"
                rows="4"
                cols="50"
                className="rounded border border-slate-300 p-2 outline-blue-400"
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label>Notify User(s)</label>
              <Select
                value={userSelectedOption}
                onChange={handleChange}
                options={AllUser}
                isMulti={true}
              />
            </div>
            <div className="btn flex justify-end gap-2 pt-4 text-white">
              <button
                type="button"
                className="rounded-md bg-slate-600 px-8 py-2 text-sm"
                onClick={() => setShowModal(!showModal)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-blue-500 px-8 py-2 text-sm"
                onClick={handleUpdateStatus}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div
        className={`request-detail-component m-auto grid w-9/12 grid-cols-5 gap-x-2`}
      >
        <div
          className={`main my-2 ${showStatus ? "col-span-3" : "col-span-4"}`}
        >
          <SingleRequestDetails Data={Data} RowKey={RowKey} />
          <hr />

          {/* All the related documents */}
          <div className="my-1 rounded border bg-white p-2 shadow-sm">
            <RelatedDocuments
              status={Data?.Metadata?.Status?._text}
              RowKey={RowKey}
            />
          </div>

          {/* All the related contracts */}
          <div className="my-1 rounded border bg-white p-2 shadow-sm">
            <div className="flex items-center text-lg">
              <h1 className="font-semibold">Related Contracts</h1>
              <div className="mb-1">
                <Tooltip
                  header={<CiCircleInfo />}
                  message="New Contracts which are related to this request or created from this request"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 px-2 pt-2">
              <span
                className={`${
                  Data?.Metadata?.RelatedContracts?._text ? "static" : "hidden"
                } text-blue-600`}
              >
                <TbCirclesRelation />
              </span>
              <p className="text-sm">
                {Data?.Metadata?.RelatedContracts?._text}
              </p>
            </div>
          </div>
        </div>

        {showStatus && (
          <div className="col-span-2 my-2 bg-white p-4 shadow-sm">
            <ViewStatusUpdates
              setShowModal={setShowModal}
              UpdateStatus={Data?.Metadata?.Status?._text}
              StatusUpdates={StatusUpdates}
              status={
                StatusUpdates.length === 0 ? Data?.Metadata?.Status?._text : {}
              }
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ViewRequestDetail;
