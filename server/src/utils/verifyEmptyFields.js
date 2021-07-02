function verifyEmptyFields(fields) {
  const emptyFields = [];
  for (let field of fields) {
    if (field.value === '' || field.value === undefined) {
      emptyFields.push(`'${field.fieldName}'`);
    }
  }
  return emptyFields;
}

export default verifyEmptyFields;