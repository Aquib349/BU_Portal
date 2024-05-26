import PropTypes from "prop-types";
import { useState } from "react";

function SearchCounterParty({ setFilteredCounterParty, CounterPartyName }) {
  const [SearchInput, setSearchInput] = useState("");

  function SearchCounterParty(e) {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    if (inputValue.length === 0) {
      // If search input is empty, show all data
      setFilteredCounterParty(CounterPartyName);
    } else {
      // Filter data based on search input
      const filteredData = CounterPartyName.filter((val) =>
        val.CounterpartyName?.toLowerCase()?.includes(inputValue)
      );
      setFilteredCounterParty(filteredData);
    }
  }

  return (
    <>
      <div className="search-projects">
        <input
          type="search"
          name="project"
          value={SearchInput}
          placeholder="search"
          className="p-2 border rounded w-full text-sm outline-none"
          onChange={SearchCounterParty}
        />
      </div>
    </>
  );
}

SearchCounterParty.propTypes = {
  setFilteredCounterParty: PropTypes.func,
  CounterPartyName: PropTypes.array,
};

export default SearchCounterParty;
