import passport from 'passport';
import { Profile as GoogleProfile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubSrategy, Profile as GithubProfile} from 'passport-github2';
import User from '../models/user.auth.model'
import UserInfo from '../models/user.info.model'
import { updateUserInfo } from '../helpers/userinfo.helpers'
import dotenv from 'dotenv';
dotenv.config();

type Done = (error: any, user?: Express.User | false, info?: any) => void;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}, async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: Done) => {
  try{
    const data = await updateUserInfo(profile);
    if(!data) throw new Error();
    return done(null, data) 
  }catch(err){
    done(err);
  }
}));

passport.use(new GithubSrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: process.env.GITHUB_CALLBACK_URL || '', 
}, async (accessToken: string, refreshToken: string, profile: GithubProfile, done: Done) => {
  try{
    const data = await updateUserInfo(profile);
    if(!data) throw new Error();
    return done(null, data) 
  }catch(err){
    done(err);
  }
}));

passport.use(new LocalStrategy({
  usernameField: "email", 
  passwordField: "password" 
}, async (email: string, password: string, done: Done) => {
  try {
    const user = await User.findOne({ email: email });
    if(!user) throw new Error();
    const isCorrect = await user.validateCredentials(password, email);
    if(isCorrect){
      done(null, user);
    }else{
      done(null, false)
    }
  }catch(error){
    done(error);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
