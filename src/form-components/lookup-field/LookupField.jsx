import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectLookUp from "./project-name/ProjectLookUp";
import CounterpartyLookUp from "./counterparty/CounterpartyLookUp";

const headers = {
  "Content-Type": "application/json",
  "eContracts-ApiKey":
    "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
};

const LookupField = ({
  fieldname,
  options,
  title,
  baseline,
  required,
  validate,
  initialValue,
}) => {
  // console.log(initialValue);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const [LookupValue, setLookupValue] = useState(null);

  const [CounterParty, setCounterparty] = useState([]);
  const [ProjectName, setProjectName] = useState([]);
  const [SelectedProjectName, setSelectedProjectName] = useState(
    initialValue || ""
  );
  const [SelectedProjectTask, setSelectedProjectTask] = useState(
    initialValue || ""
  );
  const [SelectedCounterPartyName, setSelectedCounterPartyName] = useState("");

  useEffect(() => {
    if (initialValue) {
      const initialOption = options.find(
        (option) => option.label === initialValue
      );
      if (initialOption) {
        setLookupValue(initialOption);
      }
    }
  }, [initialValue, options]);

  // if the field type is normal lookup
  const handleChange = (selectedOption) => {
    setLookupValue(selectedOption);
    validate(fieldname, selectedOption.label, required);
  };

  // function to get the project name !!
  async function getProjectName() {
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/project`,
        { headers }
      );
      setProjectName(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // function to get all the counterparty
  async function getCounterParty() {
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/counterparty`,
        { headers }
      );
      setCounterparty(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjectName();
    getCounterParty();

    let fieldData;

    if (fieldname === "Project") {
      fieldData = [
        { Project: SelectedProjectName },
        { ProjectTask: SelectedProjectTask },
      ];
    } else if (fieldname === "Counterparty") {
      fieldData = SelectedCounterPartyName;
    } else {
      fieldData = LookupValue;
    }

    if (validate) {
      validate(fieldname, fieldData, required);
    }
  }, [SelectedProjectName, SelectedProjectTask, SelectedCounterPartyName]);

  if (fieldname === "Project") {
    return (
      <div className="pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <ProjectLookUp
          ProjectName={ProjectName}
          baseline={baseline}
          setSelectedProjectName={setSelectedProjectName}
          setSelectedProjectTask={setSelectedProjectTask}
          initialValue={initialValue}
        />
      </div>
    );
  }

  if (fieldname === "Counterparty") {
    return (
      <div className="pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <CounterpartyLookUp
          CounterParty={CounterParty}
          setSelectedCounterPartyName={setSelectedCounterPartyName}
          initialValue={initialValue}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    );
  }
  return (
    <>
      <div className="pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <Select
          value={LookupValue}
          onChange={handleChange}
          options={options}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

LookupField.propTypes = {
  fieldname: PropTypes.string,
  options: PropTypes.array,
  title: PropTypes.any,
  baseline: PropTypes.string,
  required: PropTypes.any,
  LookupValue: PropTypes.any,
  setLookupValue: PropTypes.func,
  validate: PropTypes.func,
};

export default LookupField;
