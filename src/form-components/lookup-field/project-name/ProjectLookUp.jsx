import { useState } from "react";
import Modal from "../../../Elements/Modal";
import ProjectTaskLookUp from "../project-task/ProjectTaskLookUp";
import PropTypes from "prop-types";
import AllProjects from "./AllProjects";
import Pagination from "../../../Elements/Pagination";
import SelectedProject from "./SelectedProjects";
import ProjectsPerPage from "./ProjectsPerPage";
import SearchProjects from "./SearchProjects";

function ProjectLookUp({ ProjectName, baseline }) {
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [AllChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [SelectedProjects, setSelectedProjects] = useState([]);
  const [SelectedProjectValue, setSelectedProjectValue] = useState("");
  const [ProjectTask, setProjectTask] = useState([]);
  const [filteredProject, setFilteredProject] = useState([]);

  // function to handle the modal
  function toggleProjectModal() {
    setShowModal(!showModal);
  }

  const toggleSelectAll = () => {
    const newSelectAll = !AllChecked;
    setAllChecked(newSelectAll);

    const newCheckedItems = {};
    ProjectName.forEach((item) => {
      newCheckedItems[item.RowKey] = newSelectAll;
    });
    setCheckedItems(newCheckedItems);

    // If all checked, include all items in SelectedProjects, otherwise set to an empty array
    const updatedSelectedProjects = newSelectAll
      ? ProjectName.map((item) => ({ id: item.RowKey, name: item.ProjectName }))
      : [];
    updateSelectedProjects(updatedSelectedProjects);
  };

  // function to toggle checkbox
  const toggleCheckBox = (itemId, itemName) => {
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    };
    setCheckedItems(newCheckedItems);

    const allChecked =
      ProjectName.length === Object.keys(newCheckedItems).length
        ? Object.values(newCheckedItems).every((value) => value)
        : false;
    setAllChecked(allChecked);

    const updatedSelectedProjects = checkedItems[itemId] // If the item is unchecked
      ? SelectedProjects.filter((project) => project.name !== itemName) // Remove the unchecked item
      : [...SelectedProjects, { id: itemId, name: itemName }]; // Add the checked item
    updateSelectedProjects(updatedSelectedProjects);
  };

  const updateSelectedProjects = (projects) => {
    setSelectedProjects(projects);
  };

  return (
    <>
      <div className="flex">
        <input
          type="text"
          value={SelectedProjectValue}
          className="border border-slate-400 text-sm p-2 rounded-l-md w-full outline-blue-200 text-black bg-gray-200"
          readOnly
        />
        <button type="button">
          <span
            className="text-blue-600 text-sm py-2 px-6 rounded-r-md border border-blue-500 bg-blue-50"
            onClick={() => setShowModal(!showModal)}
          >
            Browse
          </span>
          <div className={`${showModal ? "static" : "hidden"} text-black`}>
            <Modal
              toggleModal={toggleProjectModal}
              heading="Project Picker"
              set_Width={true}
            >
              {/* pick the projec type */}
              <div className="main-project">
                <div className="show-entries-search flex justify-between items-center py-3">
                  {/* items per page to show */}
                  <ProjectsPerPage setItemsPerPage={setItemsPerPage} />
                  {/* search input project */}
                  <SearchProjects
                    setFilteredProject={setFilteredProject}
                    ProjectName={ProjectName}
                  />
                </div>

                {/* all projects */}
                <div className="border-b border-slate-300 pb-2">
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    data={filteredProject.length <= 0 ? ProjectName : filteredProject}
                    toggleModal={toggleProjectModal}
                    renderComponent={({ data, toggleModal }) => (
                      <AllProjects
                        ProjectName={data}
                        toggleModal={toggleModal}
                        AllChecked={AllChecked}
                        toggleSelectAll={toggleSelectAll}
                        checkedItems={checkedItems}
                        toggleCheckBox={toggleCheckBox}
                      />
                    )}
                  />
                </div>

                {/* selected projects */}
                <SelectedProject
                  SelectedProjects={SelectedProjects}
                  setSelectedProjects={setSelectedProjects}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  ProjectName={ProjectName}
                  setAllChecked={setAllChecked}
                  setSelectedProjectValue={setSelectedProjectValue}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  setProjectTask={setProjectTask}
                />
              </div>
            </Modal>
          </div>
        </button>
      </div>
      <small className="text-slate-500">{baseline}</small>
      <ProjectTaskLookUp ProjectTask={ProjectTask} baseline={baseline} />
    </>
  );
}

ProjectLookUp.propTypes = {
  ProjectName: PropTypes.array.isRequired,
  baseline: PropTypes.string.isRequired,
};

export default ProjectLookUp;
