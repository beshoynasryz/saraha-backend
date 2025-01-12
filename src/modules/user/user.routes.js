import {Router} from 'express';
import { signIn, signUp } from './userController.js';

const userRouter = Router();

// Define routes
userRouter.post('/signUp',signUp);
userRouter.post('/signIn',signIn);

export default userRouter;