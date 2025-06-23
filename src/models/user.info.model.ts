import { Schema, model, Document } from 'mongoose';
import crypto from 'crypto';
//nodejs has crypto by default 

interface IUserInfo extends Document {
  displayName: string;
  email: string;
  username: string | (() => string);
  profile_img: string;
  totalQuestions: number;
  totalChallenges: number;
  totalAnswers: number;
  lastSignin: Date | (() => Date);
}

const userInfoSchema = new Schema<IUserInfo>({
  displayName: String, 
  email: { type:  String, default: "Not specified" }, 
  username: { type: String, unique: true, default: () => `username${crypto.randomBytes(4).toString('hex')}`},
  profile_img: { type: String, default: '' }, 
  totalQuestions: { type: Number, default: 0 },
  totalChallenges:  { type: Number, default: 0 }, 
  totalAnswers:  { type: Number, default: 0 }, 
  lastSignin: { type: Date, default: () => Date.now() }
});

const UserInfo = model<IUserInfo>('UserInfo', userInfoSchema);

export default UserInfo;

