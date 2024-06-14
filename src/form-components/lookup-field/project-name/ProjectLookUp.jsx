import { useState, useEffect } from "react";
import Modal from "../../../Elements/Modal";
import ProjectTaskLookUp from "../project-task/ProjectTaskLookUp";
import PropTypes from "prop-types";
import AllProjects from "./AllProjects";
import Pagination from "../../../Elements/Pagination";
import SelectedProject from "./SelectedProjects";
import ProjectsPerPage from "./ProjectsPerPage";
import SearchProjects from "./SearchProjects";
import axios from "axios";

function ProjectLookUp({
  ProjectName,
  baseline,
  setSelectedProjectName,
  setSelectedProjectTask,
  initialValue,
}) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [AllChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [SelectedProjects, setSelectedProjects] = useState([]);
  const [SelectedProjectValue, setSelectedProjectValue] = useState(
    initialValue || ""
  );
  const [ProjectTask, setProjectTask] = useState([]);
  const [filteredProject, setFilteredProject] = useState([]);
  const [IsEdited, setIsEdited] = useState(false);

  // Function to handle the modal
  function toggleProjectModal() {
    setShowModal(!showModal);
  }

  // Function to toggle the top checkbox
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
    setSelectedProjects(updatedSelectedProjects);
  };

  // Function to toggle checkbox
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

    const updatedSelectedProjects = checkedItems[itemId]
      ? SelectedProjects.filter((project) => project.name !== itemName)
      : [...SelectedProjects, { id: itemId, name: itemName }];
    setSelectedProjects(updatedSelectedProjects);
  };

  // function to handle selected projects
  async function handleSelectedProjects() {
    setIsEdited(true);
    const concatedString = SelectedProjects.map((val) => val.name).join(";");
    setSelectedProjectName(concatedString);
    setSelectedProjectValue(concatedString);

    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/projecttasks?projectnames=${concatedString}`,
        { headers }
      );
      setProjectTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (initialValue && ProjectName.length > 0 && !IsEdited) {
      // Split the initialValue string into individual project names
      const initialProjectNames = initialValue.split(";");
      const initialProjects = [];
      const updatedCheckedItems = {};
      let allProjectsChecked = true;

      // Iterate over each project name
      ProjectName.forEach((project) => {
        const checked = initialProjectNames.includes(project.ProjectName);
        updatedCheckedItems[project.RowKey] = checked;
        if (!checked) allProjectsChecked = false;
        if (checked) {
          initialProjects.push({
            id: project.RowKey,
            name: project.ProjectName,
          });
        }
      });

      // Update the selected projects state
      setSelectedProjects(initialProjects);

      // Update the checked items state to ensure checkboxes are checked
      setCheckedItems(updatedCheckedItems);

      // Update the AllChecked state based on the checked status of all items
      setAllChecked(allProjectsChecked);
      if (SelectedProjects.length > 0) {
        handleSelectedProjects();
      }
    }
  }, [initialValue, ProjectName]);

  return (
    <>
      {showModal && (
        <Modal
          toggleModal={toggleProjectModal}
          heading="Project Picker"
          set_Width={true}
        >
          <div className="main-project">
            <div className="show-entries-search flex justify-between items-center py-3">
              <ProjectsPerPage setItemsPerPage={setItemsPerPage} />
              <SearchProjects
                setFilteredProject={setFilteredProject}
                ProjectName={ProjectName}
              />
            </div>

            <div className="border-b border-slate-300 pb-2">
              <Pagination
                itemsPerPage={itemsPerPage}
                data={
                  filteredProject.length <= 0 ? ProjectName : filteredProject
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

            <SelectedProject
              SelectedProjects={SelectedProjects}
              setSelectedProjects={setSelectedProjects}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              ProjectName={ProjectName}
              setAllChecked={setAllChecked}
              showModal={showModal}
              setShowModal={setShowModal}
              handleSelectedProjects={handleSelectedProjects}
            />
          </div>
        </Modal>
      )}
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
  setSelectedProjectName: PropTypes.func,
  setSelectedProjectTask: PropTypes.func,
  initialValue: PropTypes.string,
};

export default ProjectLookUp;
