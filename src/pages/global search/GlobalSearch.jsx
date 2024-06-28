import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../Elements/Pagination";
import SearchResult from "./SearchResult";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";
import FilterResult from "./FilterResult";

const GlobalSearch = () => {
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
    GlobalFilteredData,
    setGlobalFilteredData,
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
        const filteredData = GlobalSearchData?.filter((val) =>
          val.ContractTitle?.toLowerCase()?.includes(inputValue),
        );
        setGlobalFilteredData(filteredData.length > 0 ? filteredData : []);
      }

      if (DropDownValue === "DocumentName") {
        const filteredData = GlobalSearchData?.filter((val) =>
          val.DocumentName?.toLowerCase()?.includes(inputValue),
        );
        setGlobalFilteredData(filteredData.length > 0 ? filteredData : []);
      }
      if (DropDownValue === "CounterpartyName") {
        const filteredData = GlobalSearchData?.filter((val) =>
          val.DocumentName?.toLowerCase()?.includes(inputValue),
        );
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
      <div className="m-auto w-9/12 p-4 text-sm">
        <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
        <div className="mb-4 flex items-center gap-5">
          <input
            type="search"
            className="w-9/12 rounded border p-2 outline-none focus:ring-2"
            placeholder="Search..."
            value={SearchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-2">
            <span>Sort</span>
            <select
              className="cursor-pointer rounded border p-2 outline-none focus:ring-2"
              value={sort}
              onChange={handleSortChange}
            >
              <option>Recently Updated</option>
              <option>Created Date</option>
              <option>Title(A-Z)</option>
              <option>Title(Z-A)</option>
            </select>
          </div>
          {/* filter global search */}
          <FilterResult
            Data={GlobalSearchData}
            setGlobalFilteredData={setGlobalFilteredData}
          />
        </div>
        {/* search results */}
        <Pagination
          itemsPerPage={10}
          data={GlobalFilteredData}
          renderComponent={({ data }) => (
            <SearchResult results={data || []} DropDownValue={DropDownValue} />
          )}
        />
      </div>
    </>
  );
};

export default GlobalSearch;
