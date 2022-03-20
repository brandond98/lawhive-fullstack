import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { CREATE_POST } from '../graphql/mutations/createPost';
import { GET_POSTS } from '../graphql/queries/getPosts';
import { handleChange } from '../helpers';
import { errorToast, successToast } from '../toast';

type PostFormProps = {
  open: boolean;
  handleClose: () => void;
};

export const PostForm = ({ open, handleClose }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [feeStructure, setFeeStructure] = useState('');
  const [feeUnit, setFeeUnit] = useState(0);

  const [createPost, { data, loading }] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS, 'GetPosts'],
    onCompleted: () => {
      successToast('Post created!');
      handleClose();
    },
    onError: (error) => errorToast(error),
  });

  const handleCreate = () =>
    createPost({
      variables: {
        input: { title, description, feeStructure, feeUnit },
      },
    });

  const active = title && description && feeStructure && feeUnit;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Job Posting</DialogTitle>
      <DialogContent>
        <FormControl className="form-content" sx={{ padding: '1rem' }}>
          <TextField
            autoFocus
            label="Title"
            type="text"
            onChange={handleChange(setTitle)}
            required
          />
          <TextField
            label="Description"
            type="text"
            multiline
            sx={{ marginTop: 2 }}
            minRows={5}
            className="description-input"
            onChange={handleChange(setDescription)}
            required
          />
          <Select
            onChange={handleChange(setFeeStructure)}
            value={feeStructure}
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="no-win-no-fee">No Win No Fee</MenuItem>
            <MenuItem value="fixed-fee">Fixed Fee</MenuItem>
          </Select>
          {feeStructure && (
            <TextField
              type="number"
              label={feeStructure === 'no-win-no-fee' ? 'Percentage' : 'Amount'}
              onChange={handleChange(setFeeUnit)}
              sx={{ marginTop: 2 }}
            />
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={!active}
          loading={loading && !data}
          type="submit"
          onClick={handleCreate}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
