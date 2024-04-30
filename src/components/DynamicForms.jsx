import { useState } from "react";
import PropTypes from "prop-types";
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
    props: { options: [], multi: false }
  },
  RequestType: {
    component: LookupField,
    props: { options: [] }
  },
  RequestTitle: {
    component: SingleLineTextField,
  },
  Description: {
    component: MultiLineTextField,
  },
  RequestNumber: {
    component: SingleLineTextField,
  },
  Requestor: {
    component: UserField,
    props: { options: [], multi: true }
  },
  DesiredSignatureDate: {
    component: Datepicker,
  },
  "Assigned To": {
    component: UserField,
    props: { options: [], multi: true }
  },
  Counterparty: {
    component: LookupField,
    props: { options: [] }
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
    props: { options: [] }
  },
  Approvers: {
    component: UserField,
    props: { options: [], multi: true }
  },
};

function DynamicForms({ condition, title, baseline, required }) {
  const [ComponentToRender, setComponentToRender] = useState(null);

  // Function to set the component based on the condition
  useState(() => {
    const componentInfo = componentMap[condition];
    if (componentInfo) {
      const { component: Component, props } = componentInfo;
      setComponentToRender(<Component title={title} baseline={baseline} required={required} {...props} />);
    } else {
      setComponentToRender(null);
    }
  }, [condition, title, baseline, required]);

  return <div>{ComponentToRender}</div>;
}

DynamicForms.propTypes = {
  condition: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default DynamicForms;