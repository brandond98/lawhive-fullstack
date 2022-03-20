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
import { CREATE_POST } from '../../graphql/mutations/createPost';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { handleChange } from '../../helpers';
import { errorToast, successToast } from '../../toast';
import './styles.css';

type PostFormProps = {
  open: boolean;
  handleClose: () => void;
};

export const PostForm = ({ open, handleClose }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [feeStructure, setFeeStructure] = useState('');
  const [feeAmount, setFeeUnit] = useState(0);
  const [feePercentage, setFeePercentage] = useState(0);
  const [expectedSettlement, setExpectedSettlement] = useState(0);

  const [createPost, { data, loading }] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS, 'GetPosts'],
    onCompleted: () => {
      successToast('Post created!');
      handleClose();
    },
    onError: (error) => errorToast(error.message),
  });

  const handleCreate = () =>
    createPost({
      variables: {
        input: {
          title,
          description,
          feeStructure,
          feeAmount,
          feePercentage,
          expectedSettlement,
        },
      },
    });

  const active =
    title &&
    description &&
    feeStructure &&
    expectedSettlement &&
    (feePercentage || feeAmount);

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
            required
          >
            <MenuItem value="no-win-no-fee">No Win No Fee</MenuItem>
            <MenuItem value="fixed-fee">Fixed Fee</MenuItem>
          </Select>
          {feeStructure && (
            <TextField
              type="number"
              label={feeStructure === 'no-win-no-fee' ? 'Percentage' : 'Amount'}
              onChange={
                feeStructure === 'no-win-no-fee'
                  ? handleChange(setFeePercentage, true)
                  : handleChange(setFeeUnit, true)
              }
              sx={{ marginTop: 2 }}
              required
            />
          )}
          {feeStructure === 'no-win-no-fee' && (
            <TextField
              type="number"
              onChange={handleChange(setExpectedSettlement, true)}
              label="Expected Settlement Amount"
              sx={{ marginTop: 2 }}
              required
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
