import express, { Request } from 'express';
import { body } from 'express-validator';
import UserController from './user.controller';
import { validateAccessToken } from '../middlewares/auth-middleware';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/registration',
// body('email').isEmail(),
// body('password').isLength({min: 3, max: 32}),
 userController.registration);
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout);
userRouter.get('/activate/:link',userController.activate);
// userRouter.get('/refresh', userController.refresh);
userRouter.get('/users', userController.getUsers)
userRouter.post('/getUserData', userController.getUserData)

userRouter.get('/test', validateAccessToken, (req: any) => console.log(req['user']))


export default userRouter