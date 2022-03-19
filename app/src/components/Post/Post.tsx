import { Box } from '@mui/material';
import { PostType } from '../../types/Post';
import './styles.css';

type PostProps = {
  post: PostType;
};

export const Post = ({ post }: PostProps) => {
  return (
    <Box className="post">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </Box>
  );
};
