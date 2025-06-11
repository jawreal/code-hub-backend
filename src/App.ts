import dotenv from 'dotenv';
import express, { Express } from 'express';
import passport from 'passport';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import authRouter from './routers/auth.router';
import mongoose from 'mongoose';
import errorHandler from './middleware/error.handler'
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || '';
const app: Express = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
}));
app.use(morgan('dev')); 
app.use(session({
  secret: process.env.SESSION_SECRET as string, 
  rolling: false, 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true, 
    sameSite: 'strict', 
    maxAge: 1000 * 60 * 60, 
    secure: false //false on dev
  }
}));
app.use(passport.initialize()); //initialize the passport with express 
app.use(passport.session()); //allow passport to work with express-session and should be after express-session
mongoose.connect(MONGO_URI).then(() => console.log("Connected on mongodb atlas")).catch((err) => console.error("Error on connecting in mongodb atlas", err));
app.use('/auth', authRouter);
app.use(errorHandler);//always last



export default app;