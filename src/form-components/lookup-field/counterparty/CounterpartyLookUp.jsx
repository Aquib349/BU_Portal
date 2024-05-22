import { useState } from "react";
import Modal from "../../../Elements/Modal";
import PropTypes from "prop-types";

function CounterpartyLookUp() {
  const [showModal, setShowModal] = useState(false);

  // function to handle the modal
  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div className="flex">
        <input
          type="text"
          value=""
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

          <div className={`${showModal ? "static" : "hidden"} text-black`}>
            <Modal toggleModal={toggleModal} heading="Business Area Picker">
              {/* pick the project task */}
              <h1>hii</h1>
            </Modal>
          </div>
        </button>
      </div>
    </>
  );
}

CounterpartyLookUp.propTypes = {};

export default CounterpartyLookUp;
