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
    return this.postService.createPost(post);
  }

  @Mutation(() => Post)
  async updatePostState(
    @Args('postId') postId: string,
    @Args('amountPaid') amountPaid: number,
  ) {
    this.scraperService.getData('https://www.bbc.co.uk/news/world-59793040');
    return this.postService.updatePostState(postId, amountPaid);
  }
}
