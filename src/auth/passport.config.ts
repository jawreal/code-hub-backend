import passport from 'passport';
import { Profile as GoogleProfile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubSrategy, Profile as GithubProfile} from 'passport-github2';
import { comparePassword } from './encrypt.pass'
import User from '../models/user.auth.model'
import UserInfo from '../models/userinfo.model'
import dotenv from 'dotenv';
dotenv.config();

type Done = (error: any, user?: Express.User | false, info?: any) => void;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}, async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: Done) => {
  try{
    const result = await UserInfo.findOneAndUpdate({ email: profile!.emails![0].value },
    {
      $setOnInsert: {
        name: profile!.displayName,
        email: profile!.emails![0].value,
        profile_img: profile!.photos![0].value
      }
    },
    { new: true, upsert: true });
    console.log(result)
    if(!result) throw new Error();
    return done(null, result); 
  }catch(err){
    done(err)
  }
}));

passport.use(new GithubSrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: process.env.GITHUB_CALLBACK_URL || '', 
}, (accessToken: string, refreshToken: string, profile: GithubProfile, done: Done) => {
  console.log(profile)
  return done(null, profile)
}));

passport.use(new LocalStrategy({
  usernameField: "email", 
  passwordField: "password" 
}, async (email: string, password: string, done: Done) => {
  try {
    const user = await User.findOne({ email: email });
    if(!user) throw new Error();
    const isCorrect = await comparePassword(password, user.password);
    if(isCorrect && email === user.email){
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
