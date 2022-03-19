import { Resolver, Query } from '@nestjs/graphql';
import { Post } from './post.schema';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}
  @Query(() => [Post])
  async posts() {
    return this.postService.findAll();
  }
}
