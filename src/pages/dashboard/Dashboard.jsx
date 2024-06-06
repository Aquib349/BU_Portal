import { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../context/RequestContext";
import Modal from "../../Elements/Modal";
import Bookmarks from "./bookmark/Bookmarks";
import MultiLineTextField from "../../form-components/MultiLineTextField";
import MultiChoiceDropdown from "../../form-components/MultiChoiceDropdown";
import AllRequest from "./AllRequests";
import WelcomeScreen from "./WelcomeScreen";
import axios from "axios";
import Pagination from "../../Elements/Pagination";
import LoadingSpinner from "../../Elements/loading spinner/LoadingSpinner";

function Dashboard() {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [ShowSpinner, setShowSpinner] = useState(false);
  const [BookmarkData, setBookmarkData] = useState([]);
  const { RequestData, AllRequestStatus } = useContext(RequestContext);
  const [SearchInput, setSearchInput] = useState("");
  const [FilteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);

  // Function to toggle the modal and apply/remove the class to the body
  const toggleModal = () => {
    setShow(!show);
    if (!show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  function SearchRequests(e) {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    if (inputValue.length === 0) {
      // If search input is empty, show all data
      setFilteredData(RequestData?.SubmittedRequests);
    } else {
      // Filter data based on search input
      const filteredData = RequestData?.SubmittedRequests?.filter((val) =>
        val.RequestTitle?.toLowerCase()?.includes(inputValue)
      );
      setFilteredData(filteredData);
    }
  }

  // function to get all the bookmark contents
  async function getAllBookmarks() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/bookmarks?userId=ThfohBn4`,
        { headers }
      );
      setBookmarkData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    getAllBookmarks();
    setFilteredData(RequestData?.SubmittedRequests);
  }, []);

  return (
    <>
      {ShowSpinner && <LoadingSpinner />}
      {/* {show && (
        <Modal toggleModal={toggleModal} heading="Add Note">
          <div className="add-note pt-4">
            <MultiLineTextField
              title="Notes"
              baseline=""
              name="add_note"
              required="true"
            />
            <MultiChoiceDropdown
              multi={true}
              title="Send Notification to"
              baseline=""
              required="false"
            />
            <div className="btn text-white flex justify-end gap-2 pt-4">
              <button
                type="button"
                className="bg-slate-600 px-8 py-2 text-sm rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 px-8 py-2 text-sm rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      )} */}
      <div className="dashboard-component px-6 no-scrollbar">
        <div className="p-2">
          <div className="pt-2">
            {/* dashboard welcome screen */}
            <WelcomeScreen />

            {/* Submitted contract requests */}
            <AllRequest
              SearchInput={SearchInput}
              SearchRequests={SearchRequests}
              AllRequestStatus={AllRequestStatus}
              FilteredData={FilteredData}
              toggleModal={toggleModal}
              setFilteredData={setFilteredData}
            />

            {/* All Bookmarks */}
            <div className="">
              <div className="px-1 pb-2">
                <h1 className="text-xl font-semibold pt-6">My Bookmarks</h1>
                <p className="text-slate-500 text-sm">
                  Your bookmarked contracts
                </p>
              </div>
              <div className="bg-white rounded shadow-md shadow-black/20 pb-2 border border-slate-200">
                <Pagination
                  itemsPerPage={10}
                  data={BookmarkData}
                  toggleModal={toggleModal}
                  renderComponent={({ data }) => (
                    <Bookmarks
                      BookmarkData={data}
                      getAllBookmarks={getAllBookmarks}
                      setShowSpinner={setShowSpinner}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
