import {Router} from 'express';
import { signUp } from './userController.js';

const userRouter = Router();

// Define routes
userRouter.post('/',signUp);

export default userRouter;