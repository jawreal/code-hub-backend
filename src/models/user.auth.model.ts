import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document{
  email: string;
  password: string;
  createdAt: Date;
  validateCredentials(plainPassword: string, usernameInput: string): Promise<boolean>;
}

//unique property sets an index by default, so no need to use index
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

userSchema.methods.validateCredentials = async function (plainPassword: string, usernameInput: string): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result && usernameInput === this.username;
};

const User = model<IUser>('User', userSchema);

export default User;