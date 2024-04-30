import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function useRequestDetail(RowKey) {
  const [SingleRequestData, setSigleRequetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  // function to fetch the api to get the single request detail !!
  async function FetchSigleRequestDetail() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/requestDetails?requestId=${RowKey}`,
        { headers }
      );
      setSigleRequetData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchSigleRequestDetail();
  }, []);

  return { SingleRequestData, loading };
}

useRequestDetail.propTypes = {
  RowKey: PropTypes.string.isRequired,
};

export default useRequestDetail;
