import axios from "axios";
import { useEffect, useState } from "react";

function useContractStatusUpdates(ID) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const headers = {
    "Content-Type": "application/json",
    "eContracts-ApiKey":
      "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
  };
  const [contractStatus, setContractStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get the contract status
  async function getContractStatus(ID) {
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/Contracts/${ID}/statusPosts`,
        { headers },
      );
    //   console.log("API response:", response.data);
      setContractStatus(response.data);
    } catch (error) {
      console.error("Error fetching contract status:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContractStatus(ID);
  }, [ID]);

  return { contractStatus, loading, error };
}

export default useContractStatusUpdates;
