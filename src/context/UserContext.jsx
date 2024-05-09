import { useEffect, createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [AllUser, setAllUser] = useState([]);
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  // function to fetch all the users :
  async function FetchAllUser() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/users/coreentitynew`,
        { headers }
      );
      if (response.data) {
        // Extract usernames from the user data
        const usernamesFromApi = response.data?.CoreUsers?.map(
          (user) => user.UserName
        );

        // Convert usernames to the desired format
        const options = usernamesFromApi?.map((username) => ({
          value: username.toLowerCase(),
          label: username.charAt(0).toUpperCase() + username.slice(1),
        }));
        setAllUser(options);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchAllUser();
  }, []);

  return (
    <UserContext.Provider value={{ AllUser }}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default UserProvider;
