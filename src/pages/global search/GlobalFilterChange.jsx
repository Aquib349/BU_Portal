import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";

function GlobalFilterChange({ SearchQuery }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [DropDownName, setDropDownName] = useState("Contract Title");

  const data = [
    { id: 1, name: "Contract Title", value: "ContractTitle" },
    { id: 2, name: "Document Title", value: "DocumentName" },
    { id: 3, name: "Counterparty Name", value: "CounterpartyName" },
  ];

  const {
    setDropDownValue,
    handleGlobalSearch,
    setSearchText,
    DropDownValue,
  } = useContext(GlobalSearchContext);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownChange = (item) => {
    setDropDownValue(item.value);
    setDropDownName(item.name);
    setSearchText(SearchQuery);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (DropDownValue) {
      handleGlobalSearch();
    }
  }, [DropDownValue]);

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
      <div className="">
        <div className="relative flex">
          <button
            type="button"
            className="z-10 inline-flex flex-shrink-0 items-center rounded border bg-white p-2 text-center text-sm font-medium"
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
                      onClick={() => handleDropdownChange(item)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default GlobalFilterChange;
