import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostInput, Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  posts: Post[];
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }

  async createPost(post: CreatePostInput): Promise<Post> {
    return this.postModel.create(post);
  }

  async updatePostState(id: string, feeAmount: number): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, { state: 'paid', feeAmount });
  }
}
