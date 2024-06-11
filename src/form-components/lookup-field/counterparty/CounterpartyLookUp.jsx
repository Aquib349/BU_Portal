import { useEffect, useState } from "react";
import Modal from "../../../Elements/Modal";
import PropTypes from "prop-types";
import Pagination from "../../../Elements/Pagination";
import CounterPartyPerPage from "./CounterpartyPerPage";
import SearchCounterParty from "./SearchCounterParty";
import AllCounterParty from "./AllCounterParty";
import SelectedCounterparty from "./SelectedCounterParty";

function CounterpartyLookUp({
  CounterParty,
  setSelectedCounterPartyName,
  initialValue,
}) {
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [AllChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [SelectedCounterParty, setSelectedCounterParty] = useState([]);
  const [SelectedCounterPartyValue, setSelectedCounterPartyValue] = useState(
    initialValue || ""
  );
  const [filteredCounterParty, setFilteredCounterParty] = useState([]);
  const [IsEdited, setIsEdited] = useState(false);

  // function to handle the modal
  function toggleCounterPartyModal() {
    setShowModal(!showModal);
  }

  const toggleSelectAll = () => {
    const newSelectAll = !AllChecked;
    setAllChecked(newSelectAll);

    const newCheckedItems = {};
    (filteredCounterParty.length > 0
      ? filteredCounterParty
      : CounterParty
    ).forEach((item) => {
      newCheckedItems[item.RowKey] = newSelectAll;
    });
    setCheckedItems(newCheckedItems);

    // If all checked, include all items in SelectedCounterParty, otherwise set to an empty array
    const updatedSelectedProjects = newSelectAll
      ? (filteredCounterParty.length > 0
          ? filteredCounterParty
          : CounterParty
        ).map((item) => ({ id: item.RowKey, name: item.CounterpartyName }))
      : [];
    updateSelectedCounterParty(updatedSelectedProjects);
  };

  // function to toggle checkbox
  const toggleCheckBox = (itemId, itemName) => {
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    };
    setCheckedItems(newCheckedItems);

    const allChecked =
      CounterParty.length === Object.keys(newCheckedItems).length
        ? Object.values(newCheckedItems).every((value) => value)
        : false;
    setAllChecked(allChecked);

    const updateSelectedCounterPartys = checkedItems[itemId]
      ? SelectedCounterParty.filter((project) => project.name !== itemName)
      : [...SelectedCounterParty, { id: itemId, name: itemName }];
    updateSelectedCounterParty(updateSelectedCounterPartys);
  };

  const updateSelectedCounterParty = (projects) => {
    setSelectedCounterParty(projects);
  };

  // Effect to handle initial value
  useEffect(() => {
    if (initialValue && CounterParty.length > 0 && !IsEdited) {
      // Split the initialValue string into individual Counterparty names
      const initialCounterpartyNames = initialValue.split(";");
      const initialCounterparties = [];
      const updatedCheckedItems = { ...checkedItems };

      // Iterate over each Counterparty name
      initialCounterpartyNames.forEach((name) => {
        // Find the Counterparty data that matches the name
        const initialCounterparty = CounterParty.find(
          (counterparty) => counterparty.CounterpartyName === name.trim()
        );

        // If a matching Counterparty is found, add it to the list
        if (initialCounterparty) {
          initialCounterparties.push({
            id: initialCounterparty.RowKey,
            name: initialCounterparty.CounterpartyName,
          });
          updatedCheckedItems[initialCounterparty.RowKey] = true;
        }
      });

      // Update the selected Counterparties state
      setSelectedCounterParty(initialCounterparties);

      // Update the checked items state to ensure checkboxes are checked
      setCheckedItems(updatedCheckedItems);
    }
  }, [initialValue, CounterParty]);

  return (
    <>
      {showModal && (
        <Modal
          toggleModal={toggleCounterPartyModal}
          heading={
            <>
              <div className="">
                <h1>Select Counterparties</h1>
                <p className="text-sm">
                  Select Counterparties related to this request. If not
                  available here, provide Counterparty info in the request
                  description field.
                </p>
              </div>
            </>
          }
          set_Width={true}
        >
          {/* pick the counterparty type */}
          <div className="main-project">
            <div className="show-entries-search flex justify-between items-center py-3">
              {/* items per page to show */}
              <CounterPartyPerPage setItemsPerPage={setItemsPerPage} />
              {/* search input counterparty */}
              <SearchCounterParty
                setFilteredCounterParty={setFilteredCounterParty}
                CounterPartyName={CounterParty}
              />
            </div>

            {/* all counterparty */}
            <div className="border-b border-slate-300 pb-2">
              <Pagination
                itemsPerPage={itemsPerPage}
                data={
                  filteredCounterParty.length > 0
                    ? filteredCounterParty
                    : CounterParty
                }
                toggleModal={toggleCounterPartyModal}
                renderComponent={({ data, toggleModal }) => (
                  <AllCounterParty
                    CounterPartyName={data}
                    toggleModal={toggleModal}
                    AllChecked={AllChecked}
                    toggleSelectAll={toggleSelectAll}
                    checkedItems={checkedItems}
                    toggleCheckBox={toggleCheckBox}
                  />
                )}
              />
            </div>

            {/* selected counterparty */}
            <SelectedCounterparty
              SelectedCounterParty={SelectedCounterParty}
              setSelectedCounterParty={setSelectedCounterParty}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              CounterPartyName={CounterParty}
              setAllChecked={setAllChecked}
              setSelectedCounterPartyValue={setSelectedCounterPartyValue}
              showModal={showModal}
              setShowModal={setShowModal}
              setSelectedCounterPartyName={setSelectedCounterPartyName}
              setIsEdited={setIsEdited}
            />
          </div>
        </Modal>
      )}
      <div className="flex items-center">
        <input
          type="text"
          value={SelectedCounterPartyValue}
          className="border border-slate-300 text-sm p-2 rounded-l-md w-full outline-blue-200 text-black"
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
    </>
  );
}

CounterpartyLookUp.propTypes = {
  CounterParty: PropTypes.array,
  setSelectedCounterPartyName: PropTypes.func,
  initialValue: PropTypes.string,
};

export default CounterpartyLookUp;
