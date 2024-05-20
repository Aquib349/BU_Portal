import axios from "axios";
import { useEffect, useState } from "react";

function usePortalConfig() {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [ConfigData, setConfigData] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // function to split the business areas
  function SplitBusinessAreas(data) {
    const items = data.split(";").map((item) => {
      const [name, businessArea, id] = item.split("~");
      return {
        name: name.trim(),
        businessArea: businessArea.trim(),
        id: id.trim(),
      };
    });
    return items;
  }

  // function to split request types
  function SplitRequestTypes(data) {
    // Split the string into an array of agreement types
    const agreementTypes = data.split(";");

    // Map each agreement type to a JSON object with id and type properties
    const agreementObjects = agreementTypes.map((type) => {
      return {
        id: Math.random().toString(36).substr(2, 9), // Generate random id
        type: type.trim(), // Trim any whitespace around the type
      };
    });
    return agreementObjects;
  }

  async function getBusinessPortalConfig() {
    const NewData = [];
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/config`,
        { headers }
      );
      NewData.push({
        RequestBusinessAreas: SplitBusinessAreas(
          response.data.RequestBusinessAreas
        ),
        RequestTypes: SplitRequestTypes(response.data.RequestTypes),
        DocumentTypes: response.data.DocumentTypes,
        KeyContacts: response.data.KeyContacts,
        SearchSetup: response.data.SearchSetup,
        SearchSetupInBytes: response.data.SearchSetupInBytes,
        CreatedBy: response.data.CreatedBy,
        Created: response.data.Created,
        ModifiedBy: response.data.ModifiedBy,
        Modified: response.data.Modified,
        IsMultiBusinessAreaRoute: response.data.IsMultiBusinessAreaRoute,
        DisplayRequestStatus: response.data.DisplayRequestStatus,
        DefaultRequestBusinessArea: response.data.DefaultRequestBusinessArea,
        PartitionKey: response.data.PartitionKey,
        RowKey: response.data.RowKey,
        Timestamp: response.data.Timestamp,
        ETag: response.data.ETag,
      });
      setShowStatus(response.data.DisplayRequestStatus);
      setConfigData(NewData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    getBusinessPortalConfig();
  }, []);

  return { ConfigData, loading, showStatus };
}

export default usePortalConfig;
