import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

function SelectedCounterparty({
  SelectedCounterParty,
  setSelectedCounterParty,
  checkedItems,
  setCheckedItems,
  CounterPartyName,
  setAllChecked,
  setSelectedCounterPartyValue,
  setShowModal,
  showModal,
  setSelectedCounterPartyName,
  setIsEdited
}) {
  // function to handle selected projects
  async function handleSelectedCounterparty() {
    setIsEdited(true);
    const concatedString = SelectedCounterParty.map((val) => val.name).join(
      ";"
    );
    setSelectedCounterPartyValue(concatedString);
    setSelectedCounterPartyName(concatedString);
  }

  // function to remove the project from selected list
  function RemoveSelectedConterpartyFromList(itemID, itemName) {
    const CurrentListOfCounterparty = SelectedCounterParty.filter(
      (project) => project.name !== itemName
    );
    setSelectedCounterParty(CurrentListOfCounterparty);

    // remove the check mark from the project which has been removed from list
    const updatedCheckedCounterparty = { ...checkedItems };
    delete updatedCheckedCounterparty[itemID];
    setCheckedItems(updatedCheckedCounterparty);

    const allChecked =
      CounterPartyName.length === Object.keys(updatedCheckedCounterparty).length
        ? Object.values(updatedCheckedCounterparty).every((value) => value)
        : false;
    setAllChecked(allChecked);
  }
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="selected-project col-span-3 text-xs">
          {SelectedCounterParty.map((val) => (
            <div
              key={val.id}
              className="inline-flex justify-between items-center px-2 py-1"
            >
              <span className="border border-gray-400 rounded px-2 py-1 flex items-center">
                <span className="flex-grow">{val.name}</span>
                <span
                  className="ml-2 text-blue-500 cursor-pointer"
                  onClick={() =>
                    RemoveSelectedConterpartyFromList(val.id, val.name)
                  }
                >
                  <RxCross2 />
                </span>
              </span>
            </div>
          ))}
        </div>
        <div
          className={`${
            SelectedCounterParty.length > 0 ? "absolute bottom-2 right-4" : ""
          }`}
        >
          <div className="btn flex justify-end gap-2 text-sm pt-4">
            <button
              type="button"
              className="py-2 px-4 bg-blue-500 text-white rounded"
              onClick={() => {
                handleSelectedCounterparty();
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
      </div>
    </>
  );
}

SelectedCounterparty.propTypes = {
  SelectedCounterParty: PropTypes.array,
  setSelectedCounterParty: PropTypes.func,
  checkedItems: PropTypes.object,
  setCheckedItems: PropTypes.func,
  CounterPartyName: PropTypes.array,
  setAllChecked: PropTypes.func,
  setSelectedCounterPartyValue: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  setSelectedCounterPartyName: PropTypes.func,
};

export default SelectedCounterparty;
