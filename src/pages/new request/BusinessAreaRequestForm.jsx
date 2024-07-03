import { useNavigate } from "react-router-dom";
import DynamicForms from "../../components/DynamicForms";
import MultiBusinessAreaRoute from "./MultiBusinessAreaRoute";
import PropTypes from "prop-types";
import Alerts from "../../Elements/Alerts";
import { useEffect, useState } from "react";

function BusinessAreaDynamicRequestForm({
  handleFormSubmit,
  IsMultiBusinessAreaRoute,
  RequestBusinessAreas,
  handleRequestType,
  RequestTypes,
  DynamicForm,
  validationErrors,
  validateField,
  setBusinessArea,
  BusinessArea,
  RequestType,
  EditRequestMetadataValue,
  getDetail,
  ContractAreaAdministrators,
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [RTypes, setRTypes] = useState([]);

  useEffect(() => {
    if (ContractAreaAdministrators && ContractAreaAdministrators.RequestType) {
      const typesArray = ContractAreaAdministrators.RequestType.split(";").map(
        (type) => type.trim(),
      );

      // Create a set of types from the split string
      const typesSet = new Set(typesArray);

      // Filter the dataArray to only include objects whose type is in the set
      const intersectedArray = RequestTypes.filter((item) =>
        typesSet.has(item.type),
      );

      setRTypes(intersectedArray);
    }
  }, [ContractAreaAdministrators, RequestTypes]);
  return (
    <>
      {showAlert && (
        <Alerts
          heading="Are you sure, You want to cancel this request"
          link="/"
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
      )}
      <div className="primary-fields bg-white px-4 py-2 pb-2">
        <form onSubmit={handleFormSubmit}>
          {/* multi business area route */}
          <MultiBusinessAreaRoute
            isMultiArea={IsMultiBusinessAreaRoute}
            RequestBusinessAreas={RequestBusinessAreas}
            setBusinessArea={setBusinessArea}
            BusinessArea={BusinessArea}
            getDetail={getDetail}
          />
          <div className="flex flex-col py-2">
            <label>
              Request Type
              <span className="font-bold text-red-500">*</span>
            </label>
            <select
              name="request_type"
              className="rounded-md border border-slate-300 p-2 text-sm text-black outline-blue-300"
              onChange={handleRequestType}
              value={RequestType}
            >
              <option value="" disabled>
                -select-
              </option>
              {RTypes.map((req) => (
                <option key={req.id} value={req.type}>
                  {req.type}
                </option>
              ))}
            </select>

            <small className="px-1 text-slate-500">
              Type of contract or related document requested
            </small>
          </div>

          {/* dynamic forms */}
          <DynamicForms
            DynamicFormData={DynamicForm}
            validationErrors={validationErrors}
            validateField={validateField}
            EditRequestMetadataValue={EditRequestMetadataValue}
          />

          <div className="submit-button mt-4 flex items-center justify-end gap-4 text-sm">
            <button
              type="button"
              className="flex items-center justify-center rounded-sm bg-slate-500 px-8 py-2 text-white"
              onClick={() => {
                setShowAlert(true);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center rounded-sm bg-blue-500 px-8 py-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

BusinessAreaDynamicRequestForm.propTypes = {
  handleFormSubmit: PropTypes.func,
  IsMultiBusinessAreaRoute: PropTypes.bool,
  RequestBusinessAreas: PropTypes.any,
  handleRequestType: PropTypes.func,
  RequestTypes: PropTypes.array,
  DynamicForm: PropTypes.any,
  validationErrors: PropTypes.object,
  validateField: PropTypes.func,
  setBusinessArea: PropTypes.func,
  BusinessArea: PropTypes.string,
  RequestType: PropTypes.string,
  EditRequestMetadataValue: PropTypes.object,
  ContractAreaAdministrators: PropTypes.object,
};

export default BusinessAreaDynamicRequestForm;
