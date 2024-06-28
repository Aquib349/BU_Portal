import axios from "axios";

// Function to create a dynamic form based on the request type
export async function fetchDynamicFormData(
  requestType,
  api,
  account_id,
  headers,
) {
  try {
    const response = await axios.get(
      `${api}/api/accounts/${account_id}/Requests/requesttypes/metadatas?requesttypename=${requestType}`,
      { headers },
    );

    if (response.status === 200) {
      const data = response.data;
      const filteredData = data.filter(
        (item) =>
          item.FieldDisplayName !== "Request Type" &&
          item.FieldDisplayName !== "Business Area",
      );
      return filteredData;
    } else {
      throw new Error("Could not create");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
