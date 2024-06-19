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
  setShowSpinner,
}) {
  return (
    <>
      <div className="AllRequest-component">
        <div className="px-1 pb-2">
          <h1 className="text-xl font-semibold">My Requests</h1>
          <p className="text-sm text-slate-500">
            Your submitted contract request
          </p>
        </div>
        <div className="requests rounded-sm border border-slate-200 bg-white pb-2 pt-2 shadow-md shadow-black/20">
          <div className="search-filter grid grid-cols-6 items-center gap-2 p-2">
            <div className="col-span-4">
              <input
                type="search"
                name="search"
                value={SearchInput}
                id="search-request"
                placeholder="Search"
                className="w-full rounded-md border border-slate-400 bg-gray-50 p-2 text-sm outline-blue-400"
                onChange={SearchRequests}
              />
            </div>
            <div className="flex cursor-pointer items-center justify-center rounded-md border border-slate-400 bg-gray-50 p-2">
              {/* filter */}
              <FilterRequests setFilteredData={setFilteredData} />
            </div>
            <div className="">
              <Link to={"newRequest"}>
                <button className="w-full rounded-md border border-blue-500 px-0 py-2 text-sm hover:bg-blue-600 hover:text-white">
                  + New Request
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-x-2 p-2">
            <div className="rounded border border-slate-400 px-2 pt-5">
              <StatusAnalysis data={AllRequestStatus} />
            </div>
            <div className="col-span-4 rounded border border-slate-400 py-2">
              <div className="flex gap-8 px-2 pb-1">
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-blue-600">
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
                  <Requests
                    currentItems={data}
                    toggleModal={toggleModal}
                    setShowSpinner={setShowSpinner}
                  />
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
