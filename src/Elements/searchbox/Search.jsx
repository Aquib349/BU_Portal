import React, { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [DropDownName, setDropDownName] = useState("Contract Title");
  const data = [
    { id: 1, name: "Contract Title", value: "ContractTitle" },
    { id: 2, name: "Document Title", value: "DocumentName" },
    { id: 3, name: "Counterparty Name", value: "CounterpartyName" },
  ];
  const {
    handleGlobalSearch,
    setDropDownValue,
    setSearchText,
    searchText,
    setSearchQuery,
  } = useContext(GlobalSearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (location.pathname !== "/globalSearch") {
      navigate("/globalSearch");
    }
    setSearchQuery(searchText);
    setSearchText("");
    handleGlobalSearch();
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="search-box text-sm">
      <form className="w-[600px]" onSubmit={handleSearch}>
        <div className="relative flex">
          <button
            type="button"
            className="z-10 inline-flex flex-shrink-0 items-center rounded-s-3xl bg-blue-500 px-4 py-2.5 text-center text-sm font-medium text-white"
            onClick={toggleDropdown}
          >
            {DropDownName}
            <svg
              className="ms-2.5 h-2.5 w-2.5"
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
          <motion.div
            initial="closed"
            animate={showDropdown ? "open" : "closed"}
            variants={dropdownVariants}
            className="absolute left-0 top-full z-20 mt-3 w-44 rounded-md bg-white shadow-lg"
          >
            {showDropdown && (
              <ul className="py-2 text-sm text-gray-700">
                {data.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-200"
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
            )}
          </motion.div>
          <div className="relative w-full">
            <input
              type="text"
              value={searchText}
              id="search-dropdown"
              className="z-20 block w-full rounded-e-3xl border border-s-2 border-gray-300 border-s-gray-50 p-2.5 text-sm text-gray-900 outline-none"
              placeholder="Search Contracts, Documents and Counterparties ..."
              onChange={(e) => setSearchText(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full rounded-e-lg p-2.5 text-sm font-medium text-black outline-none"
            >
              <IoSearchSharp className="h-5 w-5 text-blue-600" />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
