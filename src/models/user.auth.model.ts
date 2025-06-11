import { Schema, model } from 'mongoose';

//unique property sets an index by default, so no need to use index
const userSchema = new Schema({
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

const User = model('User', userSchema);

export default User;