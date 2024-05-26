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
}) {
  return (
    <>
      <div className="primary-fields px-4 py-2 pb-2 bg-white shadow-sm">
        <form onSubmit={handleFormSubmit}>
          {/* multi business area route */}
          <MultiBusinessAreaRoute
            isMultiArea={IsMultiBusinessAreaRoute}
            RequestBusinessAreas={RequestBusinessAreas}
            setBusinessArea={setBusinessArea}
            BusinessArea={BusinessArea}
          />
          <div className="flex flex-col py-2">
            <label>
              Request Type
              <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              name="request_type"
              className="text-sm p-2 rounded-md border border-slate-300 outline-blue-300 text-black"
              onChange={handleRequestType}
            >
              <option>-select-</option>
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
          />

          <div className="submit-button flex items-center gap-4 justify-end mt-4 text-sm">
            <button
              type="button"
              className="flex justify-center items-center px-8 py-2 bg-slate-500 text-white rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center items-center px-8 py-2 bg-blue-500 text-white rounded-sm"
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
};

export default BusinessAreaDynamicRequestForm;
