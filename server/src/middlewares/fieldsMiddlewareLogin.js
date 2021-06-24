import verifyEmptyFields from "../utils/verifyEmptyFields.js";


function fieldsMiddlewareLogin(req, res, next) {
  const fields = [
    { fieldName: "Password", value: req.body.password },
    { fieldName: "Email", value: req.body.email },
  ];

  const emptyFields = verifyEmptyFields(fields);

  if (emptyFields.length == 1) {
    return res
      .status(400)
      .json({ Response: `o campo ${emptyFields} não pode estar vázio` });
  } 
  else if (emptyFields.length > 1) {
    return res
      .status(400)
      .json({ Response: `os campos ${emptyFields} não podem ser vázios` });
  } 
  else {
    next();
  }
}

export default fieldsMiddlewareLogin;