import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const StatusContext = createContext();

function StatusProvider({ children }) {
  const [AllStatus, setAllStatus] = useState([]);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  // function to fetch all the users :
  async function FetchAllStatus() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/Requests/requeststatus`,
        { headers }
      );
      //   console.log(response.data);
      if (response.data) {
        // Extract usernames from the user data
        const usernamesFromApi = response.data?.map(
          (status) => status.RequestStatus
        );

        // Convert usernames to the desired format
        const options = usernamesFromApi?.map((status) => ({
          value: status.toLowerCase(),
          label: status.charAt(0).toUpperCase() + status.slice(1),
        }));
        setAllStatus(options);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchAllStatus();
  }, []);
  return (
    <StatusContext.Provider value={{ AllStatus }}>
      {children}
    </StatusContext.Provider>
  );
}

StatusProvider.propTypes = {
  children: PropTypes.any,
};

export default StatusProvider;
