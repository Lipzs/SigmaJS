import db from '../database/index.js';
import * as jwt from '../setup/jwt.js';
import crypto from 'crypto';

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    let insertedUser;
    const response = {
      data: {},
      message: '',
      error: false
    };

    const pw = crypto.createHash('md5').update(password).digest('hex');

    try {
      await db('player')
        .insert({ name: name, email: email, password: pw })
        .returning('*')
        .then((user) => {
          const { password, ...us } = user[0];
          insertedUser = us;
        })
        .catch(err => {
          response.message = 'Falha ao criar usuário';
          response.error = true;
          response.data = err
        });

      if (response.error) {
        return res.status(500).json({ 'message': response.message });
      }

      response.data = insertedUser;
  
      const token = await jwt.sign({ user: insertedUser.id_player });
  
      res.status(200).json({ 
        'user': response.data,
        'message': 'usuário autorizado com sucesso',
        'token': token  
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({ 'error': error });
    }
  };

  async userLogin(req, res) {
    const [, hash] = req.headers.authorization.split(' ');
    const [ email, password ] = Buffer.from(hash, 'base64')
      .toString()
      .split(':');

    let loggedUser;

    const pw = crypto.createHash('md5').update(password).digest('hex');

    try {
      const result = await db('player')
        .select('id_player', 'name')
        .where('email', email)
        .andWhere('password', pw);

      loggedUser = result[0];

      if (!loggedUser) {
        return res.status(401).json({ 'message': 'Usuário não autorizado' });
      }  

      const token = await jwt.sign({ user: loggedUser.id_player });
  
      res.status(200).json({ 
        'user': loggedUser,
        'message': 'usuário autorizado com sucesso',
        'token': token  
      });
    } catch (error) {
      console.log(error);
    }   
  }

  async getUsers(req, res) {
    try {
      const userResult = await db('player')
        .select('*')

      console.log(userResult);
      return res.status(200).json({ 'result': userResult });
    } catch (error) {
      console.log(error); 
      return res.status(500).json({ 'error': error });
    }
  }

}
export default UserController;