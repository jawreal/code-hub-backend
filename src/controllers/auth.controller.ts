import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

export const checkAuth = (req: Request, res: Response) => {
  if(!req.isAuthenticated()){
    res.json({ authenticated: false });
    return //always add return if you have a response below
  }
  const image = (req.user as any)?.photos[0]?.value;
  res.json({ authenticated: true, image: image });
};

export const signin = (req: Request, res: Response) => {
  passport.authenticate('local', (err: Error, user: any | false, info: any) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!user) return res.status(401).json({ message: "Incorrect credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });

      return res.status(200).json({ message: "Signed in successfully" });
    });
  })(req, res);
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