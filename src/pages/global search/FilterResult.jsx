import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";

function FilterResult({ Data, setGlobalFilteredData }) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const headers = {
    "Content-Type": "application/json",
    "eContracts-ApiKey":
      "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
  };

  const [ContractTypeData, setContractTypeData] = useState([]);
  const [ContractStatusData, setContractStatusData] = useState([]);

  const [ContractType, setContractType] = useState([]);
  const [ContractStatus, setContractStatus] = useState([]);
  const [InternalFilter, setInternalFilter] = useState(Data || []);
  const [show, setShow] = useState(false);

  // function to fetch the data of contract type and contract status !!
  async function fetchData() {
    try {
      const response1 = await axios.get(
        `${api}/api/accounts/${account_id}/contracttypescorenometadata`,
        { headers },
      );

      const type = response1.data.map((ct) => ({
        value: ct.ContractType?.toLowerCase(),
        label: ct.ContractType,
      }));
      setContractTypeData(type);

      const response2 = await axios.get(
        `${api}/api/accounts/${account_id}/contractstatusesbyCLM`,
        { headers },
      );

      const filteredStatuses = [
        ...new Set(
          response2.data.allStatus.filter(
            (status) => !status.includes("Amendment") && status !== "Approved",
          ),
        ),
      ];

      const status = filteredStatuses.map((cs) => ({
        value: cs?.toLowerCase(),
        label: cs,
      }));
      setContractStatusData(status);
    } catch (error) {
      console.log(error);
    }
  }

  // filter to apply on global search result
  const applyFilters = (type, status) => {
    let data = Data || [];

    if (type.length > 0) {
      const contractType = type.map((s) => s.value?.toLowerCase());
      data = data.filter((cType) =>
        contractType.includes(cType.ContractType?.toLowerCase()),
      );
    }

    if (status.length > 0) {
      const contractStatus = status.map((u) => u.value?.toLowerCase());
      data = data.filter((cStatus) =>
        contractStatus.includes(cStatus.Status?.toLowerCase()),
      );
    }

    return data;
  };

  // function to handle contract type
  const handleContractType = useCallback(
    (Ctype) => {
      setContractType(Ctype);
      const updatedData = applyFilters(Ctype, ContractStatus);
      setInternalFilter(updatedData);
    },
    [ContractStatus, Data],
  );

  // function to handle contract status
  const handleContractStatus = useCallback(
    (Cstatus) => {
      setContractStatus(Cstatus);
      const updatedData = applyFilters(ContractType, Cstatus);
      setInternalFilter(updatedData);
    },
    [ContractType, Data],
  );

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGlobalFilteredData(InternalFilter);
  }, [InternalFilter, setGlobalFilteredData]);

  return (
    <>
      <div className="relative">
        <div className="filter-button">
          <button
            type="button"
            className="rounded bg-gray-200 p-2 focus:ring-2"
            onClick={() => setShow(!show)}
          >
            <HiMiniAdjustmentsVertical />
          </button>
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
                    <span>Contract Type</span>
                    <Select
                      defaultValue={ContractType}
                      onChange={handleContractType}
                      options={ContractTypeData}
                      isMulti={true}
                      className="css-control bg-white text-black"
                    />
                  </div>
                  <div className="flex flex-col pt-2">
                    <span>Contract Status</span>
                    <Select
                      defaultValue={ContractStatus}
                      onChange={handleContractStatus}
                      options={ContractStatusData}
                      isMulti={true}
                      className="css-control bg-white text-black"
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

FilterResult.propTypes = {
  Data: PropTypes.array,
  setGlobalFilteredData: PropTypes.func,
};

export default FilterResult;
