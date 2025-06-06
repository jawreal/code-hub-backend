import { Request, Response, NextFunction } from 'express';

//error handler must have 4 parameters
const errorHandler = (err: Error, _req:Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;