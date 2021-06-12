import express from 'express';
import UserController from './controllers/UserController.js';
//import QuestController from './controllers/QuestController.js'
const routes = express.Router();

const userController = new UserController()
//const questController = new QuestController();

routes.post("/users",userController.createUser);
routes.post("/users",userController.userLogin);
//routes.post("/quest",questController)


export default routes;