import express from 'express';
import UserController from './controllers/UserController.js';

import corsMiddleware from './middlewares/corsMiddleware.js';
import authMiddleware from './middlewares/authMiddleware.js';

//import QuestController from './controllers/QuestController.js'
const routes = express.Router();

const userController = new UserController()
//const questController = new QuestController();

routes.post("/signup", corsMiddleware, userController.createUser);
routes.get("/login", corsMiddleware, userController.userLogin);
routes.get('/user', corsMiddleware, authMiddleware, userController.getUsers);
//routes.post("/quest",questController)


export default routes;