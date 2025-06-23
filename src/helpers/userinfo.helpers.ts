import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as GithubProfile } from 'passport-github2';
import UserInfo from '../models/user.info.model';

export const updateUserInfo = async (profile: GoogleProfile | GithubProfile): Promise<any | Error> => {
  try {
    const isGithub = profile.provider === "github";
    const filter = isGithub
      ? { username: profile.username }
      : { email: profile.emails![0]!.value }; 

    const update = {
      $setOnInsert: {
        displayName: profile.displayName,
        [isGithub ? "username" : "email"]: isGithub ? profile.username : profile.emails![0]!.value,
        profile_img: profile!.photos![0].value
      },
      $set: {
        lastSignin: Date.now()
      }
    }; //$ + key can be used in ts & js it's considered as string 

    const result = await UserInfo.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });

    if (!result) throw new Error("User update failed");

    return result;
  } catch (err) {
    return err;
  }
};
