import { useCallback, useContext, useEffect, useState } from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { UserContext } from "../../../context/UserContext";
import { RequestContext } from "../../../context/RequestContext";
import { RequestTypesContext } from "../../../context/RequestTypesContext";
import { StatusContext } from "../../../context/StatusContext";
import { motion, AnimatePresence } from "framer-motion";

function FilterRequests({ setFilteredData }) {
  const { RequestData } = useContext(RequestContext);
  const { AllUser } = useContext(UserContext);
  const { AllRequestTypes } = useContext(RequestTypesContext);
  const { AllStatus } = useContext(StatusContext);
  const [filteredData, setFilteredDataInternal] = useState(
    RequestData?.SubmittedRequests || [],
  );
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);
  const [requestStatus, setRequestStatus] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [requestType, setRequestType] = useState([]);

  // Function to apply all active filters
  const applyFilters = (status, users, type, date) => {
    let data = RequestData?.SubmittedRequests || [];

    if (status.length > 0) {
      const statusValues = status.map((s) => s.value.toLowerCase());
      data = data.filter((request) =>
        statusValues.includes(request.Status.toLowerCase()),
      );
    }

    if (users.length > 0) {
      const userValues = users.map((u) => u.value.toLowerCase());
      data = data.filter((request) =>
        userValues.includes(request.AssignedTo.toLowerCase()),
      );
    }

    if (type.length > 0) {
      const typeValues = type.map((t) => t.value.toLowerCase());
      data = data.filter((request) =>
        typeValues.includes(request.RequestType.toLowerCase()),
      );
    }

    if (date) {
      const formattedDate = format(date, "MM/dd/yyyy");
      data = data.filter((request) => {
        if (!request.RequiredByDate) return false;
        const requestDate = new Date(request.RequiredByDate);
        return format(requestDate, "MM/dd/yyyy") === formattedDate;
      });
    }

    return data;
  };

  const handleRequestStatus = useCallback(
    (status) => {
      setRequestStatus(status);
      const updatedData = applyFilters(status, assignedTo, requestType, date);
      setFilteredDataInternal(updatedData);
    },
    [assignedTo, requestType, date, RequestData],
  );

  const handleAssignedTo = useCallback(
    (user) => {
      setAssignedTo(user);
      const updatedData = applyFilters(requestStatus, user, requestType, date);
      setFilteredDataInternal(updatedData);
    },
    [requestStatus, requestType, date, RequestData],
  );

  const handleRequestType = useCallback(
    (type) => {
      setRequestType(type);
      const updatedData = applyFilters(requestStatus, assignedTo, type, date);
      setFilteredDataInternal(updatedData);
    },
    [requestStatus, assignedTo, date, RequestData],
  );

  const handleRequestDate = useCallback(
    (date) => {
      setDate(date);
      const updatedData = applyFilters(
        requestStatus,
        assignedTo,
        requestType,
        date,
      );
      setFilteredDataInternal(updatedData);
    },
    [requestStatus, assignedTo, requestType, RequestData],
  );

  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData, setFilteredData]);

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex cursor-pointer items-center justify-center gap-1 text-sm font-bold text-slate-500"
        onClick={() => setShow(!show)}
      >
        <span>
          <TbAdjustmentsHorizontal />
        </span>
        <span>Filter</span>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            className="absolute right-0 z-10 mt-4 w-80 rounded border border-slate-200 bg-gray-200 pb-8"
          >
            <div className="relative">
              <div
                className="absolute right-1 top-1 cursor-pointer font-bold"
                onClick={() => setShow(!show)}
              >
                <RxCross2 />
              </div>
            </div>
            <div className="px-2 py-1">
              <form className="text-sm">
                <div className="flex flex-col pt-1">
                  <span>Request Status</span>
                  <Select
                    defaultValue={requestStatus}
                    onChange={handleRequestStatus}
                    options={AllStatus}
                    isMulti={true}
                    className="css-control bg-white text-black"
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <span>Assigned To</span>
                  <Select
                    defaultValue={assignedTo}
                    onChange={handleAssignedTo}
                    options={AllUser}
                    isMulti={true}
                    className="css-control bg-white text-black"
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <span>Request Type</span>
                  <Select
                    defaultValue={requestType}
                    onChange={handleRequestType}
                    options={AllRequestTypes}
                    isMulti={true}
                    className="css-control bg-white text-black"
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <span>Request By Date</span>
                  <DatePicker
                    className="w-full rounded-md border border-slate-400 p-2 text-sm outline-blue-400"
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={handleRequestDate}
                    placeholderText="Pick date"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

FilterRequests.propTypes = {
  setFilteredData: PropTypes.func.isRequired,
};

export default FilterRequests;
