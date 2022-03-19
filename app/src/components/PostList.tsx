import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import { GET_POSTS } from '../graphql/queries/getPosts';
import { PostType } from '../types/Post';
import { Post } from './Post';

export const PostList = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  const { posts } = data;

  return (
    <section className="post-list">
      <Container>
        {posts.map((post: PostType) => (
          <Post post={post} />
        ))}
      </Container>
    </section>
  );
};
