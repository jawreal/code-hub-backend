import { Request, Response } from 'express';

export const checkAuth = (req: Request, res: Response) => {
  res.json({ message: "Hello World"});
};