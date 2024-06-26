import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Shimmer from "../shimmer/DashboardShimmer";

export const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  const [RequestData, setRequestData] = useState([]);
  const [AllRequestStatus, setAllRequestStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const fetchData = async () => {
    let statusCounts = {
      completed: 0,
      New: 0,
      hold: 0,
      awaiting: 0,
      approved: 0,
      cancel: 0,
    };
    const RequestStatus = [];
    try {
      const user = localStorage.getItem("username");
      const headers = {
        "Content-Type": "application/json",
        "eContracts-ApiKey":
          "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
      };

      const response = await axios.post(
        `${api}/api/accounts/${account_id}/portal/submittedRequests?username=${user}`,
        {},
        { headers },
      );

      const requests = response.data.SubmittedRequests;

      // count the occurence of each status types
      requests.forEach((request) => {
        const status = request.Status.toLowerCase();
        if (status.includes("awaiting")) {
          statusCounts["awaiting"]++;
        }
        if (status.includes("new")) {
          statusCounts["New"]++;
        }
        if (status.includes("complete")) {
          statusCounts["completed"]++;
        }
        if (status.includes("cancel")) {
          statusCounts["cancel"]++;
        }
        if (status.includes("approved")) {
          statusCounts["approved"]++;
        }
        if (status.includes("on hold")) {
          statusCounts["hold"]++;
        }
      });

      // Convert the statusCounts object into the RequestStatus array
      for (const [status, count] of Object.entries(statusCounts)) {
        RequestStatus.push(count);
      }

      setAllRequestStatus(RequestStatus);
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render loading indicator if data is still being fetched
  if (loading) {
    return (
      <div>
        <Shimmer />
      </div>
    );
  }

  return (
    <RequestContext.Provider value={{ RequestData, AllRequestStatus }}>
      {children}
    </RequestContext.Provider>
  );
};

RequestProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RequestProvider;
