import { IoMdInformationCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import Tooltip from "../../Elements/Tooltip";
import Select from "react-select";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import FormatDate from "../../constants/FormatDate";

function Notes({ NotesDetail }) {
  const { AllUser } = useContext(UserContext);
  const [SendNotificationTo, setSendNotificationTo] = useState(null); // Fixed state setter name
  const [ShowAddForm, setShowAddForm] = useState(false);

  const handleChange = (selectedOption) => {
    const concatenatedLabels = selectedOption
      ? selectedOption.map((option) => option.label).join("; ")
      : "";
    setSendNotificationTo(selectedOption);

    // If you have a validation function, ensure it's defined and works as expected
    // validate(fieldname, concatenatedLabels, required);
  };

  return (
    <>
      <div className="notes-component border border-slate-300 rounded-md p-4 mt-4">
        <div className="main text-sm">
          <div className="relative">
            <input
              type="checkbox"
              className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
            />
            <div className="pt-6">
              <span className="h-[40px]">
                <div className="flex items-center gap-1">
                  <h1 className="text-xl">Notes</h1>
                  <Tooltip
                    message="Add a note to this Contract"
                    header={<IoMdInformationCircleOutline />}
                  />
                  <button
                    type="button"
                    className="flex justify-center items-center mx-3 py-1 px-3 rounded border border-slate-400 text-slate-400
                    hover:bg-slate-400 hover:text-white cursor-pointer"
                    onClick={() => setShowAddForm(!ShowAddForm)}
                  >
                    +Add
                  </button>
                </div>
                {/* add a note if user wants */}
                {ShowAddForm && (
                  <div className="pt-2 w-6/12">
                    <textarea
                      name="note"
                      className="border border-slate-400 rounded w-full"
                      rows={5}
                    ></textarea>
                    <div className="flex flex-col pt-2">
                      <span className="font-medium">Send Notification To</span>
                      <Select
                        value={SendNotificationTo} // Changed from defaultValue to value
                        onChange={handleChange}
                        options={AllUser}
                        isMulti={true}
                        className="css-control text-black bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-end pt-4">
                      <button
                        type="button"
                        className="text-white bg-slate-500 font-medium text-sm rounded py-2 px-4"
                        onClick={() => setShowAddForm(!ShowAddForm)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-500 font-medium text-sm rounded py-2 px-4"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </span>
            </div>
            <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
              <IoIosArrowDown />
            </div>
            <div
              className={`max-h-0 peer-checked:max-h-full
                transition-all ease-in-out duration-500 overflow-auto no-scrollbar mt-2`}
            >
              {NotesDetail.length > 0 ? (
                NotesDetail.map((val) => (
                  <div key={val.RowKey} className="notes text-sm pt-4">
                    <div className="flex gap-4">
                      <p>{val.Note}</p>
                      <span className="text-xl cursor-pointer">
                        <RiDeleteBin6Line />
                      </span>
                    </div>
                    <small className="text-slate-500">
                      {val.CreatedBy} on {FormatDate(val.Created)}
                    </small>
                  </div>
                ))
              ) : (
                <h1 className="text-xs px-2 pt-2">
                  - you have not added any note to this contract -
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Notes.propTypes = {
  NotesDetail: PropTypes.array,
};

export default Notes;
