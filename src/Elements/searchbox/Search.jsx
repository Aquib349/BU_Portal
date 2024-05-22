import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import "./search.css";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <div className="search-box">
        <button className="btn-search">
          <IoSearchSharp />
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Search with Contract, Document or Counterparty name"
        />
      </div>
    </>
  );
};

export default SearchBar;
