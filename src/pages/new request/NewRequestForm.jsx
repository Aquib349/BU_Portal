import { IoIosArrowDown } from "react-icons/io";
import BusinessAreaDynamicRequestForm from "./BusinessAreaRequestForm";
import PropTypes from "prop-types";

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
            <div key={val.RowKey} className={`relative overflow-hidden`}>
              <input
                type="checkbox"
                className="peer absolute inset-x-0 top-0 h-10 w-full opacity-0"
                defaultChecked={true}
              />
              <div className="px-2">
                <span className="flex h-[40px] items-center text-lg">
                  Primary Fields
                </span>
              </div>
              <div className="absolute right-3 top-3 rotate-0 transition-transform duration-300 peer-checked:rotate-180">
                <IoIosArrowDown />
              </div>
              <div
                className={`max-h-0 overflow-hidden bg-slate-100 transition-all duration-500 ease-in-out peer-checked:max-h-full`}
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
                />
              </div>
            </div>
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
};

export default NewRequestForm;
