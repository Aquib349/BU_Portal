import usePortalConfig from "../../customhooks/usePortalConfig";
import { useCallback, useContext, useEffect, useState } from "react";
import NewRequestShimmer from "../../shimmer/NewRequestShimmer";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Elements/loading spinner/LoadingSpinner";
import NewRequestForm from "./NewRequestForm";
import axios from "axios";
import { EditReqeustContext } from "../../context/EditRequestContext";
import useXmlConverter from "../../customhooks/useXmlConverter";

const NewRequest = () => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const { ConfigData, loading } = usePortalConfig();
  const [BusinessAreaName, setBusinessAreaName] = useState("");
  const [BusinessArea, setBusinessArea] = useState("");
  const [RequestType, setRequestType] = useState("");
  const [DynamicForm, setDynamicForm] = useState([]);
  const [LoadSpinner, setLoadSpinner] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  // console.log(ConfigData)

  // edit Request context
  const [EditRequestMetadataValue, setEditRequestMetadataValue] = useState({});
  const { EditRequest, EditRequestMode, setEditRequestMode } =
    useContext(EditReqeustContext);
  const jsonResult = useXmlConverter(EditRequest);

  // function to handle the request-types
  const handleRequestType = useCallback(async (event) => {
    setRequestType(event.target.value);
    setLoadSpinner(true);
    await createDynamicForm(event.target.value);
  }, []);

  // function to create a dynamic form based on the request type
  async function createDynamicForm(requestType) {
    // console.log(requestType);
    setLoadSpinner(true);
    try {
      const headers = {
        "eContracts-ApiKey":
          "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
      };

      const response = await toast.promise(
        axios.get(
          `${api}/api/accounts/${account_id}/Requests/requesttypes/metadatas?requesttypename=${requestType}`,
          { headers },
        ),
        {
          loading: "Creating...",
          success: <b>Successfully Created!</b>,
          error: <b>Could not create. There might be some issue with API</b>,
        },
        {
          position: "top-center",
          style: {
            backgroundColor: "black",
            color: "white",
            fontSize: "0.8rem",
          },
        },
      );

      if (response.status === 200) {
        const Data = response.data;
        const filteredData = Data.filter(
          (item) =>
            item.FieldDisplayName !== "Request Type" &&
            item.FieldDisplayName !== "Business Area",
        );
        setDynamicForm(filteredData);
      } else {
        throw new Error("Could not create");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadSpinner(false);
    }
  }

  // function to set the all the field values !!
  function SetAllFieldValues(fieldname, value) {
    setFieldValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (Array.isArray(value) && fieldname !== "Attachments") {
        // If value is an array, iterate over each object in the array
        value.forEach((field) => {
          // Assuming each field object contains only one key-value pair
          for (const key in field) {
            if (field.hasOwnProperty(key)) {
              updatedValues[`&${key}`] = encodeURIComponent(field[key]);
            }
          }
        });
      } else {
        // If value is not an array, directly update using fieldname
        updatedValues[`&${fieldname}`] = encodeURIComponent(value);
      }

      // Ensure RequestType and BusinessArea fields are set
      updatedValues["&RequestType"] = encodeURIComponent(RequestType);
      updatedValues["&BusinessArea"] = encodeURIComponent(BusinessArea);

      return updatedValues;
    });
  }

  // function to validate the form component
  const validateField = (fieldname, value, required) => {
    setValidationErrors((prevErrors) => {
      const errors = { ...prevErrors };
      if (required === "true" && !value) {
        errors[fieldname] = `${fieldname} is required.`;
      } else {
        delete errors[fieldname];
      }
      return errors;
    });
  };

  // Function to convert fieldValues to query string
  const convertToQueryString = (fieldValues) => {
    return Object.keys(fieldValues)
      .map(
        (key) => `${key}=${fieldValues[key] !== null ? fieldValues[key] : ""}`,
      )
      .join("");
  };

  // function to validate the form component on submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setEditRequestMode(false);
    const formData = new FormData();

    // Validate all fields before submission
    DynamicForm.forEach(({ FieldName, Required }) => {
      validateField(FieldName, fieldValues[FieldName], Required);
    });

    const hasErrors = Object.keys(validationErrors).length > 0;
    if (!hasErrors) {
      // Form is valid, proceed with submission
      let QueryString = convertToQueryString(fieldValues);
      QueryString += "&CreatedFromPortal=YES";
      QueryString += "&AutoIncrmentNumber=";
      QueryString += "&CreatedBy=Santosh Dutta"; // dynamic
      QueryString += "&ModifiedBy=Santosh Dutta"; // dynamic
      QueryString += "&InRecycleBin=";
      QueryString += `&ContractArea=${encodeURIComponent(BusinessAreaName)}`;
      QueryString +=
        "&ContractAreaAdministrators=Alok Jain;Ankit CAA; Hariharan N"; // to get after selecting business area
      QueryString += "&BusinessAreaOwners=Alok Jain;Ankit BAO;Vishnu Karma"; // dynamic
      QueryString += `&BusinessAreaPath=${encodeURIComponent(`${BusinessAreaName} > ${BusinessArea}`)}`;
      QueryString += "&IsDraft=";
      QueryString += "&Submittedby=Santosh Dutta"; // dynamic

      // Append the querystring and accountID fields to the FormData object
      formData.append("SearializeControls", QueryString);
      formData.append("AccountID", account_id);

      // Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // POST request to create the new request
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          "eContracts-ApiKey":
            "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
        };
        const config = {
          headers: headers,
          processData: false,
        };
        const response = await axios.post(
          `${api}/api/accounts/${account_id}/Requests`,
          formData,
          config,
        );
        if (response.status === 200 || response.status === 201) {
          toast.success("Form submitted successfully", {
            duration: 1000,
            position: "top-center",
            style: {
              backgroundColor: "black",
              color: "white",
              fontSize: "0.8rem",
            },
          });
          setFieldValues({});
        }
      } catch (error) {
        console.log(error);
        // Optionally display an error
        toast.error("Submission failed. Please try again.", {
          duration: 1500,
          position: "top-center",
          style: {
            backgroundColor: "black",
            color: "white",
            fontSize: "0.8rem",
          },
        });
      }
    } else {
      // Form is invalid, show errors
      toast.error("Please fill all the required fields", {
        duration: 1500,
        position: "top-center",
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "0.8rem",
        },
      });
    }
  };

  // creating dynamic form for to edit the reqeust !!
  useEffect(() => {
    if (EditRequestMode && jsonResult != "") {
      setEditRequestMetadataValue(JSON.parse(jsonResult));
      setRequestType(JSON.parse(jsonResult)?.Metadata?.RequestType?._text);
      setBusinessArea(JSON.parse(jsonResult)?.Metadata?.BusinessArea?._text);
      createDynamicForm(JSON.parse(jsonResult)?.Metadata?.RequestType?._text);
    }
  }, [jsonResult, EditRequestMode]);

  if (loading) {
    return (
      <>
        <NewRequestShimmer />
      </>
    );
  }

  return (
    <>
      {LoadSpinner && <LoadingSpinner />}
      <div className="newrequest-component">
        <div className="main">
          {/* new request form */}
          <NewRequestForm
            ConfigData={ConfigData}
            handleFormSubmit={handleFormSubmit}
            handleRequestType={handleRequestType}
            DynamicForm={DynamicForm}
            validationErrors={validationErrors}
            validateField={SetAllFieldValues}
            setBusinessArea={setBusinessArea}
            setBusinessAreaName={setBusinessAreaName}
            BusinessArea={BusinessArea}
            RequestType={RequestType}
            EditRequestMetadataValue={EditRequestMetadataValue}
          />
        </div>
      </div>
    </>
  );
};

export default NewRequest;
