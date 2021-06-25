import express from 'express';
import UserController from './controllers/UserController.js';
import QuestionController from './controllers/QuestionController.js'

import corsMiddleware from './middlewares/corsMiddleware.js';
import authMiddleware from './middlewares/authMiddleware.js';
import fieldsMiddleware from './middlewares/fieldsMiddleware.js';

const routes = express.Router();

const userController = new UserController()
const questionController = new QuestionController();

routes.post('/signup', corsMiddleware, fieldsMiddleware, userController.createUser);
routes.post('/login', corsMiddleware, fieldsMiddleware ,userController.userLogin);

routes.post('/answers', corsMiddleware, authMiddleware, questionController.postAnswers);
routes.get('/getRanking', corsMiddleware, authMiddleware, questionController.getRank);
routes.get('/getQuestions', corsMiddleware, authMiddleware, questionController.getQuestions);

export default routes;