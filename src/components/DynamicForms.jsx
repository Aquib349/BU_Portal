import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Import your components here
import Taxonomy from "../form-components/Taxonomy";
import LookupField from "../form-components/lookup-field/LookupField";
import SingleLineTextField from "../form-components/SingleLineTextField";
import MultiLineTextField from "../form-components/MultiLineTextField";
import UserField from "../form-components/UserField";
import Datepicker from "../form-components/DatePicker";
import RadioField from "../form-components/RadioField";
import FileUpload from "../form-components/FileUpload";
import ChoiceField from "../form-components/ChoiceField";
import MultiChoiceDropdown from "../form-components/MultiChoiceDropdown";
// import MultiChoiceBrowse from "../form-components/MultiChoiceBrowse";
import ValueFinancialsField from "../form-components/ValueFinancialsField";
import LookupMultiSelect from "../form-components/LookupMultiSelect";
import NumberField from "../form-components/NumberField";
import PhoneNumberField from "../form-components/PhoneNumberField";
import EmailField from "../form-components/EmailField";
import HyperLinkField from "../form-components/HyperLinkField";
import { StatusContext } from "../context/StatusContext";

function DynamicForms({
  DynamicFormData,
  validationErrors,
  validateField,
  EditRequestMetadataValue,
}) {
  // Use state for component rendering
  const [componentsToRender, setComponentsToRender] = useState([]);
  const { AllStatus } = useContext(StatusContext);
  const componentMap = {
    "Office 365 Sharepoint Taxonomy": {
      component: Taxonomy,
    },
    Lookup: {
      component: LookupField,
      props: { options: AllStatus },
    },
    "Single Line Text": {
      component: SingleLineTextField,
    },
    "Multi Line Text": {
      component: MultiLineTextField,
    },
    User: {
      component: UserField,
      props: { multi: true },
    },
    Date: {
      component: Datepicker,
    },
    "Yes/No": {
      component: RadioField,
    },
    "File Upload": {
      component: FileUpload,
    },
    Choice: {
      component: ChoiceField,
    },
    "Multi- Choice (Dropdown)": {
      component: MultiChoiceDropdown,
    },
    // "Multi- Choice (Browse)": {
    //   component: MultiChoiceBrowse,
    // },
    "Value/Financials": {
      component: ValueFinancialsField,
    },
    "Lookup (Multi Select)": {
      component: LookupMultiSelect,
    },
    Number: {
      component: NumberField,
    },
    "Phone Number": {
      component: PhoneNumberField,
    },
    Eamil: {
      component: EmailField,
    },
    Hyperlink: {
      component: HyperLinkField,
    },
  };

  // Trigger re-render when DynamicFormData changes
  useEffect(() => {
    const components = DynamicFormData?.map((val) => {
      const {
        FieldName,
        FieldType,
        FieldDisplayName,
        HelpText,
        Required,
        CommentYes,
        CommentNo,
        CommentRequired,
      } = val;
      console.log(EditRequestMetadataValue?.Metadata[FieldName]?._text)
      const componentInfo = componentMap[FieldType];
      if (componentInfo) {
        const { component: Component, props } = componentInfo;
        const componentProps = {
          title: FieldDisplayName,
          name: FieldName,
          baseline: HelpText ? HelpText : "",
          required: Required,
          fieldname: FieldName,
          CommentYes: CommentYes,
          CommentNo: CommentNo,
          CommentRequired: CommentRequired,
          validate: validateField,
          value:
            EditRequestMetadataValue != null
              ? EditRequestMetadataValue?.Metadata[FieldName]?._text
              : "",
          ...props,
        };
        return (
          <div key={FieldName} className="relative">
            <Component {...componentProps} />
            <span className="absolute top-0 right-4 text-red-500 text-sm">
              {validationErrors[FieldName]}
            </span>
          </div>
        );
      } else {
        return null;
      }
    });
    setComponentsToRender(components);
  }, [DynamicFormData, validationErrors]);

  return <>{componentsToRender}</>;
}

DynamicForms.propTypes = {
  DynamicFormData: PropTypes.array,
  validationErrors: PropTypes.object,
  validateField: PropTypes.func.isRequired,
};

export default DynamicForms;
