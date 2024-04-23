import { useContext, useState } from "react";
import { RequestContext } from "../../context/RequestContext";
import Modal from "../../Elements/Modal";
import PortalInformation from "./PortalInformation";
import FilterRequests from "./FilterRequests";
import Pagination from "../../Elements/Pagination";
import { Link } from "react-router-dom";

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
      setFilteredData(RequestData);
    } else {
      // Filter data based on search input
      const filteredData = RequestData.filter((val) =>
        val.requests.toLowerCase().includes(inputValue)
      );
      setFilteredData(filteredData);
    }
  }

  return (
    <>
      {show && <Modal toggleModal={toggleModal} heading="Add Note"/>}
      <div className="dashboard-component">
        <div className="border border-black p-2 grid grid-cols-4">
          <div className="col-span-3 border border-red-500 pt-6">
            <div className="flex px-10">
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
              <div className="search-filter grid grid-cols-3 items-center p-2">
                <div className="col-span-2">
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
                <div className="flex justify-end items-center">
                  {/* filter */}
                  <FilterRequests />
                </div>
              </div>
              {/* requests */}
              <Pagination
                FilteredData={FilteredData}
                toggleModal={toggleModal}
                itemsPerPage={10}
              />
            </div>
          </div>

          {/* Portal Information Sidebar */}
          <div className="border border-green-600 p-2">
            <div className="new-request-button">
              <Link to={"newRequest"}>
                <button className="px-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm w-full">
                  Submit a New Request
                </button>
              </Link>
              <PortalInformation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;