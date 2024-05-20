import PropTypes from "prop-types";
import Requests from "./requests/Requests";
import Pagination from "../../Elements/Pagination";
import StatusAnalysis from "./requests/StatusAnalysis";
import FilterRequests from "./requests/FilterRequests";
import { Link } from "react-router-dom";

function AllRequest({
  SearchInput,
  SearchRequests,
  AllRequestStatus,
  RequestData,
  FilteredData,
  toggleModal,
}) {
  return (
    <>
      <div className="AllRequest-component">
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
          <div className="grid grid-cols-5 gap-x-2 p-2">
            <div className="border border-slate-400 rounded px-2 pt-5">
              <StatusAnalysis data={AllRequestStatus} />
            </div>
            <div className="col-span-4 border border-slate-400 rounded p-2">
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
  SearchInput: PropTypes.string.isRequired,
  SearchRequests: PropTypes.func.isRequired,
  AllRequestStatus: PropTypes.array.isRequired,
  RequestData: PropTypes.array.isRequired,
  FilteredData: PropTypes.array.isRequired,
  toggleModal: PropTypes.bool.isRequired,
};

export default AllRequest;
