import connectDB from './src/DB/ConnectionDB.js';  // Default import
import errorHandler from './src/middlewares/errorhandlerMiddleware.js';
import userRouter from './src/modules/user/user.controller.js';


function bootstrap(app, express) {
    connectDB();  // Use the default imported connectDB function
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/user', userRouter)
    app.use(errorHandler)
    app.get('/', (_req, res) => res.send('Hello World!'));
    app.use('*', (req, res, next) => {
        res.status(404).send({message: `Route ${req.originalUrl} not found`});
    });
    
}

export default bootstrap;
