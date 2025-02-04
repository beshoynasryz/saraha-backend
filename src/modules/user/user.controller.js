import {Router} from 'express';
import { confirmEmail, getProfile, signIn, signUp } from './user.service.js';
import { Auth } from '../../middlewares/authMiddleware.js';
import validate from '../../middlewares/validationMiddleware.js';
import { loginUserSchema, registerUserSchema } from './user.validator.js';

const userRouter = Router();

// Define routes
userRouter.post('/signUp',validate(registerUserSchema), signUp);
userRouter.post('/signIn',validate(loginUserSchema),signIn);
userRouter.get('/getProfile',Auth,getProfile);
userRouter.get('/confirmEmail/:token', confirmEmail);

export default userRouter;