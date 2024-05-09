import { useState } from "react";
import Modal from "../../../Elements/Modal";
import ProjectTaskLookUp from "../project-task/ProjectTaskLookUp";
import PropTypes from "prop-types";
import AllProjects from "./AllProjects";
import Pagination from "../../../Elements/Pagination";
import { RxCross2 } from "react-icons/rx";

function ProjectLookUp({ ProjectName }) {
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [AllChecked, setAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState(ProjectName);

  // Function to handle header checkbox change
  const handleHeaderChange = (event) => {
    const isChecked = event.target.checked;
    setHeaderChecked(isChecked);
    setCheckboxes(
      checkboxes.map((checkbox) => ({ ...checkbox, checked: isChecked }))
    );
  };

  // Function to handle individual checkbox change
  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
    setHeaderChecked(updatedCheckboxes.every((checkbox) => checkbox.checked));
  };

  // function to handle the modal
  function toggleProjectModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div className="flex">
        <input
          type="text"
          value=""
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
                {/* show-entries and search bar */}
                <div className="show-entries-search flex justify-between items-center py-3">
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
                  <div className="">
                    <input
                      type="search"
                      name="project"
                      placeholder="search"
                      className="p-2 border rounded w-full text-sm outline-none"
                    />
                  </div>
                </div>

                {/* all projects */}
                <div className="border-b border-slate-300 pb-2">
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    data={ProjectName}
                    toggleModal={toggleProjectModal}
                    renderComponent={({ data, toggleModal }) => (
                      <AllProjects
                        ProjectName={data}
                        toggleModal={toggleModal}
                        handleProjectChange={handleCheckboxChange}
                        AllChecked={AllChecked}
                        handleTopCheckboxChange={handleHeaderChange}
                      />
                    )}
                  />
                </div>

                {/*  */}
                <div className="grid grid-cols-4">
                  <div className="selected-project col-span-3 text-xs">
                    <div className="inline-flex justify-between items-center px-2 py-1">
                      <span className="border border-gray-400 rounded px-2 py-1 flex items-center">
                        <span className="flex-grow">Test</span>
                        <span className="ml-2 text-blue-500">
                          <RxCross2 />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="btn flex justify-end gap-2 text-sm pt-4">
                    <button
                      type="button"
                      className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                      Ok
                    </button>
                    <button
                      type="button"
                      className="py-2 px-6 bg-slate-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </button>
      </div>
      <ProjectTaskLookUp />
    </>
  );
}

ProjectLookUp.propTypes = {
  ProjectName: PropTypes.array.isRequired,
};

export default ProjectLookUp;
