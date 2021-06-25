import verifyEmptyFields from '../utils/verifyEmptyFields.js';


function fieldsMiddleware(req, res, next) {
  let fields = [];

  if (req.url === '/login') {
    fields.push({ fieldName: 'Email', value: req.body.email });
    fields.push({ fieldName: 'Password', value: req.body.password });
  } else if (req.url === '/signup') {
    fields.push({ fieldName: 'Name', value: req.body.name });
    fields.push({ fieldName: 'Password', value: req.body.password });
    fields.push({ fieldName: 'Email', value: req.body.email });
  }

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

export default fieldsMiddleware;
