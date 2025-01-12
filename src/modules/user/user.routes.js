import {Router} from 'express';
import { getProfile, signIn, signUp } from './userController.js';
import { Auth } from '../../middlewares/authMiddleware.js';

const userRouter = Router();

// Define routes
userRouter.post('/signUp',signUp);
userRouter.post('/signIn',signIn);
userRouter.get('/getProfile',Auth,getProfile);

export default userRouter;