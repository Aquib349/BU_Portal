import PropTypes from "prop-types";
import Select from "react-select";
import { useContext, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import axios from "axios";
import SpinnerTwo from "../../../../../Elements/spinner2/SpinnerTwo";
import toast from "react-hot-toast";

const toastOptions = {
  position: "top-center",
  style: {
    backgroundColor: "black",
    color: "white",
    fontSize: "0.8rem",
  },
};

function AddNewNote({
  ContractID,
  setShowAddForm,
  ShowAddForm,
  getContractSummary,
}) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [contractNote, setContractNote] = useState("");
  const [SendNotificationTo, setSendNotificationTo] = useState("");
  const [Loading, setLoading] = useState(false);
  const { AllUser } = useContext(UserContext);

  const handleChange = (selectedOption) => {
    let concatenatedLabels = "";
    let multi = true;
    if (multi) {
      concatenatedLabels = selectedOption
        ? selectedOption.map((option) => option.label).join(";")
        : "";
      setSendNotificationTo(
        selectedOption
          ? selectedOption.map((option) => option.label).join(";")
          : "",
      );
    } else {
      concatenatedLabels = selectedOption ? selectedOption.label : "";
      setSendNotificationTo(selectedOption ? selectedOption.label : "");
    }
  };

  // function to add note to contract
  async function handleContractNoteSumbit() {
    setLoading(true);
    const note = {
      ContractID: ContractID,
      Note: contractNote,
      SendTo: SendNotificationTo,
      CreatedBy: "Santosh Dutta",
    };

    const headers = {
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.post(
        `${api}/api/accounts/${account_id}/contracts/${ContractID}/notes`,
        note,
        { headers },
      );
      getContractSummary(ContractID);
      if (response.data.Message === "Note Created") {
        toast.success("Note Created", toastOptions);
        setSendNotificationTo("");
        setContractNote("");
        setShowAddForm(!ShowAddForm);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {Loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerTwo />
        </div>
      ) : (
        <div className="add-note w-6/12 pt-4">
          <div className="flex flex-col pb-3">
            <label className="text-sm">
              Notes
              <span className={`font-bold text-red-500`}>*</span>
            </label>
            <textarea
              name="contractNotes"
              rows={4}
              value={contractNote}
              className="w-full rounded-md border border-slate-400 p-2 text-sm outline-blue-500"
              onChange={(e) => setContractNote(e.target.value)}
            />
          </div>
          <div className="pb-3">
            <label className="text-sm">Send Notification To</label>
            <Select
              defaultValue={contractNote}
              onChange={handleChange}
              options={AllUser}
              isMulti={true}
              className="css-control bg-white text-black"
            />
          </div>
          <div className="btn flex justify-end gap-2 pt-4 text-white">
            <button
              type="button"
              className="rounded-md bg-slate-600 px-8 py-2 text-sm"
              onClick={() => setShowAddForm(!ShowAddForm)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-500 px-8 py-2 text-sm"
              onClick={handleContractNoteSumbit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

AddNewNote.propTypes = {
  AddNoteModal: PropTypes.bool,
  setAddNoteModal: PropTypes.func,
  ContractID: PropTypes.string,
};

export default AddNewNote;
