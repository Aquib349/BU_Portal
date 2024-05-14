import { useState } from "react";
import Modal from "../../../Elements/Modal";
import PropTypes from "prop-types";
import SelectedProjectTask from "./SelectedProjectTask";

function ProjectTaskLookUp({ ProjectTask, baseline }) {
  const [showModal, setShowModal] = useState(false);

  // function to handle the modal
  function toggleProjectTaskModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div className="py-4">
        <label className="text-sm">Project Task</label>
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
            {/* modal */}
            <div className={`${showModal ? "static" : "hidden"} text-black`}>
              <Modal
                toggleModal={toggleProjectTaskModal}
                heading="Project Task Picker"
                set_Width={true}
              >
                {/* pick the project task */}
                <div className="project-task pt-4">
                  {ProjectTask.map((val) => (
                    <div key={val.RowKey} className="main text-sm">
                      <div className="project-task-name bg-slate-200 p-2 flex items-center gap-2">
                        <input type="checkbox" name="task_name" />
                        <span>
                          {val.TaskDescription.replace("(Default Task)", "")}
                        </span>
                      </div>
                      <div className="project-task-detail p-2 flex items-center gap-2 pl-8">
                        <input type="checkbox" name="task_desc" />
                        <span>
                          {val.TaskID} : {val.TaskDescription}
                        </span>
                      </div>
                    </div>
                  ))}
                  <SelectedProjectTask />
                </div>
              </Modal>
            </div>
          </button>
        </div>
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
}

ProjectTaskLookUp.propTypes = {
  ProjectTask: PropTypes.array.isRequired,
  baseline: PropTypes.string.isRequired,
};

export default ProjectTaskLookUp;
