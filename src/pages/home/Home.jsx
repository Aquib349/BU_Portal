import { CiFilter } from "react-icons/ci";
import Requests from "./Requests";
import { useContext, useState } from "react";
import { RequestContext } from "../../context/RequestContext";

function Home() {
  const { RequestData } = useContext(RequestContext);
  const [SearchInput, setSearchInput] = useState("");
  const [FilteredData, setFilteredData] = useState([]);

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
      <div className="Home-component">
        <div className="main w-9/12 border border-black px-14 pt-6">
          <div className="flex">
            <div>
              <h1 className="text-3xl heading">Welcome to the eContracts Portal !</h1>
              <p className="py-4 text-[0.8rem] pr-2">
                This portal allows you to request preparation or review of
                contracts or related documents. To begin a new request, please
                click on the blue “Submit a New Request” button in the top right
                corner. You may also see your previously submitted contract
                requests under “My Requests” below.
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
          <div className="requests bg-white mt-8 rounded-sm shadow-sm shadow-black/20">
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
              <div className="text-3xl text-blue-600 font-bold flex justify-end">
                <CiFilter className="border border-slate-400 rounded-md p-1 cursor-pointer bg-gray-50" />
              </div>
            </div>
            <Requests FilteredData={FilteredData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
