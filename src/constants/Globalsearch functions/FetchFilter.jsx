import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const accountId = import.meta.env.VITE_USER_KEY;
const headers = {
  "Content-Type": "application/json",
  "eContracts-ApiKey":
    "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
};

export async function FetchFilter(DropDownValue) {
  try {
    // if the globalsearch dropdown value is contract title
    if (DropDownValue === "ContractTitle") {
      const response1 = await axios.get(
        `${api}/api/accounts/${accountId}/contracttypescorenometadata`,
        { headers },
      );

      const type = response1.data.map((ct) => ({
        value: ct.ContractType?.toLowerCase(),
        label: ct.ContractType,
      }));

      const response2 = await axios.get(
        `${api}/api/accounts/${accountId}/contractstatusesbyCLM`,
        { headers },
      );

      const filteredStatuses = [
        ...new Set(
          response2.data.allStatus.filter(
            (status) => !status.includes("Amendment") && status !== "Approved",
          ),
        ),
      ];

      const status = filteredStatuses.map((cs) => ({
        value: cs?.toLowerCase(),
        label: cs,
      }));

      return { type, status };
    }

    // if the globalsearch dropdown value is document name
    if (DropDownValue === "DocumentName") {
      const response = await axios.get(
        `${api}/api/accounts/${accountId}/documenttypes`,
        { headers },
      );

      const type = response.data.map((dt) => ({
        value: dt.TypeName?.toLowerCase(),
        label: dt.TypeName,
      }));

      const status = [
        { value: "active", label: "Active" },
        { value: "awaiting review", label: "Awaiting Review" },
        { value: "awaiting signatures", label: "Awaiting Signatures" },
        { value: "expired", label: "Expired" },
        { value: "in negotiation", label: "In Negotiation" },
        { value: "negotiation complete", label: "Negotiation Complete" },
        { value: "new", label: "New" },
      ];

      return { type, status };
    }

    // if the globalsearch dropdown value is counterparty name
    if (DropDownValue === "CounterpartyName") {
      const response = await axios.get(
        `${api}/api/accounts/${accountId}/counterpartytypes`,
        { headers },
      );

      const type = response.data.map((ctp) => ({
        value: ctp.TypeName?.toLowerCase(),
        label: ctp.TypeName,
      }));

      const status = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ];

      const GlobalorRegional = [
        { value: "yes", label: "Global" },
        { value: "no", label: "Regional" },
      ];

      return { type, status, GlobalorRegional };
    } else {
      throw new Error(`Unknown DropDownValue: ${DropDownValue}`);
    }
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return { type: [], status: [] };
  }
}
