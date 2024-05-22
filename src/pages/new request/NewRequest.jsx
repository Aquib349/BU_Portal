import usePortalConfig from "../../customhooks/usePortalConfig";
import { useCallback, useState } from "react";
import NewRequestShimmer from "../../shimmer/NewRequestShimmer";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../Elements/loading spinner/LoadingSpinner";
import NewRequestForm from "./NewRequestForm";
import axios from "axios";

const NewRequest = () => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const { ConfigData, loading } = usePortalConfig();
  const [DynamicForm, setDynamicForm] = useState([]);
  const [LoadSpinner, setLoadSpinner] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [fieldValues, setFieldValues] = useState({});

  // function to handle the request-types
  const handleRequestType = useCallback(async (event) => {
    setLoadSpinner(true);
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/Requests/requesttypes/metadatas?requesttypename=${event.target.value}`,
        { headers }
      );

      const promise = toast.promise(
        new Promise((resolve, reject) => {
          if (response.status === 200) {
            resolve(true);
          } else {
            reject(
              new Error(
                "Could not create. There might be some issue with the API"
              )
            );
          }
        }),
        {
          loading: "Creating...",
          success: <b>Successfully Created!</b>,
          error: <b>Could not create. There might some issue with API</b>,
        },
        {
          position: "top-center",
          style: {
            backgroundColor: "black",
            color: "white",
            fontSize: "0.8rem",
          },
        }
      );
      await promise;
      setLoadSpinner(false);
      const Data = response.data;
      const filteredData = Data.filter(
        (item) =>
          item.FieldDisplayName !== "Request Type" &&
          item.FieldDisplayName !== "Business Area"
      );
      setDynamicForm(filteredData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // function to validate the form component
  const validateField = (fieldname, value, required) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldname]: value,
    }));

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

  // function to validate the form component on submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    DynamicForm.forEach(({ FieldName, Required }) => {
      validateField(FieldName, fieldValues[FieldName], Required);
    });

    const hasErrors = Object.keys(validationErrors).length > 0;
    if (!hasErrors) {

      // Form is valid, proceed with submission
      console.log(fieldValues);
      toast.success("Form submitted successfully", {
        duration: 1000,
        position: "top-center",
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "0.8rem",
        },
      });
      console.log("Form submitted successfully");
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
      console.log(validationErrors);
      console.log("Form contains errors");
    }
  };

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
            validateField={validateField}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default NewRequest;
