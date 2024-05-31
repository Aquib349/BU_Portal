import { useState } from "react";
import Modal from "../../Elements/Modal";
import BusinessAreaPicker from "./BusinessAreaPicker";
import PropTypes from "prop-types";

function MultiBusinessAreaRoute({
  isMultiArea,
  RequestBusinessAreas,
  setBusinessArea,
  BusinessArea,
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
            showModal={showModal}
            setShowModal={setShowModal}
            RequestBusinessAreas={RequestBusinessAreas}
          />
        </Modal>
      )}
      <div className={`browse-input ${isMultiArea ? "static" : "hidden"}`}>
        <label>Business Area</label>
        <div className="flex">
          <input
            type="text"
            value={BusinessArea}
            className="border border-slate-300 text-sm p-2 rounded-l-md w-full outline-blue-200 text-black"
            readOnly
          />
          <button type="button">
            <span
              className="text-blue-600 text-sm py-2 px-6 rounded-r-md border border-blue-500 bg-blue-50"
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
};

export default MultiBusinessAreaRoute;
