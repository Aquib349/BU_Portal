import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  const [RequestData, setRequestData] = useState([]);
  const api = import.meta.env.VITE_API_URL;
  const user_key = import.meta.env.VITE_USER_KEY;

  const fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "eContracts-ApiKey":
          "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
      };

      const response = await axios.post(
        `${api}/api/accounts/${user_key}/portal/submittedRequests?username=Santosh Dutta`,
        {},
        { headers }
      );
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RequestContext.Provider value={{ RequestData }}>
      {children}
    </RequestContext.Provider>
  );
};

RequestProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RequestProvider;
