import PropTypes from "prop-types";

function FieldValidation({ value, validationRules }) {
  // Validation logic
  const validate = () => {
    console.log(value, validationRules);
    // Implement your validation logic here
    // For example, you can use regular expressions or any other validation technique
    // Return true if validation passes, false otherwise
    // You can implement various types of validations based on the validationRules prop
    return true;
  };

  return validate() ? null : (
    <span className="text-xs text-red-600">Invalid Input</span>
  );
}

FieldValidation.propTypes = {
  value: PropTypes.string.isRequired,
  validationRules: PropTypes.object.isRequired,
};

export default FieldValidation;
