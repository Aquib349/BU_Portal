import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const EditReqeustContext = createContext();

const headers = {
  "Content-Type": "application/json",
  "eContracts-ApiKey":
    "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
};

function EditRequestProvider({ children }) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [EditRequestMode, setEditRequetMode] = useState(false);
  const [EditRequest, setEditRequest] = useState("");

  // function to get the business area to edit the request
  async function EditRequestMetaData(RowKey) {
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/Requests/IRequestDetails?requestid=${RowKey}`,
        { headers }
      );
      //   console.log(response.data);
      setEditRequest(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <EditReqeustContext.Provider
      value={{
        EditRequestMetaData,
        EditRequest,
        setEditRequetMode,
        EditRequestMode,
      }}
    >
      {children}
    </EditReqeustContext.Provider>
  );
}

EditRequestProvider.propTypes = {
  children: PropTypes.any,
};

export default EditRequestProvider;
