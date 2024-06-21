import { useContext, useEffect, useState } from "react";
import Modal from "../../../Elements/Modal";
import PropTypes from "prop-types";
import SelectedProjectTask from "./SelectedProjectTask";
import { EditReqeustContext } from "../../../context/EditRequestContext";
import useXmlConverter from "../../../customhooks/useXmlConverter";

function ProjectTaskLookUp({ ProjectTask, baseline, setSelectedProjectTask }) {
  const [showModal, setShowModal] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [SelectedTask, setSelectedTasks] = useState("");
  const { EditRequest } = useContext(EditReqeustContext);
  const jsonResult = useXmlConverter(EditRequest);

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
          "$1:$2",
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

  useEffect(() => {
    if (jsonResult !== "") {
      let initialValue;
      try {
        initialValue = JSON.parse(jsonResult);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }

      let initialCheckedTasks = {};
      const projectTaskText = initialValue?.Metadata?.ProjectTask?._text;
      console.log(projectTaskText);

      if (projectTaskText) {
        projectTaskText?.split(";").forEach((task) => {
          const [description, id] = task.split(":");
          const taskItem = ProjectTask.find((t) => t.TaskID === id);
          if (taskItem) {
            initialCheckedTasks[taskItem.RowKey] = {
              nameChecked: true,
              descChecked: true,
            };
          }
        });
      }
      setCheckedTasks(initialCheckedTasks);

      // Set initial selected task
      const selectedTaskDescriptions = new Set(
        projectTaskText?.split(";").map((task) => {
          const [description, id] = task.split(":");
          const taskItem = ProjectTask.find((t) => t.TaskID === id);
          if (taskItem) {
            return `${taskItem.TaskDescription.replace(
              /(.*)\((.*)\)/,
              "$1:$2",
            )}:${taskItem.TaskID}`;
          } else {
            return "";
          }
        }),
      );

      const uniqueTaskDescriptions = Array.from(selectedTaskDescriptions)
        .filter((desc) => desc !== "")
        .join(";");
      setSelectedProjectTask(uniqueTaskDescriptions);
      setSelectedTasks(uniqueTaskDescriptions);
    }
  }, [jsonResult, ProjectTask]);

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
                <div className="project-task-name flex items-center gap-2 bg-slate-200 p-2">
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
                <div className="project-task-detail flex items-center gap-2 p-2 pl-8">
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
            className="w-full rounded-l-md border border-slate-400 bg-gray-200 p-2 text-sm text-black outline-blue-200"
            readOnly
          />
          <div>
            <span
              className="cursor-pointer rounded-r-md border border-blue-500 bg-blue-50 px-6 py-2 text-sm text-blue-600"
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
