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
  BusinessArea
}) {
  return (
    <>
      <div className="w-8/12 m-auto">
        <div className="leading-[0.5rem] py-4 px-2">
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
                className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
                defaultChecked={true}
              />
              <div className="px-2">
                <span className="flex items-center h-[40px] text-lg">
                  Primary Fields
                </span>
              </div>
              <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
                <IoIosArrowDown />
              </div>
              <div
                className={`max-h-0 peer-checked:max-h-full
      transition-all ease-in-out duration-500 bg-slate-100 overflow-hidden`}
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
                  BusinessArea={BusinessArea}
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
  BusinessArea: PropTypes.string,
};

export default NewRequestForm;
