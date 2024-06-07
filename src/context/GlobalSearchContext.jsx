import { createContext, useState, useCallback } from "react";
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
  const [DataLoading, setDataLoading] = useState(false);

  // function to handle the global search
  const handleGlobalSearch = useCallback(async () => {
    console.log(SearchQuery);
    setDataLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      if (DropDownValue === "ContractTitle") {
        const response = await axios.get(
          `${api}/api/accounts/${account_id}/portal/contractSearch?customquery=` +
            "&searchkeyword=" +
            encodeURIComponent(
              `${DropDownValue}: ${searchText || SearchQuery}`
            ) +
            `&MatchExact=Exact Keyword` +
            `&userType=Global Contract Owner;Account Owner;Contract Area Administrator;Business Area Owner;Business User;Portal User` +
            `&sortBy=${sort}`,
          { headers }
        );
        setGlobalSearchData(response.data);
      } else if (DropDownValue === "DocumentName") {
        const response = await axios.get(
          `${api}/api/accounts/${account_id}/portal/documentSearch?` +
            `customquery=` +
            `&searchkeyword=${DropDownValue}: ${searchText || SearchQuery}` +
            `&MatchExact=Exact Keyword` +
            `&userType=Global Contract Owner;Account Owner;Contract Area Administrator;Business Area Owner;Business User;Portal User` +
            `&sortBy=${sort}`,
          { headers }
        );
        setGlobalSearchData(response.data);
      } else if (DropDownValue === "CounterpartyName") {
        const response = await axios.get(
          `${api}/api/accounts/${account_id}/portal/counterpartySearch?` +
            `customquery=` +
            `&searchkeyword=${DropDownValue}: ${searchText || SearchQuery}` +
            `&MatchExact=Exact Keyword` +
            `&sortBy=${sort}`,
          { headers }
        );
        setGlobalSearchData(response.data);
      }
    } catch (error) {
      console.error("Error fetching contract data:", error);
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
