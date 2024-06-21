import { useState } from "react";
import Modal from "../../Elements/Modal";
import BusinessAreaPicker from "./BusinessAreaPicker";
import PropTypes from "prop-types";

function MultiBusinessAreaRoute({
  isMultiArea,
  RequestBusinessAreas,
  setBusinessArea,
  BusinessArea,
  setBusinessAreaName,
  setContractAreaAdministrators,
  setBusinessAreaOwners,
  setBusinessAreaPath,
}) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }
  return (
    <>
      {/* modal */}
      {showModal && (
        <Modal toggleModal={toggleModal} heading="Business Area Picker">
          <BusinessAreaPicker
            setBusinessArea={setBusinessArea}
            setBusinessAreaName={setBusinessAreaName}
            showModal={showModal}
            setShowModal={setShowModal}
            RequestBusinessAreas={RequestBusinessAreas}
            setContractAreaAdministrators={setContractAreaAdministrators}
            setBusinessAreaOwners={setBusinessAreaOwners}
            setBusinessAreaPath={setBusinessAreaPath}
          />
        </Modal>
      )}
      <div className={`browse-input ${isMultiArea ? "static" : "hidden"}`}>
        <label>Business Area</label>
        <div className="flex">
          <input
            type="text"
            value={BusinessArea}
            className="w-full rounded-l-md border border-slate-300 p-2 text-sm text-black outline-blue-200"
            readOnly
          />
          <button type="button">
            <span
              className="rounded-r-md border border-blue-500 bg-blue-50 px-6 py-2 text-sm text-blue-600"
              onClick={() => setShowModal(!showModal)}
            >
              Browse
            </span>
          </button>
        </div>
        <small className="px-1 text-slate-500">
          This field is used to map each Request to an item in the
          organization&apos;s business areas hierachy
        </small>
      </div>
    </>
  );
}

MultiBusinessAreaRoute.propTypes = {
  isMultiArea: PropTypes.bool.isRequired,
  RequestBusinessAreas: PropTypes.array.isRequired,
  setBusinessArea: PropTypes.func,
  setBusinessAreaName: PropTypes.func,
  setContractAreaAdministrators:PropTypes.func,
  setBusinessAreaOwners:PropTypes.func,
  setBusinessAreaPath:PropTypes.func,
};

export default MultiBusinessAreaRoute;
