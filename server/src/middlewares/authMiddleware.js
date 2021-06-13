import * as jwt from '../setup/jwt.js';

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ');

  try {
    const payload = await jwt.verify(token);
    console.log(payload);
    next();
  } catch (error) {
    res.send(401, error);
  }
}

export default authMiddleware;