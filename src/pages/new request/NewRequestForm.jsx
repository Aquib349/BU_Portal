import BusinessAreaDynamicRequestForm from "./BusinessAreaRequestForm";
import PropTypes from "prop-types";
import Accordion from "../../Elements/Accordion";

function NewRequestForm({
  ConfigData,
  handleFormSubmit,
  handleRequestType,
  DynamicForm,
  validationErrors,
  validateField,
  setBusinessArea,
  setBusinessAreaName,
  BusinessArea,
  RequestType,
  EditRequestMetadataValue,
  setContractAreaAdministrators,
  setBusinessAreaOwners,
  setBusinessAreaPath,
}) {
  return (
    <>
      <div className="m-auto w-8/12">
        <div className="px-2 py-4 leading-[0.5rem]">
          <h1 className="text-2xl">Submit a New Request</h1>
          <small className="text-slate-500">
            Submit a New Request to Legal
          </small>
        </div>
        <div className="bg-white p-2">
          {ConfigData.map((val) => (
            <Accordion
              key={val.RowKey}
              heading="Primary Fields"
              checked={true}
              bgRequired={false}
            >
              {/* Business area dynamic request form */}
              <BusinessAreaDynamicRequestForm
                handleFormSubmit={handleFormSubmit}
                IsMultiBusinessAreaRoute={val.IsMultiBusinessAreaRoute}
                RequestBusinessAreas={val.RequestBusinessAreas}
                handleRequestType={handleRequestType}
                RequestTypes={val.RequestTypes}
                DynamicForm={DynamicForm}
                validationErrors={validationErrors}
                validateField={validateField}
                setBusinessArea={setBusinessArea}
                setBusinessAreaName={setBusinessAreaName}
                BusinessArea={BusinessArea}
                RequestType={RequestType}
                EditRequestMetadataValue={EditRequestMetadataValue}
                setContractAreaAdministrators={setContractAreaAdministrators}
                setBusinessAreaOwners={setBusinessAreaOwners}
                setBusinessAreaPath={setBusinessAreaPath}
              />
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}

NewRequestForm.propTypes = {
  ConfigData: PropTypes.array,
  handleFormSubmit: PropTypes.func,
  handleRequestType: PropTypes.func,
  DynamicForm: PropTypes.array,
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

export default NewRequestForm;
