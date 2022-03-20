import { useMutation } from '@apollo/client';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { SettlementForm } from '../../Forms';
import { UPDATE_POST_STATE } from '../../graphql/mutations/updatePostState';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { successToast } from '../../toast';
import { PostType } from '../../types/Post';
import './styles.css';

type PostProps = {
  post: PostType;
};

export const Post = ({ post }: PostProps) => {
  const [open, setOpen] = useState(false);
  const [updatePostState] = useMutation(UPDATE_POST_STATE, {
    refetchQueries: [GET_POSTS, 'GetPosts'],
    onCompleted: () => successToast('Payment successful!'),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // If fee structure is fixed update post state
    if (post.feeStructure === 'fixed-fee')
      updatePostState({
        variables: { id: post._id, amountPaid: post.feeAmount },
      });
    else {
      // Otherwise open dialog to enter settlment amount
      handleOpen();
    }
  };

  return (
    <>
      <SettlementForm
        open={open}
        handleClose={handleClose}
        updatePostState={updatePostState}
        post={post}
      />
      <Box className="post">
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <Box className="payment">
          {post.state === 'started' ? (
            <Button onClick={handleSubmit}>Mark as paid</Button>
          ) : (
            <span className="paid">{`Paid: ${post.amountPaid} `}</span>
          )}
        </Box>
      </Box>
    </>
  );
};
