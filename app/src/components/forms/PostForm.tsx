import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { CREATE_POST } from '../../graphql/mutations/createPost';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { errorToast, successToast } from '../../toast';

type PostFormProps = {
  open: boolean;
  handleClose: () => void;
};

export const PostForm = ({ open, handleClose }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createPost, { data, loading }] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS, 'GetPosts'],
    onCompleted: () => {
      successToast('Post created!');
      handleClose();
    },
    onError: (error) => errorToast(error),
  });

  const active = title && description;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Job Posting</DialogTitle>
      <DialogContent>
        <form className="form-content">
          <TextField
            autoFocus
            label="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            autoFocus
            label="Description"
            type="text"
            multiline
            sx={{ marginTop: 2 }}
            minRows={5}
            className="description-input"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={!active}
          loading={loading && !data}
          type="submit"
          onClick={() =>
            createPost({
              variables: { input: { title, description } },
            })
          }
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
