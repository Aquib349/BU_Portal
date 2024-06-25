import axios from "axios";

// Function to get contractAdministrator, businessAreaOwner, businessAreaPath
export async function fetchDetail(api, account_id, headers, id, contractAreaName) {
  try {
    // Perform all three API calls concurrently
    const [response1, response2, response3] = await Promise.all([
      axios.get(
        `${api}/api/accounts/${account_id}/businessarea?businessareaid=${id}`,
        { headers },
      ),
      axios.get(
        `${api}/api/accounts/${account_id}/businessarea/businessarealocation?businessareaid=${id}`,
        { headers },
      ),
      axios.get(
        `${api}/api/accounts/${account_id}/businessarea/contractareadetailsbyname?contractareaname=${contractAreaName}`,
        { headers },
      ),
    ]);

    // Destructure data from responses
    const { data: data1 } = response1;
    const { data: data2 } = response2;
    const { data: data3 } = response3;
    // Return the necessary data
    return {
      businessAreaOwners: data1,
      businessAreaPath: data2,
      contractAreaAdministrators: data3,
    };
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
}
