import PropTypes from "prop-types";
import { useState } from "react";

function SearchProjects({ setFilteredProject, ProjectName }) {
  const [SearchInput, setSearchInput] = useState("");

  function SearchProject(e) {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    if (inputValue.length === 0) {
      // If search input is empty, show all data
      setFilteredProject(ProjectName);
    } else {
      // Filter data based on search input
      const filteredData = ProjectName.filter((val) =>
        val.ProjectName?.toLowerCase()?.includes(inputValue)
      );
      setFilteredProject(filteredData);
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
          onChange={SearchProject}
        />
      </div>
    </>
  );
}

SearchProjects.propTypes = {
  setFilteredProject: PropTypes.func,
  ProjectName: PropTypes.array,
};

export default SearchProjects;
