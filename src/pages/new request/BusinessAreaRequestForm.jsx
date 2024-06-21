import DynamicForms from "../../components/DynamicForms";
import MultiBusinessAreaRoute from "./MultiBusinessAreaRoute";
import PropTypes from "prop-types";

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
  setBusinessAreaName,
  setContractAreaAdministrators,
  setBusinessAreaOwners,
  setBusinessAreaPath,
}) {
  return (
    <>
      <div className="primary-fields bg-white px-4 py-2 pb-2">
        <form onSubmit={handleFormSubmit}>
          {/* multi business area route */}
          <MultiBusinessAreaRoute
            isMultiArea={IsMultiBusinessAreaRoute}
            RequestBusinessAreas={RequestBusinessAreas}
            setBusinessArea={setBusinessArea}
            setBusinessAreaName={setBusinessAreaName}
            BusinessArea={BusinessArea}
            setContractAreaAdministrators={setContractAreaAdministrators}
            setBusinessAreaOwners={setBusinessAreaOwners}
            setBusinessAreaPath={setBusinessAreaPath}
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
              {RequestTypes.map((req) => (
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
              onClick={() => {}}
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
  setBusinessAreaName: PropTypes.func,
  BusinessArea: PropTypes.string,
  RequestType: PropTypes.string,
  EditRequestMetadataValue: PropTypes.object,
  setContractAreaAdministrators:PropTypes.func,
  setBusinessAreaOwners:PropTypes.func,
  setBusinessAreaPath:PropTypes.func,
};

export default BusinessAreaDynamicRequestForm;
