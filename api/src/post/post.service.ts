import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostInput, Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  posts: Post[];
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll() {
    return this.postModel.find();
  }

  async createPost(post: CreatePostInput) {
    return this.postModel.create(post);
  }
}
