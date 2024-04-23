import { useState } from "react";
import Modal from "../../Elements/Modal";
import BusinessAreaPicker from "./BusinessAreaPicker";
import MultiChoiceDropdown from "../../form-components/MultiChoiceDropdown";
import ChoiceField from "../../form-components/ChoiceField";

const NewRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [BusinessArea, setBusinessArea] = useState("");
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  function toggleModal() {
    setShowModal(!showModal);
    console.log(showModal);
  }

  return (
    <>
      <div className="newrequest-component">
        <div className="main">
          <div className="w-8/12 m-auto">
            <div className="leading-[0.5rem] py-4 px-2">
              <h1 className="text-2xl">Submit a New Request</h1>
              <small className="text-slate-500">
                Submit a New Request to Legal
              </small>
            </div>
            <div className="primary-fields px-4 py-2 pb-8 bg-black/80 shadow-md text-white rounded-md">
              <h1 className="px-1 py-2 text-xl">Primary Fields</h1>
              <form>
                <div className="browse-input">
                  <label className="px-1">Business Area</label>
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
                      {/* modal */}
                      <div
                        className={`${
                          showModal ? "static" : "hidden"
                        } text-black`}
                      >
                        <Modal
                          toggleModal={toggleModal}
                          heading="Business Area Picker"
                        >
                          <BusinessAreaPicker
                            setBusinessArea={setBusinessArea}
                            showModal={showModal}
                            setShowModal={setShowModal}
                          />
                        </Modal>
                      </div>
                    </button>
                  </div>
                  <small className="px-1 text-slate-300">
                    This field is used to map each Request to an item in the
                    organization&apos;s business areas hierachy
                  </small>
                </div>
                <div className="flex flex-col py-2">
                  <label className="px-1">
                    Request Type
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    name="request_type"
                    className="text-sm p-2 rounded-md border border-slate-300 outline-blue-300 text-black"
                  >
                    <option value="value1">value1</option>
                    <option value="value2">value2</option>
                    <option value="value3">value3</option>
                  </select>
                  <small className="px-1 text-slate-300">
                    Type of contract or related document requested
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>


        {/* test for the form components */}
        <MultiChoiceDropdown multi={true} options={options}/>
        <ChoiceField options={options}/>
      </div>
    </>
  );
};

export default NewRequest;
