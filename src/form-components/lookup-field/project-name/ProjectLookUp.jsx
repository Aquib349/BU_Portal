import { useState } from "react";
import Modal from "../../../Elements/Modal";
import ProjectTaskLookUp from "../project-task/ProjectTaskLookUp";
import PropTypes from "prop-types";
import AllProjects from "./AllProjects";
import Pagination from "../../../Elements/Pagination";
import SelectedProject from "./SelectedProjects";
import ProjectsPerPage from "./ProjectsPerPage";
import SearchProjects from "./SearchProjects";

function ProjectLookUp({
  ProjectName,
  baseline,
  setSelectedProjectName,
  setSelectedProjectTask,
}) {
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
    (filteredProject.length > 0 ? filteredProject : ProjectName).forEach(
      (item) => {
        newCheckedItems[item.RowKey] = newSelectAll;
      }
    );
    setCheckedItems(newCheckedItems);

    // If all checked, include all items in SelectedProjects, otherwise set to an empty array
    const updatedSelectedProjects = newSelectAll
      ? (filteredProject.length > 0 ? filteredProject : ProjectName).map(
          (item) => ({ id: item.RowKey, name: item.ProjectName })
        )
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
      <div className="flex items-center">
        <input
          type="text"
          value={SelectedProjectValue}
          className={`p-2 text-sm rounded-l-md bg-slate-200 border w-full border-slate-400 outline-blue-400`}
          readOnly
        />
        <div>
          <span
            className="text-blue-600 text-sm py-2 px-6 rounded-r-md border border-blue-500 bg-blue-50 cursor-pointer"
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
                    data={
                      filteredProject.length <= 0
                        ? ProjectName
                        : filteredProject
                    }
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
                  setSelectedProjectName={setSelectedProjectName}
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
        </div>
      </div>
      <small className="text-slate-500">{baseline}</small>
      <ProjectTaskLookUp
        ProjectTask={ProjectTask}
        baseline={baseline}
        setSelectedProjectTask={setSelectedProjectTask}
      />
    </>
  );
}

ProjectLookUp.propTypes = {
  ProjectName: PropTypes.array,
  baseline: PropTypes.string,
  validationError: PropTypes.string,
  setSelectedProjectName: PropTypes.func,
  setSelectedProjectTask: PropTypes.func,
};

export default ProjectLookUp;
