import PropTypes from "prop-types";
import DocumentResult from "./DocumentResult";
import ContractResult from "./ContractResult";
import CounterpartyResult from "./CounterpartyResult";

function SearchResult({ results, DropDownValue }) {
  return (
    <>
      <div className="">
        {/* contracts */}
        {DropDownValue === "ContractTitle" && <ContractResult DATA={results} />}

        {/* documents */}
        {DropDownValue === "DocumentName" && <DocumentResult DATA={results} />}

        {/* counterpary */}
        {DropDownValue === "CounterpartyName" && (
          <CounterpartyResult DATA={results} />
        )}
      </div>
    </>
  );
}

SearchResult.propTypes = {
  results: PropTypes.array,
};
export default SearchResult;
