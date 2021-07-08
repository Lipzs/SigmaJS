import * as jwt from '../setup/jwt.js';
import db from '../database/index.js';

const authMiddleware = async (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(400).json({ 'error': 'Authorization not provided' });
  }

  const [, token] = req.headers.authorization.split(' ');

  try {
    const payload = await jwt.verify(token);
    const usersResult = await db('player')
      .select('*')
      .where('id_player', payload.user);

    if (!usersResult) {
      return res.status(401).json({'error': 'usuário não autorizado'});
    }

    const { password, ...user } = usersResult[0];

    req.auth = user;

    next();
  } catch (error) {
    res.status(401).send(error);
  }
}

export default authMiddleware;