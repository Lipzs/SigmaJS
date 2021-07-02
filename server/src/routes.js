import express from 'express';
import UserController from './controllers/UserController.js';
import QuestionController from './controllers/QuestionController.js'

import corsMiddleware from './middlewares/corsMiddleware.js';
import authMiddleware from './middlewares/authMiddleware.js';
import fieldsMiddleware from './middlewares/fieldsMiddleware.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';

const routes = express.Router();

const userController = new UserController()
const questionController = new QuestionController();

routes.post('/signup', corsMiddleware, fieldsMiddleware, loggerMiddleware, userController.createUser);
routes.post('/login', corsMiddleware, fieldsMiddleware, loggerMiddleware, userController.userLogin);

routes.post('/answers', corsMiddleware, authMiddleware, loggerMiddleware, questionController.postAnswers);
routes.get('/getRanking', corsMiddleware, authMiddleware, loggerMiddleware, questionController.getRank);
routes.get('/getQuestions', corsMiddleware, authMiddleware, loggerMiddleware, questionController.getQuestions);

export default routes;