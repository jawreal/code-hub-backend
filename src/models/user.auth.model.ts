import { Schema, model, Document } from 'mongoose';

interface IUser extends Document{
  email: string;
  password: string;
  createdAt: Date;
}

//unique property sets an index by default, so no need to use index
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

const User = model<IUser>('User', userSchema);

export default User;