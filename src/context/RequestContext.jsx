import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  const [RequestData, setRequestData] = useState([]);

  useEffect(() => {
    const requests = [
      {
        id: 1,
        requests: "Request for Usability Testing [2]",
        status: "Request Completed",
        user: "Window User",
        due_date: "12/04/2023",
      },
      {
        id: 2,
        requests: "Request for Usability Testing [1]",
        status: "Awaiting Approval",
        user: "Linus User",
        due_date: "12/04/2023",
      },
      {
        id: 3,
        requests: "Request for MSA/02",
        status: "New",
        user: "Window User",
        due_date: "11/27/2023",
      },
      {
        id: 4,
        requests: "Request for PPA/02",
        status: "Cancel",
        user: "Window User",
        due_date: "11/27/2023",
      },
      {
        id: 5,
        requests: "Request for NDA",
        status: "Approved",
        user: "Linux User",
        due_date: "11/27/2023",
      },
      {
        id: 6,
        requests: "Request for NCRDA",
        status: "On Hold",
        user: "Linux User",
        due_date: "11/07/2023",
      },
    ];
    setRequestData(requests);
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
