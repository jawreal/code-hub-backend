import { Request, Response } from 'express';
import passport from 'passport';

export const githubCallback = [
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:5173/sign-in'
  }),
  (_req: Request, res: Response) => {
    res.redirect('http://localhost:5173/home');
  }
];

export const googleCallback = [
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/sign-in'
  }),
  (req: Request, res: Response) => {
    res.redirect('http://localhost:5173/home');
  }
];
