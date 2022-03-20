import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePostInput, Post } from './post.schema';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async posts() {
    return this.postService.findAll();
  }

  @Mutation(() => Post)
  async createPost(@Args('input') post: CreatePostInput) {
    return this.postService.createPost(post);
  }

  @Mutation(() => Post)
  async updatePostState(
    @Args('postId') postId: string,
    @Args('amountPaid') amountPaid: number,
  ) {
    return this.postService.updatePostState(postId, amountPaid);
  }
}
