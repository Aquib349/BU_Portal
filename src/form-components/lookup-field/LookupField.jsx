import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectLookUp from "./project-name/ProjectLookUp";
import CounterpartyLookUp from "./counterparty/CounterpartyLookUp";

const LookupField = ({
  fieldname,
  options,
  title,
  baseline,
  required,
  LookupValue,
  setLookupValue,
  validate,
}) => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [ProjectName, setProjectName] = useState([]);
  const [ProjectTask, setProjectTask] = useState([]);

  // function to get the project name !!
  async function getProjectName() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

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

  // function to get the project task based on the project name !!
  async function getProjectTask() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/config`,
        { headers }
      );
      setProjectTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjectName();
    getProjectTask();
    if (validate) {
      validate(fieldname, ProjectName, required);
    }
  }, []);

  if (fieldname === "Project") {
    return (
      <div className="pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <ProjectLookUp ProjectName={ProjectName} baseline={baseline} />
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
        <CounterpartyLookUp ProjectTask={ProjectTask} />
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
          defaultValue={LookupValue}
          onChange={setLookupValue}
          options={options}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

LookupField.propTypes = {
  fieldname: PropTypes.string,
  options: PropTypes.array,
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  LookupValue: PropTypes.string,
  setLookupValue: PropTypes.func,
  validate: PropTypes.func,
};

export default LookupField;