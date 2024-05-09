import { useState, useEffect } from "react";
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
import MultiChoiceBrowse from "../form-components/MultiChoiceBrowse";
import ValueFinancialsField from "../form-components/ValueFinancialsField";
import LookupMultiSelect from "../form-components/LookupMultiSelect";
import NumberField from "../form-components/NumberField";
import PhoneNumberField from "../form-components/PhoneNumberField";
import EmailField from "../form-components/EmailField";
import HyperLinkField from "../form-components/HyperLinkField";

const componentMap = {
  "Office 365 Sharepoint Taxonomy": {
    component: Taxonomy,
    props: { options: [], multi: false },
  },
  Lookup: {
    component: LookupField,
    props: { options: [] },
  },
  "Single Line Text": {
    component: SingleLineTextField,
    props: { name: "", value: "" },
  },
  "Multi Line Text": {
    component: MultiLineTextField,
    props: { name: "", value: "" },
  },
  User: {
    component: UserField,
    props: { options: [], multi: true },
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
  "Multi- Choice (Browse)": {
    component: MultiChoiceBrowse,
  },
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

function DynamicForms({ DynamicFormData }) {
  // console.log(DynamicFormData);
  // Use state for component rendering
  const [componentsToRender, setComponentsToRender] = useState([]);

  // Trigger re-render when DynamicFormData changes
  useEffect(() => {
    const components = DynamicFormData?.map((val) => {
      const { FieldName, FieldType, FieldDisplayName, HelpText, Required } =
        val;
      const componentInfo = componentMap[FieldType];
      if (componentInfo) {
        const { component: Component, props } = componentInfo;
        const componentProps = {
          title: FieldDisplayName,
          baseline: HelpText ? HelpText : "",
          required: Required,
          fieldname: FieldName,
          ...props,
        };
        return (
          <div key={FieldName}>
            <Component {...componentProps} />
          </div>
        );
      } else {
        return null;
      }
    });
    setComponentsToRender(components);
  }, [DynamicFormData]);

  return <>{componentsToRender}</>;
}

DynamicForms.propTypes = {
  DynamicFormData: PropTypes.array.isRequired,
};

export default DynamicForms;
