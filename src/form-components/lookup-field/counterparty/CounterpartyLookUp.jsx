import { useState } from "react";
import Modal from "../../../Elements/Modal";
import PropTypes from "prop-types";
import Pagination from "../../../Elements/Pagination";
import CounterPartyPerPage from "./CounterpartyPerPage";
import SearchCounterParty from "./SearchCounterParty";
import AllCounterParty from "./AllCounterParty";
import SelectedCounterparty from "./SelectedCounterParty";

function CounterpartyLookUp({ CounterParty, setSelectedCounterPartyName }) {
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [AllChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [SelectedCounterParty, setSelectedCounterParty] = useState([]);
  const [SelectedCounterPartyValue, setSelectedCounterPartyValue] =
    useState("");
  const [filteredCounterParty, setFilteredCounterParty] = useState([]);

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

    const updateSelectedCounterPartys = checkedItems[itemId] // If the item is unchecked
      ? SelectedCounterParty.filter((project) => project.name !== itemName) // Remove the unchecked item
      : [...SelectedCounterParty, { id: itemId, name: itemName }]; // Add the checked item
    updateSelectedCounterParty(updateSelectedCounterPartys);
  };

  const updateSelectedCounterParty = (projects) => {
    setSelectedCounterParty(projects);
  };

  return (
    <>
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

          <div className={`${showModal ? "static" : "hidden"} text-black`}>
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
              {/* pick the projec type */}
              <div className="main-project">
                <div className="show-entries-search flex justify-between items-center py-3">
                  {/* items per page to show */}
                  <CounterPartyPerPage setItemsPerPage={setItemsPerPage} />
                  {/* search input project */}
                  <SearchCounterParty
                    setFilteredCounterParty={setFilteredCounterParty}
                    CounterPartyName={CounterParty}
                  />
                </div>

                {/* all projects */}
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

                {/* selected projects */}
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
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

CounterpartyLookUp.propTypes = {
  CounterParty: PropTypes.array,
  setSelectedCounterPartyName: PropTypes.func,
};

export default CounterpartyLookUp;
