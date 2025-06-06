import express, { Express } from 'express';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import authRouter from './routers/auth.router';
const app: Express = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost/5173', 
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
    maxAge: 1000 * 60 * 60
  }
}))
app.use('/auth', authRouter);



export default app;