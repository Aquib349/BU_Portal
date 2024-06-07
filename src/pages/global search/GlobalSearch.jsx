import React, { useContext, useEffect, useState } from "react";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";
import Pagination from "../../Elements/Pagination";
import SearchResult from "./SearchResult";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";

const GlobalSearch = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [GlobalFilteredData, setGlobalFilteredData] = useState([]);
  const {
    setSort,
    sort,
    GlobalSearchData,
    DropDownValue,
    handleGlobalSearch,
    SearchQuery,
    setSearchText,
    setSearchQuery,
    searchText,
  } = useContext(GlobalSearchContext);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchQuery(inputValue);

    if (inputValue.length === 0) {
      // If search input is empty, show all data
      setGlobalFilteredData(GlobalSearchData);
    } else {
      // Filter data based on search input
      if (DropDownValue === "ContractTitle") {
        const filteredData = GlobalSearchData.ContractSearch?.filter((val) =>
          val.ContractTitle?.toLowerCase()?.includes(inputValue)
        );
        setGlobalFilteredData(filteredData.length > 0 ? filteredData : []);
      }

      if (DropDownValue === "DocumentName") {
        const filteredData = GlobalSearchData.DocumentSearch?.filter((val) =>
          val.DocumentName?.toLowerCase()?.includes(inputValue)
        );
        setGlobalFilteredData(filteredData.length > 0 ? filteredData : []);
      }
      if (DropDownValue === "CounterpartyName") {
        const filteredData = GlobalSearchData.CounterpartySearch?.filter(
          (val) => val.DocumentName?.toLowerCase()?.includes(inputValue)
        );
        console.log(filteredData);
        setGlobalFilteredData(filteredData.length > 0 ? filteredData : []);
      }
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    handleGlobalSearch();
  }, [sort]);

  return (
    <>
      <div className="p-4 w-9/12 m-auto text-sm">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <div className="flex items-center gap-5 mb-4">
          <input
            type="search"
            className="border rounded p-2 w-9/12 focus:ring-2 outline-none"
            placeholder="Search..."
            value={SearchQuery}
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
            GlobalFilteredData.length > 0
              ? GlobalFilteredData
              : DropDownValue === "ContractTitle"
              ? GlobalSearchData.ContractSearch
              : DropDownValue === "DocumentName"
              ? GlobalSearchData.DocumentSearch
              : DropDownValue === "CounterpartyName"
              ? GlobalSearchData.CounterpartySearch
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
