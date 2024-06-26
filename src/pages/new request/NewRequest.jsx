import usePortalConfig from "../../customhooks/usePortalConfig";
import { useContext, useEffect, useState } from "react";
import NewRequestShimmer from "../../shimmer/NewRequestShimmer";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Elements/loading spinner/LoadingSpinner";
import NewRequestForm from "./NewRequestForm";
import axios from "axios";
import { EditReqeustContext } from "../../context/EditRequestContext";
import useXmlConverter from "../../customhooks/useXmlConverter";
import { useNavigate } from "react-router-dom";
import { convertToQueryString } from "../../constants/ConvertToQueryString";
import { cleanAndDecodeData } from "../../constants/DecodeData";
import { getUpdatedFieldValues } from "../../constants/SetAllFieldValues";
import { fetchDynamicFormData } from "../../constants/CreateDynamicForm";
import { fetchDetail } from "../../constants/GetRequestFormFieldDetails";
import { validateFields } from "../../constants/ValidateFormFields";

const NewRequest = () => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const headers = {
    "eContracts-ApiKey":
      "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
  };

  const { ConfigData, loading } = usePortalConfig();
  const [BusinessAreaName, setBusinessAreaName] = useState("");
  const [BusinessArea, setBusinessArea] = useState("");
  const [RequestType, setRequestType] = useState("");
  const [DynamicForm, setDynamicForm] = useState([]);
  const [LoadSpinner, setLoadSpinner] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [fieldValues, setFieldValues] = useState({});

  const [ContractAreaAdministrators, setContractAreaAdministrators] =
    useState("");
  const [BusinessAreaOwners, setBusinessAreaOwners] = useState("");
  const [BusinessAreaPath, setBusinessAreaPath] = useState("");

  // edit Request context
  const [EditRequestMetadataValue, setEditRequestMetadataValue] = useState({});
  const { EditRequest, EditRequestMode, setEditRequestMode, RequestID } =
    useContext(EditReqeustContext);
  const jsonResult = useXmlConverter(EditRequest);
  const navigate = useNavigate();

  // function to handle the request-types
  const handleRequestType = async (event) => {
    setRequestType(event.target.value);
    setLoadSpinner(true);
    await createDynamicForm(event.target.value);
  };

  // function to create a dynamic form based on the request type
  async function createDynamicForm(requestType) {
    setLoadSpinner(true);
    const filteredData = await fetchDynamicFormData(
      requestType,
      api,
      account_id,
      headers,
    );
    setLoadSpinner(false);

    if (filteredData) {
      setDynamicForm(filteredData);
    }
  }

  // Function to set all the field values
  function SetAllFieldValues(fieldname, value) {
    setFieldValues((prevValues) => {
      const updatedValues = getUpdatedFieldValues(fieldname, value, prevValues);
      return updatedValues;
    });
  }

  // function to get contractAdiministrator, businessareowner, businessareapath
  async function getDetail(id, contractAreaName) {
    setBusinessAreaName(contractAreaName);
    const details = await fetchDetail(
      api,
      account_id,
      headers,
      id,
      contractAreaName,
    );

    if (details) {
      setBusinessAreaOwners(details.businessAreaOwners.Owner);
      setBusinessAreaPath(details.businessAreaPath);
      setContractAreaAdministrators(details.contractAreaAdministrators);
    }
  }

  // function to validate the form component on submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setEditRequestMode(false);
    const formData = new FormData();
    const user = localStorage.getItem("username");

    // Validate all fields before submission
    let tempErrors = {};
    DynamicForm.forEach(({ FieldName, Required }) => {
      const cleanedData = cleanAndDecodeData(fieldValues);
      tempErrors = validateFields(
        tempErrors,
        FieldName,
        cleanedData[FieldName],
        Required,
      );
    });

    // Update state with collected errors
    setValidationErrors(tempErrors);

    const hasErrors = Object.keys(tempErrors).length > 0;

    if (!hasErrors) {
      setLoadSpinner(true);
      // Form is valid, proceed with submission
      let QueryString = convertToQueryString(fieldValues);
      QueryString += `&RequestType=${RequestType}`;
      QueryString += `&BusinessArea=${BusinessArea}`;

      QueryString += "&CreatedFromPortal=YES";
      QueryString += "&AutoIncrmentNumber=";
      QueryString += `&CreatedBy=${user}`;
      QueryString += `&ModifiedBy=${user}`;
      QueryString += "&InRecycleBin=";
      QueryString += `&ContractArea=${encodeURIComponent(BusinessAreaName)}`;
      QueryString += `&ContractAreaAdministrators=${ContractAreaAdministrators.Owner}`;
      QueryString += `&BusinessAreaOwners=${BusinessAreaOwners}`;
      QueryString += `&BusinessAreaPath=${encodeURIComponent(BusinessAreaPath)}`;
      QueryString += "&IsDraft=";
      if (!EditRequestMode) {
        QueryString += `&Submittedby=${user}`;
      } else {
        QueryString += `&Submittedby=${JSON.parse(jsonResult)?.Metadata?.Submittedby?._text}`;
      }

      // Append the querystring and accountID fields to the FormData object
      if (EditRequestMode) {
        const formValues = QueryString.split("&");
        for (let i = 0; i < formValues.length; i++) {
          const key = formValues[i].split("=")[0];
          const value = formValues[i].split("=")[1];
          if (!formData.has(key)) {
            formData.append(key, value);
          }
        }
      } else {
        formData.append("SearializeControls", QueryString);
      }
      formData.append("AccountID", account_id);

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
        if (EditRequestMode) {
          formData.append("RequestID", RequestID);

          const response = await axios.put(
            `${api}/api/accounts/${account_id}/Requests`,
            formData,
            config,
          );
          if (response.status === 200 || response.status === 201) {
            setLoadSpinner(false);
            toast.success("Edited successfully", {
              duration: 1000,
              position: "top-center",
              style: {
                backgroundColor: "black",
                color: "white",
                fontSize: "0.8rem",
              },
            });
            setEditRequestMode(false);
            setFieldValues({});
            navigate(`/requestDetail/${RequestID}`);
          }
        } else {
          const response = await axios.post(
            `${api}/api/accounts/${account_id}/Requests`,
            formData,
            config,
          );
          if (response.status === 200 || response.status === 201) {
            setLoadSpinner(false);
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
            navigate(`/requestDetail/${response.data}`);
          }
        }
      } catch (error) {
        console.log(error);
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
    if (EditRequestMode && jsonResult != "" && ConfigData.length > 0) {
      setEditRequestMetadataValue(JSON.parse(jsonResult));
      setRequestType(JSON.parse(jsonResult)?.Metadata?.RequestType?._text);
      setBusinessArea(JSON.parse(jsonResult)?.Metadata?.BusinessArea?._text);
      createDynamicForm(JSON.parse(jsonResult)?.Metadata?.RequestType?._text);
      const BsArea = ConfigData.map((val) =>
        val.RequestBusinessAreas.find(
          (bs) =>
            bs.businessArea ==
            JSON.parse(jsonResult)?.Metadata?.BusinessArea?._text,
        ),
      );
      if (BsArea) {
        getDetail(BsArea[0].id, BsArea[0].name);
      }
    }
  }, [jsonResult, EditRequestMode, ConfigData]);

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
          <NewRequestForm
            ConfigData={ConfigData}
            handleFormSubmit={handleFormSubmit}
            handleRequestType={handleRequestType}
            DynamicForm={DynamicForm}
            validationErrors={validationErrors}
            validateField={SetAllFieldValues}
            setBusinessArea={setBusinessArea}
            BusinessArea={BusinessArea}
            RequestType={RequestType}
            EditRequestMetadataValue={EditRequestMetadataValue}
            getDetail={getDetail}
          />
        </div>
      </div>
    </>
  );
};

export default NewRequest;
