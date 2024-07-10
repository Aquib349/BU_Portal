import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import { useCallback, useEffect, useState } from "react";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";
import { FetchFilter } from "../../constants/Globalsearch functions/FetchFilter";

function FilterResult({ Data, setGlobalFilteredData, DropDownValue }) {
  const [ContractTypeData, setContractTypeData] = useState([]);
  const [ContractStatusData, setContractStatusData] = useState([]);
  const [GlobalorRegional, setGlobalorRegional] = useState([]);

  const [Type, setType] = useState([]);
  const [Status, setStatus] = useState([]);
  const [GRCounterParty, setGRCounterparty] = useState([]);
  const [InternalFilter, setInternalFilter] = useState(Data || []);
  const [show, setShow] = useState(false);

  // function to fetch the data of contract type and contract status !!
  async function fetchData() {
    try {
      const { type, status, GlobalorRegional } =
        await FetchFilter(DropDownValue);
      setContractTypeData(type);
      setContractStatusData(status);
      setGlobalorRegional(GlobalorRegional);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // filter to apply on global search result
  const applyFilters = (type, status, gr) => {
    let data = Data || [];

    const filterByTypeAndStatus = (itemType, itemStatus) => {
      const filteredData = data.filter((item) => {
        const typeMatch =
          type.length === 0 ||
          type.some(
            (t) => t.value.toLowerCase() === item[itemType]?.toLowerCase(),
          );
        const statusMatch =
          status.length === 0 ||
          status.some(
            (s) => s.value.toLowerCase() === item[itemStatus]?.toLowerCase(),
          );
        const grMatch =
          gr.length === 0 ||
          gr.some(
            (g) => g.value.toLowerCase() === item.IsGlobal?.toLowerCase(),
          );

        return typeMatch && statusMatch && grMatch;
      });

      return filteredData;
    };

    switch (DropDownValue) {
      case "ContractTitle":
        return filterByTypeAndStatus("ContractType", "Status");
      case "DocumentName":
        return filterByTypeAndStatus("DocumentType", "DocumentStatus");
      case "CounterpartyName":
        return filterByTypeAndStatus("CounterpartyType", "Status");
      default:
        return data;
    }
  };

  // function to handle contract type
  const handleContractType = useCallback(
    (Ctype) => {
      setType(Ctype);
      const updatedData = applyFilters(Ctype, Status, []);
      setInternalFilter(updatedData);
    },
    [Status, Data],
  );

  // function to handle contract status
  const handleContractStatus = useCallback(
    (Cstatus) => {
      setStatus(Cstatus);
      const updatedData = applyFilters(Type, Cstatus, []);
      setInternalFilter(updatedData);
    },
    [Type, Data],
  );

  // function to handle the global or regional of counterparty
  function handleGlobalorRegional(GR) {
    setGRCounterparty(GR);
    const updatedData = applyFilters(Type, Status, GR);
    setInternalFilter(updatedData);
  }

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
  }, [DropDownValue]);

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
                    <span>
                      {DropDownValue === "ContractTitle"
                        ? "Contract"
                        : DropDownValue === "DocumentName"
                          ? "Document"
                          : DropDownValue === "CounterpartyName"
                            ? "Counterparty"
                            : ""}{" "}
                      Type
                    </span>
                    <Select
                      defaultValue={Type}
                      onChange={handleContractType}
                      options={ContractTypeData}
                      isMulti={true}
                      className="css-control bg-white text-black"
                    />
                  </div>
                  {DropDownValue === "CounterpartyName" && (
                    <div className="flex flex-col pt-2">
                      <span>Counterparty Regional or Global</span>
                      <Select
                        defaultValue={GRCounterParty}
                        onChange={handleGlobalorRegional}
                        options={GlobalorRegional}
                        isMulti={true}
                        className="css-control bg-white text-black"
                      />
                    </div>
                  )}
                  <div className="flex flex-col pt-2">
                    <span>
                      {DropDownValue === "ContractTitle"
                        ? "Contract"
                        : DropDownValue === "DocumentName"
                          ? "Document"
                          : DropDownValue === "CounterpartyName"
                            ? "Counterparty"
                            : ""}{" "}
                      Status
                    </span>
                    <Select
                      defaultValue={Status}
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
