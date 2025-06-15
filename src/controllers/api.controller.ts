import { Request, Response } from 'express';
import UserInfo from '../models/user.info.model';

export const getInfo = (req: Request, res: Response) => {
  console.log(req.params.username)
  res.status(200).json({ message: "Testing"})
};