import { IoMdInformationCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import FormatDate from "../../../../../constants/FormatDate";
import Tooltip from "../../../../../Elements/Tooltip";
import Accordion from "../../../../../Elements/Accordion";
import AddNewNote from "./AddNewNote";
import SpinnerTwo from "../../../../../Elements/spinner2/SpinnerTwo";

function Notes({ NotesDetail, ContractID, getContractSummary, loading }) {
  const [ShowAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <div className="notes-component mt-4 rounded-md border border-slate-300">
        <div className="main text-sm">
          <Accordion
            heading={
              <div className="w-full">
                <span className="">
                  <div className="flex items-center gap-1">
                    <h1 className="text-lg">Notes</h1>
                    <Tooltip
                      message="Add a note to this Contract"
                      header={<IoMdInformationCircleOutline />}
                    />
                    <button
                      type="button"
                      className="mx-3 flex cursor-pointer items-center justify-center rounded border border-slate-400 px-3 py-1 text-slate-400 hover:bg-slate-400 hover:text-white"
                      onClick={() => setShowAddForm(!ShowAddForm)}
                    >
                      +Add
                    </button>
                  </div>
                </span>
                {ShowAddForm && (
                  <AddNewNote
                    ContractID={ContractID}
                    ShowAddForm={ShowAddForm}
                    setShowAddForm={setShowAddForm}
                    getContractSummary={getContractSummary}
                  />
                )}
              </div>
            }
            checked={true}
            bgRequired={false}
          >
            {loading ? (
              <SpinnerTwo />
            ) : NotesDetail.length > 0 ? (
              NotesDetail.map((val) => (
                <div key={val.RowKey} className="notes pt-4 text-sm">
                  <div className="flex gap-4">
                    <p>{val.Note}</p>
                    <span className="cursor-pointer text-xl">
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                  <small className="text-slate-500">
                    {val.CreatedBy} on {FormatDate(val.Created)}
                  </small>
                </div>
              ))
            ) : (
              <h1 className="px-2 pt-2 text-xs">
                - you have not added any note to this contract -
              </h1>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}

Notes.propTypes = {
  NotesDetail: PropTypes.array,
};

export default Notes;
