import PropTypes from "prop-types";

function SelectedProjectTask({ handleTaskSubmit, showModal, setShowModal }) {
  return (
    <>
      <div className="btn flex justify-end gap-2 text-sm pt-4">
        <button
          type="button"
          className="py-2 px-4 bg-blue-500 text-white rounded"
          onClick={handleTaskSubmit}
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
    </>
  );
}

SelectedProjectTask.propTypes = {
  handleTaskSubmit: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default SelectedProjectTask;
