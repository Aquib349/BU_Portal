import PropTypes from "prop-types";
import Requests from "./requests/Requests";
import Pagination from "../../Elements/Pagination";
import StatusAnalysis from "./requests/StatusAnalysis";
import FilterRequests from "./requests/FilterRequests";
import { TbCirclesRelation } from "react-icons/tb";
import { Link } from "react-router-dom";

function AllRequest({
  SearchInput,
  SearchRequests,
  AllRequestStatus,
  FilteredData,
  toggleModal,
  setFilteredData,
}) {
  return (
    <>
      <div className="AllRequest-component">
        <div className="px-1 pb-2">
          <h1 className="text-xl font-semibold">My Requests</h1>
          <p className="text-slate-500 text-sm">
            Your submitted contract request
          </p>
        </div>
        <div className="requests bg-white pt-2 rounded-sm shadow-md shadow-black/20 pb-2 border border-slate-200">
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
              <FilterRequests setFilteredData={setFilteredData} />
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
          <div className="grid grid-cols-5 gap-x-2 p-2">
            <div className="border border-slate-400 rounded px-2 pt-5">
              <StatusAnalysis data={AllRequestStatus} />
            </div>
            <div className="col-span-4 border border-slate-400 rounded py-2">
              <div className="flex gap-8 px-2 pb-1">
                <div className="flex items-center gap-2">
                  <div className="text-blue-600 text-2xl">
                    <TbCirclesRelation />
                  </div>
                  <small className="text-md font-semibold">
                    Related Contracts
                  </small>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <img
                      src="/assets/contract-icon.png"
                      alt="agreement"
                      className="w-4"
                    />
                  </div>
                  <small className="text-md font-semibold">
                    Created Contracts
                  </small>
                </div>
              </div>
              {/* requests */}
              <Pagination
                data={FilteredData}
                toggleModal={toggleModal}
                itemsPerPage={8}
                renderComponent={({ data, toggleModal }) => (
                  <Requests currentItems={data} toggleModal={toggleModal} />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AllRequest.propTypes = {
  SearchInput: PropTypes.string,
  SearchRequests: PropTypes.func,
  AllRequestStatus: PropTypes.array,
  RequestData: PropTypes.object,
  FilteredData: PropTypes.array,
  toggleModal: PropTypes.func,
  setFilteredData: PropTypes.func,
};

export default AllRequest;
