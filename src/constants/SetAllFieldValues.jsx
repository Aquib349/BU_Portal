export function getUpdatedFieldValues(fieldname, value, prevValues) {
  console.log(fieldname + " " + ":" + value);
  const updatedValues = { ...prevValues };

  if (Array.isArray(value) && fieldname !== "Attachments") {
    // If value is an array, iterate over each object in the array
    value.forEach((field) => {
      // Assuming each field object contains only one key-value pair
      for (const key in field) {
        if (field.hasOwnProperty(key)) {
          updatedValues[`&${key}`] = encodeURIComponent(field[key]);
        }
      }
    });
  } else {
    // If value is not an array, directly update using fieldname
    updatedValues[`&${fieldname}`] = encodeURIComponent(value);
  }

  if (!updatedValues[`&Status`]) {
    updatedValues[`&Status`] = encodeURIComponent("New");
  }

  return updatedValues;
}
