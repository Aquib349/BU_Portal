// constants function to un-subscribe the contracts
import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const account_id = import.meta.env.VITE_USER_KEY;

export async function UnSubscribe(id) {
  const headers = {
    "Content-Type": "application/json",
    "eContracts-ApiKey":
      "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
  };
  try {
    const response = await axios.delete(
      `${api}/api/accounts/${account_id}/portal/subscription?subscriptionId=${id}`,
      { headers },
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
