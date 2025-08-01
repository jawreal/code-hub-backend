import { Request, Response, NextFunction } from 'express';
import UserInfo from '../models/user.info.model';
import { Post, Tag } from '../models/user.post.model';

interface ExtendUser extends Request {
  username?: string;
}

export const getInfo = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await UserInfo.findOne({ username: req.params?.username });
    if (!result) throw new Error();
    res.status(200).json(result);
  }catch(err){
    next(err);
  }
};


export const uploadPost = async (req: Request, res: Response, next: NextFunction) => {try {
   const { tags, ...otherData } = req.body;
   const user = await UserInfo.findOne({ username: (req.user as ExtendUser).username });
   if (user) {
     const arrayTags = tags.map((tag: any) => ({
      ...tag,
      user: user._id,
     }));
     const insertedTags = await Tag.insertMany(arrayTags); 
      const tagIds = insertedTags.map(tag => tag._id); 
      const post = new Post({ ...otherData, username: user.username, profile_img: user.profile_img, user: user._id, tags: tagIds });
      await post.save();
      res.status(200).json({ message: 'Post has been posted!' });
     }
  } catch (err) {
     next(err);
  }
};


export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await Post.find().populate('tags', 'name');
    res.status(200).json(result);
  }catch(err){
    next(err)
  }
}