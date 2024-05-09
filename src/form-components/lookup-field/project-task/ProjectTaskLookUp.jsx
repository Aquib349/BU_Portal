import { useState } from "react";
import Modal from "../../../Elements/Modal";

function ProjectTaskLookUp() {
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
              </Modal>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectTaskLookUp;
