import PropTypes from "prop-types";

function FormComponentValidation({ validationErrors }) {
  // Validation logic
  // if (Object.keys(validationErrors).length === 0) {
  //   // Form is valid, proceed with submission
  //   return "form is valid";
  // } else {
  //   // Form is invalid, show errors
  //   return "form is invalid";
  // }
  console.log(validationErrors);
}

FormComponentValidation.propTypes = {
  validationErrors: PropTypes.object,
};

export default FormComponentValidation;
