import { useEffect, useState } from "react";
import Modal from "../../../Elements/Modal";
import PropTypes from "prop-types";
import SelectedProjectTask from "./SelectedProjectTask";

function ProjectTaskLookUp({ ProjectTask, baseline, setSelectedProjectTask }) {
  const [showModal, setShowModal] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [SelectedTask, setSelectedTasks] = useState("");

  // let initialValue = "Test:Default Task; Test:DEFAULT";
  // useEffect(() => {
  //   const initialCheckedTasks = {};
  //   initialValue.split(";").forEach((task) => {
  //     const [description, id] = task.split(":");
  //     const taskItem = ProjectTask.find((t) => t.TaskID === id);
  //     if (taskItem) {
  //       initialCheckedTasks[taskItem.RowKey] = {
  //         nameChecked: true,
  //         descChecked: true,
  //       };
  //     }
  //   });
  //   console.log(initialCheckedTasks);
  //   setCheckedTasks(initialCheckedTasks);
  // }, [initialValue, ProjectTask]);

  // Toggle the modal visibility
  const toggleProjectTaskModal = () => {
    setShowModal(!showModal);
  };

  // Function to select or deselect a project task
  const selectProjectTask = (taskId, type) => {
    setCheckedTasks((prevState) => {
      const newState = { ...prevState };
      if (type === "name") {
        newState[taskId] = {
          nameChecked: !prevState[taskId]?.nameChecked,
          descChecked: !prevState[taskId]?.nameChecked,
        };
      } else if (type === "desc") {
        newState[taskId] = {
          nameChecked: !prevState[taskId]?.descChecked,
          descChecked: !prevState[taskId]?.descChecked,
        };
      }
      return newState;
    });
  };

  // Format data for display
  const formatData = () => {
    const selectedTaskDescriptions = Object.keys(checkedTasks)
      .filter((key) => checkedTasks[key].descChecked)
      .map((key) => {
        const task = ProjectTask.find((task) => task.RowKey === key);
        return `${task.TaskDescription.replace(
          /(.*)\((.*)\)/,
          "$1:$2"
        )},${task.TaskDescription.replace("(Default Task)", "")}:${
          task.TaskID
        }`;
      });
    setSelectedProjectTask(selectedTaskDescriptions.join(";"));
    setSelectedTasks(selectedTaskDescriptions.join(";"));
  };

  // Handle task submission
  const handleTaskSubmit = () => {
    formatData();
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal
          toggleModal={toggleProjectTaskModal}
          heading="Project Task Picker"
          set_Width={true}
        >
          {/* Pick the project task */}
          <div className="project-task pt-4">
            {ProjectTask.map((val) => (
              <div key={val.RowKey} className="main text-sm">
                <div className="project-task-name bg-slate-200 p-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="task_name"
                    checked={checkedTasks[val.RowKey]?.nameChecked || false}
                    onChange={() => selectProjectTask(val.RowKey, "name")}
                  />
                  <span>
                    {val.TaskDescription.replace("(Default Task)", "")}
                  </span>
                </div>
                <div className="project-task-detail p-2 flex items-center gap-2 pl-8">
                  <input
                    type="checkbox"
                    name="task_desc"
                    checked={checkedTasks[val.RowKey]?.descChecked || false}
                    onChange={() => selectProjectTask(val.RowKey, "desc")}
                  />
                  <span>
                    {val.TaskID} : {val.TaskDescription}
                  </span>
                </div>
              </div>
            ))}
            <SelectedProjectTask
              handleTaskSubmit={handleTaskSubmit}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </Modal>
      )}
      <div className="py-4">
        <label className="text-sm">Project Task</label>
        <div className="flex items-center">
          <input
            type="text"
            value={SelectedTask}
            className="border border-slate-400 text-sm p-2 rounded-l-md w-full outline-blue-200 text-black bg-gray-200"
            readOnly
          />
          <div>
            <span
              className="text-blue-600 text-sm py-2 px-6 rounded-r-md border border-blue-500 bg-blue-50 cursor-pointer"
              onClick={toggleProjectTaskModal}
            >
              Browse
            </span>
          </div>
        </div>
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
}

ProjectTaskLookUp.propTypes = {
  ProjectTask: PropTypes.array,
  baseline: PropTypes.string,
  setSelectedProjectTask: PropTypes.func,
};

export default ProjectTaskLookUp;
