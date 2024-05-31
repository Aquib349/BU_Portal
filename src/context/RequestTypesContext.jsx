import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const RequestTypesContext = createContext();

function RequestTypesProvider({ children }) {
  const [AllRequestTypes, setAllRequestTypes] = useState([]);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  // function to fetch all the users :
  async function FetchRequestTypes() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/requesttypes`,
        { headers }
      );
      if (response.data) {
        // Extract usernames from the user data
        const usernamesFromApi = response.data?.map((type) => type.RequestType);

        // Convert usernames to the desired format
        const options = usernamesFromApi?.map((requestType) => ({
          value: requestType.toLowerCase(),
          label: requestType.charAt(0).toUpperCase() + requestType.slice(1),
        }));
        setAllRequestTypes(options);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchRequestTypes();
  }, []);
  return (
    <RequestTypesContext.Provider value={{ AllRequestTypes }}>
      {children}
    </RequestTypesContext.Provider>
  );
}

RequestTypesProvider.propTypes = {
  children: PropTypes.any,
};

export default RequestTypesProvider;
