import passport from 'passport';
import { Profile as GoogleProfile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubSrategy, Profile as GithubProfile} from 'passport-github2';
import dotenv from 'dotenv';
dotenv.config();

type Done = (error: any, user?: Express.User | false, info?: any) => void;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}, (accessToken: string, refreshToken: string, profile: GoogleProfile, done: Done) => {
  return done(null, profile);
}));

passport.use(new GithubSrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: process.env.GITHUB_CALLBACK_URL || '', 
}, (accessToken: string, refreshToken: string, profile: GithubProfile, done: Done) => {
  return done(null, profile)
}));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
