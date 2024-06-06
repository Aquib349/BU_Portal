import React, { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [DropDownName, setDropDownName] = useState("Contract Title");
  const data = [
    { id: 1, name: "Contract Title", value: "ContractTitle" },
    { id: 2, name: "Document Title", value: "DocumentName" },
    { id: 3, name: "Counterparty Name", value: "CounterpartyName" },
  ];
  const { handleGlobalSearch, setDropDownValue, setSearchText, searchText } =
    useContext(GlobalSearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (location.pathname !== "globalSearch") {
      navigate("/globalSearch");
    }

    handleGlobalSearch();
  };

  return (
    <div className="search-box text-sm">
      <form className="w-[600px]" onSubmit={handleSearch}>
        <div className="flex">
          <button
            type="button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center
             text-white rounded-s-3xl bg-blue-500"
            onClick={toggleDropdown}
          >
            {DropDownName}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {showDropdown && (
            <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dropdown-menu mt-12">
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {data.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setDropDownValue(item.value);
                        setDropDownName(item.name);
                        toggleDropdown();
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="text"
              value={searchText}
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-3xl border-s-gray-50 border-s-2
               border border-gray-300 outline-none"
              placeholder="Search Contracts, Documents and Counterparties ..."
              onChange={(e) => setSearchText(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-black rounded-e-lg outline-none"
            >
              <IoSearchSharp className="w-5 h-5 text-blue-600" />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
