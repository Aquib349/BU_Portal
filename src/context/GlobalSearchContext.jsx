import { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const GlobalSearchContext = createContext();

const GlobalSearchProvider = ({ children }) => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [DropDownValue, setDropDownValue] = useState("ContractTitle");
  const [sort, setSort] = useState("Recently Updated");
  const [searchText, setSearchText] = useState("");
  const [SearchQuery, setSearchQuery] = useState("");
  const [GlobalSearchData, setGlobalSearchData] = useState([]);
  const [GlobalFilteredData, setGlobalFilteredData] = useState([]);
  const [DataLoading, setDataLoading] = useState(false);

  // function to handle the global search
  const handleGlobalSearch = useCallback(async () => {
    const userType = localStorage.getItem("userType");
    setDataLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const searchParams = {
        customquery: "",
        searchkeyword: `${DropDownValue}: ${searchText || SearchQuery}`,
        MatchExact: "Exact Keyword",
        userType,
        sortBy: sort,
      };
      let endpoint = "";

      if (DropDownValue === "ContractTitle") {
        endpoint = "contractSearch";
      } else if (DropDownValue === "DocumentName") {
        endpoint = "documentSearch";
      } else if (DropDownValue === "CounterpartyName") {
        endpoint = "counterpartySearch";
      }

      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/${endpoint}`,
        { headers, params: searchParams },
      );

      const responseDataKey =
        DropDownValue === "ContractTitle"
          ? "ContractSearch"
          : DropDownValue === "DocumentName"
            ? "DocumentSearch"
            : "CounterpartySearch";

      setGlobalSearchData(response.data[responseDataKey]);
      setGlobalFilteredData(response.data[responseDataKey]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setDataLoading(false);
    }
  }, [DropDownValue, sort, searchText, SearchQuery]);

  return (
    <GlobalSearchContext.Provider
      value={{
        handleGlobalSearch,
        DropDownValue,
        setDropDownValue,
        setSort,
        sort,
        setSearchText,
        searchText,
        GlobalSearchData,
        DataLoading,
        SearchQuery,
        setSearchQuery,
        GlobalFilteredData,
        setGlobalFilteredData,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
};

GlobalSearchProvider.propTypes = {
  children: PropTypes.any,
};

export default GlobalSearchProvider;
