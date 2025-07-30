import { Schema, Types, model } from 'mongoose';

interface IPost {
  post_type: string;
  title: string;
  body: string;
  user: Types.ObjectId;
  tags: Types.ObjectId[];
};

interface ITags extends Pick<IPost, 'user'> {
  name: string;
}

const postSchema = new Schema<IPost>({
  post_type: String, 
  title: String, 
  body: String, 
  user: { type: Schema.Types.ObjectId },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], 
});

const tagSchema = new Schema<ITags>({
  name: String, 
  user: { type: Schema.Types.ObjectId }
});

export const Post = model<IPost>('Post', postSchema);
export const Tag = model<ITags>('Tag', tagSchema);