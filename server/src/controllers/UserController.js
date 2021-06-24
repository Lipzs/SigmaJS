import db from '../database/index.js';
import * as jwt from '../setup/jwt.js';
import crypto from 'crypto';

import verifyEmail from '../utils/verifyEmail.js';

class UserController {

  async createUser(req, res) {
    const { name, email, password, urlPhoto } = req.body;
    let insertedUser;

    const response = {
      data: {},
      message: '',
      error: false
    };

    const pw = crypto.createHash('sha256')
      .update(password)
      .digest('hex');

      if (!verifyEmail(email)) {
        return res.status(400).json({
          Response: 'O campo email não esta preenchido corretamente.',
        });
      }

    try {
      await db('player')
        .insert({ name: name, email: email, password: pw, photo: urlPhoto })
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

      if(response.data.code == 23505){
        return res.status(400).json({
          'message': 'Este email já foi cadastrado'
       });
      }

      if (response.error) {
        return res.status(500).json({
           'message': response.message,
           'error': response.data
        });
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
    const { email, password } = req.body;

    const pw = crypto.createHash('sha256')
      .update(password)
      .digest('hex');

    try {
      const result = await db('player')
        .select('*')
        .where('email', email)

      if (!result[0]) {
        return res.status(401).json({ 'message': 'Usuário não cadastrado' });
      }

      if (result[0].password != pw) {
        return res.status(401).json({ 'message': 'Senha incorreta' });
      }

      const { password, ...loggedUser } = result[0];

      const token = await jwt.sign({ user: loggedUser.id_player });
  
      res.status(200).json({ 
        'message': 'usuário autorizado com sucesso',
        'user': loggedUser,
        'token': token  
      });
    } catch (error) {
      return res.status(500).json({
        'message': 'Ocorreu um erro inesperado',
        'error': error
      })
    }   
  }
}

export default UserController;