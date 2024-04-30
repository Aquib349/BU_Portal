import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Import your components here
import Taxonomy from "../form-components/Taxonomy";
import LookupField from "../form-components/LookupField";
import SingleLineTextField from "../form-components/SingleLineTextField";
import MultiLineTextField from "../form-components/MultiLineTextField";
import UserField from "../form-components/UserField";
import Datepicker from "../form-components/DatePicker";
import RadioField from "../form-components/RadioField";
import FileUpload from "../form-components/FileUpload";

const componentMap = {
  BusinessArea: {
    component: Taxonomy,
    props: { options: [], multi: false },
  },
  RequestType: {
    component: LookupField,
    props: { options: [] },
  },
  RequestTitle: {
    component: SingleLineTextField,
    props: { name: "", value: "" },
  },
  Description: {
    component: MultiLineTextField,
    props: { name: "", value: "" },
  },
  RequestNumber: {
    component: SingleLineTextField,
    props: { name: "", value: "" },
  },
  Requestor: {
    component: UserField,
    props: { options: [], multi: true },
  },
  DesiredSignatureDate: {
    component: Datepicker,
  },
  "Assigned To": {
    component: UserField,
    props: { options: [], multi: true },
  },
  Counterparty: {
    component: LookupField,
    props: { options: [] },
  },
  CounterpartyMailingAddress: {
    component: MultiLineTextField,
  },
  CounterpartyEmailAddressandContactName: {
    component: SingleLineTextField,
  },
  DataPrivacy: {
    component: RadioField,
  },
  GovermentRelated: {
    component: RadioField,
  },
  HealthCareProfessional: {
    component: RadioField,
  },
  Attachments: {
    component: FileUpload,
  },
  AdditionalComments: {
    component: MultiLineTextField,
  },
  Project: {
    component: LookupField,
    props: { options: [] },
  },
  Approvers: {
    component: UserField,
    props: { options: [], multi: true },
  },
};

function DynamicForms({ DynamicFormData }) {
  // Use state for component rendering
  const [componentsToRender, setComponentsToRender] = useState([]);

  // Trigger re-render when DynamicFormData changes
  useEffect(() => {
    const components = DynamicFormData?.map((val) => {
      const { FieldName, FieldDisplayName, HelpText, Required } = val;
      const componentInfo = componentMap[FieldName];
      if (componentInfo) {
        const { component: Component, props } = componentInfo;
        const componentProps = {
          title: FieldDisplayName,
          baseline: HelpText ? HelpText : "",
          required: Required,
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
