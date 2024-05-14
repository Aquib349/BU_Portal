function SelectedProjectTask() {
  return (
    <>
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
    </>
  );
}

export default SelectedProjectTask;
