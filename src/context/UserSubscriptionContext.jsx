import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserSubscription = createContext();

function UserSubscriptionProvider({ children }) {
  const [userSub, setUserSub] = useState([]);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  // function to get all the contract which is subscribed by user !!
  async function getUserSubscription() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/subscriptions?userName=Santosh Dutta`,
        { headers }
      );
      if (response.status === 404) {
        setUserSub([]);
      }
      setUserSub(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserSubscription();
  }, []);

  return (
    <UserSubscription.Provider value={{ userSub, getUserSubscription }}>
      {children}
    </UserSubscription.Provider>
  );
}

UserSubscriptionProvider.propTypes = {
  children: PropTypes.any,
};

export default UserSubscriptionProvider;
