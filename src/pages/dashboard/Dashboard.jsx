import { useContext, useState } from "react";
import { RequestContext } from "../../context/RequestContext";
import Modal from "../../Elements/Modal";
import PortalInformation from "./PortalInformation";
import FilterRequests from "./requests/FilterRequests";
import Pagination from "../../Elements/Pagination";
import { Link } from "react-router-dom";
import Bookmarks from "./bookmark/Bookmarks";
import MultiLineTextField from "../../form-components/MultiLineTextField";
// import Tooltip from "../../Elements/Tooltip";
// import { CiCircleInfo } from "react-icons/ci";
import MultiChoiceDropdown from "../../form-components/MultiChoiceDropdown";
import Requests from "./requests/Requests";

function Dashboard() {
  const { RequestData } = useContext(RequestContext);
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
    const inputValue = e.target.value.toLowerCase(); // Convert input to lowercase
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

  return (
    <>
      {show && (
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
      )}
      <div className="dashboard-component px-14">
        <div className="p-2 grid grid-cols-4">
          <div className="col-span-3 pt-6">
            <div className="flex px-1">
              <div>
                <h1 className="text-3xl heading">
                  Welcome to the eContracts Portal !
                </h1>
                <p className="py-4 text-[0.8rem] pr-2">
                  This portal allows you to request preparation or review of
                  contracts or related documents. To begin a new request, please
                  click on the blue “Submit a New Request” button in the top
                  right corner. You may also see your previously submitted
                  contract requests under “My Requests” below.
                </p>
              </div>
              <div>
                <img
                  src="https://app-otbt-econ-test.azurewebsites.net/Content/BUPortal/Images/welcome_bg.svg"
                  alt="image"
                  className="w-[350px]"
                />
              </div>
            </div>

            {/* Submitted contract requests */}
            <div className="requests bg-white mt-8 rounded-sm shadow-sm shadow-black/20 pb-2">
              <div className="py-2 px-3 border-b border-slate-300">
                <h1 className="text-xl">My Requests</h1>
                <p className="text-slate-500 text-[0.8rem]">
                  Your submitted contract request
                </p>
              </div>
              <div className="search-filter grid grid-cols-6 gap-2 items-center p-2">
                <div className="col-span-4">
                  <input
                    type="search"
                    name="search"
                    value={SearchInput}
                    id="search-request"
                    placeholder="Search"
                    className="border border-slate-400 p-2 rounded-md w-full outline-blue-400 text-sm bg-gray-50"
                    onChange={SearchRequests}
                  />
                </div>
                <div
                  className="flex justify-center items-center border border-slate-400 rounded-md cursor-pointer
                 bg-gray-50 p-2"
                >
                  {/* filter */}
                  <FilterRequests />
                </div>
                <div className="">
                  <Link to={"newRequest"}>
                    <button
                      className="py-2 px-0 border border-blue-500 hover:bg-blue-600 hover:text-white 
                    rounded-md text-sm w-full"
                    >
                      + New Request
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex gap-8 p-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 border-2 border-red-400 rounded-sm"></div>
                  <small className="text-red-600">Related Contracts</small>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 border-2 border-blue-400 rounded-sm"></div>
                  <small className="text-blue-600">Created Contracts</small>
                </div>
              </div>
              {/* requests */}
              <Pagination
                RequestData={RequestData}
                data={
                  FilteredData?.length > 0
                    ? FilteredData
                    : RequestData?.SubmittedRequests
                }
                toggleModal={toggleModal}
                itemsPerPage={10}
                renderComponent={({ data, toggleModal }) => (
                  <Requests currentItems={data} toggleModal={toggleModal} />
                )}
              />
            </div>

            {/* All Bookmarks */}
            <Bookmarks />
          </div>

          {/* Portal Information Sidebar */}
          <div className="p-2">
            <PortalInformation />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
