import React, { useContext, useEffect, useState } from "react";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";
import Pagination from "../../Elements/Pagination";
import SearchResult from "./SearchResult";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [GlobalData, setGlobalData] = useState([]);
  const {
    setSort,
    sort,
    GlobalSearchData,
    DataLoading,
    DropDownValue,
    handleGlobalSearch,
  } = useContext(GlobalSearchContext);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => {
    setSort(e.target.value);
    handleGlobalSearch(e);
  };

  if (DataLoading) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    setGlobalData(GlobalSearchData);
  }, [GlobalSearchData]);

  return (
    <>
      <div className="p-4 w-9/12 m-auto text-sm">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <div className="flex items-center gap-5 mb-4">
          <input
            type="search"
            className="border rounded p-2 w-9/12 focus:ring-2 outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-2">
            <span>Sort</span>
            <select
              className="border rounded p-2 cursor-pointer outline-none focus:ring-2"
              value={sort}
              onChange={handleSortChange}
            >
              <option>Recently Updated</option>
              <option>Created Date</option>
              <option>Title(A-Z)</option>
              <option>Title(Z-A)</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-gray-200 p-2 rounded focus:ring-2"
          >
            <HiMiniAdjustmentsVertical />
          </button>
        </div>
        {/* search results */}
        <Pagination
          itemsPerPage={10}
          data={
            DropDownValue === "ContractTitle"
              ? GlobalData.ContractSearch
              : DropDownValue === "DocumentName"
              ? GlobalData.DocumentSearch
              : DropDownValue === "CounterpartyName"
              ? GlobalData.CounterpartyName
              : []
          }
          renderComponent={({ data }) => (
            <SearchResult results={data || []} DropDownValue={DropDownValue} />
          )}
        />
      </div>
    </>
  );
};

export default GlobalSearch;
