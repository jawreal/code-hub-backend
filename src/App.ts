import express, { Express } from 'express';
import passport from 'passport';
import morgan from 'morgan'
import router from './routes/userRoutes';
import dotenv from 'dotenv';
dotenv.config();   
import cors from 'cors';
import mongoose from 'mongoose';
//import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import session from 'express-session';
const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(express.json());
//app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET as string, 
  resave: false, 
  rolling: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true, 
    sameSite: 'strict', 
    maxAge: 1000 * 60 * 60,
  }, 
})); 
app.use(passport.session()); //after express session 
//cors are always first before the routes
mongoose.connect(MONGO_URI).then(() => console.log("Connected on mongodb atlas")).catch((err) => console.error("Error on connecting in mongodb atlas", err))
app.use('/server', router);
app.use(errorHandler); //this always last 

app.listen(PORT, () => {
  console.log("Listening in PORT", PORT)
});