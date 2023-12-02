import express from 'express';

import UserController from './user.controller';


const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/register', userController.registration);
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout);
userRouter.get('/activate/:link',userController.activate);
userRouter.get('/refresh', userController.refresh);
userRouter.get('/users', userController.getUsers)


export default userRouter