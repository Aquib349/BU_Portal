// Function to validate the form component
export const validateFields = (
  validationErrors,
  fieldname,
  value,
  required,
) => {
  const errors = { ...validationErrors };
  if (required === "true" && !value) {
    errors[fieldname] = `${fieldname} is required.`;
  } else {
    delete errors[fieldname];
  }
  return errors;
};
