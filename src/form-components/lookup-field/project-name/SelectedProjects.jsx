import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import axios from "axios";

function SelectedProject({
  SelectedProjects,
  setSelectedProjects,
  checkedItems,
  setCheckedItems,
  ProjectName,
  setAllChecked,
  setSelectedProjectValue,
  setShowModal,
  showModal,
  setProjectTask,
  setSelectedProjectName,
}) {
  // function to handle selected projects
  async function handleSelectedProjects() {
    const api = import.meta.env.VITE_API_URL;
    const account_id = import.meta.env.VITE_USER_KEY;

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

  // function to remove the project from selected list
  function RemoveSelectedProjectsFromList(itemID, itemName) {
    const CurrentListOfProjects = SelectedProjects.filter(
      (project) => project.name !== itemName
    );
    setSelectedProjects(CurrentListOfProjects);

    // remove the check mark from the project which has been removed from list
    const updatedCheckedProjects = { ...checkedItems };
    delete updatedCheckedProjects[itemID];
    setCheckedItems(updatedCheckedProjects);

    const allChecked =
      ProjectName.length === Object.keys(updatedCheckedProjects).length
        ? Object.values(updatedCheckedProjects).every((value) => value)
        : false;
    setAllChecked(allChecked);
  }
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="selected-project col-span-3 text-xs">
          {SelectedProjects.map((val) => (
            <div
              key={val.id}
              className="inline-flex justify-between items-center px-2 py-1"
            >
              <span className="border border-gray-400 rounded px-2 py-1 flex items-center">
                <span className="flex-grow">{val.name}</span>
                <span
                  className="ml-2 text-blue-500"
                  onClick={() =>
                    RemoveSelectedProjectsFromList(val.id, val.name)
                  }
                >
                  <RxCross2 />
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="btn flex justify-end gap-2 text-sm pt-4">
          <button
            type="button"
            className="py-2 px-4 bg-blue-500 text-white rounded"
            onClick={() => {
              handleSelectedProjects();
              setShowModal(!showModal);
            }}
          >
            Ok
          </button>
          <button
            type="button"
            className="py-2 px-6 bg-slate-500 text-white rounded"
            onClick={() => setShowModal(!showModal)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

SelectedProject.propTypes = {
  SelectedProjects: PropTypes.array,
  setSelectedProjects: PropTypes.func,
  checkedItems: PropTypes.object,
  setCheckedItems: PropTypes.func,
  ProjectName: PropTypes.array,
  setAllChecked: PropTypes.func,
  setSelectedProjectValue: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  setProjectTask: PropTypes.func,
  setSelectedProjectName: PropTypes.func,
};

export default SelectedProject;
