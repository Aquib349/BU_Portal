// Function to convert fieldValues to query string
export const convertToQueryString = (fieldValues) => {
  return Object.keys(fieldValues)
    .map((key) => `${key}=${fieldValues[key] !== null ? fieldValues[key] : ""}`)
    .join("");
};
