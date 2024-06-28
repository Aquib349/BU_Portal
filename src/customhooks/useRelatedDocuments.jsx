import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function useRelatedDocuments(RowKey) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [DocumentData, setDocumentData] = useState([]);
  const [loader, setLoader] = useState(true);

  // Function to fetch all the related documents of a single request
  async function getRelatedDocument(RowKey) {
    if (RowKey) {
      const headers = {
        "Content-Type": "application/json",
        "eContracts-ApiKey":
          "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
      };
      try {
        const response = await axios.get(
          `${api}/api/accounts/${account_id}/Requests/documents?requestid=${RowKey}`,
          { headers },
        );
        setLoader(false);
        setDocumentData(response.data);
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  }

  useEffect(() => {
    getRelatedDocument(RowKey);
  }, [RowKey]);

  return { DocumentData, loader, getRelatedDocument, setLoader };
}

useRelatedDocuments.propTypes = {
  RowKey: PropTypes.string.isRequired,
};

export default useRelatedDocuments;
