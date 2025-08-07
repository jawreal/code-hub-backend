import { Schema, Types, model } from 'mongoose';

interface IBase {
  username: string;
  profile_img: string; 
  body: string; 
}

interface ITimeStamps {
  createdAt: Date;
  updatedAt: Date; 
}

interface IComments extends IBase, ITimeStamps {}

interface IPost extends IBase, ITimeStamps {
  title: string; 
  post_type: string;
  user: Types.ObjectId;
  comments: Types.ObjectId[];
  tags: Types.ObjectId[];
}; 

interface ITags extends Pick<IPost, 'user'> {
  name: string;
} 

const baseSchema = new Schema<IBase>({
  username: String, 
  profile_img: String,  
  body: String, 
});

const tagSchema = new Schema<ITags>({
  name: String, 
  user: { type: Schema.Types.ObjectId }
});

const commentSchema = new Schema<IComments>({}, {
  timestamps: true
} )
commentSchema.add(baseSchema); //add base schema to the comment schema 

const postSchema = new Schema<IPost>({
  title: String,
  post_type: String, 
  user: { type: Schema.Types.ObjectId },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
}, {
  timestamps: true
});
postSchema.add(baseSchema); //add base schema to the post schema

export const Post = model<IPost>('Post', postSchema);
export const Tag = model<ITags>('Tag', tagSchema);
export const Comment = model<IComments>('Comment', commentSchema);
