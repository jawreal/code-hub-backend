import { Request, Response, NextFunction } from 'express';
import UserInfo from '../models/user.info.model';

export const getInfo = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await UserInfo.findOne({ username: req.params?.username });
    if (!result) throw new Error();
    res.status(200).json(result);
  }catch(err){
    next(err);
  }
};


export const uploadPost = (req: Request, res: Response) => {
  console.log(req.body);
};