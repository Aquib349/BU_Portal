import PropTypes from "prop-types";

function ProjectsPerPage({ setItemsPerPage }) {
  return (
    <>
      <div className="flex items-center gap-x-1 text-sm">
        <span>Show</span>
        <select
          name="entries"
          id="entries"
          className="px-2 border rounded"
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>entries</span>
      </div>
    </>
  );
}

ProjectsPerPage.propTypes = {
  setItemsPerPage: PropTypes.func.isRequired,
};

export default ProjectsPerPage;
