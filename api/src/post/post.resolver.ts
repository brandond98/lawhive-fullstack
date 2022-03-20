import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScraperService } from 'src/scraper/scraper.service';
import { CreatePostInput, Post } from './post.schema';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(
    private postService: PostService,
    private scraperService: ScraperService,
  ) {}

  @Query(() => [Post])
  async posts() {
    return this.postService.findAll();
  }

  @Mutation(() => Post)
  async createPost(@Args('input') post: CreatePostInput) {
    const description = await this.scraperService.getData(post.url);
    return this.postService.createPost(post, description);
  }

  @Mutation(() => Post)
  async updatePostState(
    @Args('postId') postId: string,
    @Args('amountPaid') amountPaid: number,
  ) {
    return this.postService.updatePostState(postId, amountPaid);
  }
}
