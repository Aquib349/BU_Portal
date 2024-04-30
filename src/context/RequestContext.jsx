import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Shimmer from "../shimmer/DashboardShimmer";

export const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  const [RequestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "eContracts-ApiKey":
          "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
      };

      const response = await axios.post(
        `${api}/api/accounts/${account_id}/portal/submittedRequests?username=Santosh Dutta`,
        {},
        { headers }
      );
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render loading indicator if data is still being fetched
  if (loading) {
    return <div><Shimmer/></div>;
  }

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
