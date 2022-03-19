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

type PostFormProps = {
  open: boolean;
  handleClose: () => void;
};

export const PostForm = ({ open, handleClose }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createPost, { loading }] = useMutation(CREATE_POST);

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
          />
        </form>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={!active}
          loading={loading}
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
