// Function to remove '&' from keys and decode values
export function cleanAndDecodeData(data) {
  const cleanedData = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const cleanedKey = key.replace(/^&/, ""); // Remove leading '&'
      const decodedValue = decodeURIComponent(data[key]); // Decode URL-encoded value
      cleanedData[cleanedKey] = decodedValue;
    }
  }
  return cleanedData;
}
