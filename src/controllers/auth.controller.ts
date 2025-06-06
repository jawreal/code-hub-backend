import { Request, Response, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response) => {
  if(!req.isAuthenticated()){
    res.json({ authenticated: false });
    return //always add return if you have a response below
  }
  res.json({ authenticated: true });
};

export const signout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err: Error) => {
    if(err){
      next(err);
      return
    }
    res.clearCookie('connect.sid');
    res.status(200).send('Signout')
  })
};