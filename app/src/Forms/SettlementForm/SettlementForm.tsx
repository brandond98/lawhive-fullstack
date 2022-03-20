import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { calculatePayment, handleChange } from '../../helpers';
import { PostType } from '../../types/Post';
import { UpdatePostState } from '../../types/UpdatePostState';

type SettlmentFormProps = {
  post: PostType;
  open: boolean;
  handleClose: () => void;
  updatePostState: UpdatePostState;
};

export const SettlementForm = ({
  open,
  handleClose,
  updatePostState,
  post,
}: SettlmentFormProps) => {
  const [amount, setAmount] = useState(0);
  const handleSubmit = () => {
    const payment = calculatePayment(amount, post.feePercentage);
    updatePostState({ variables: { id: post._id, amountPaid: payment } });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter settlement amount</DialogTitle>
      <DialogContent>
        <TextField
          type="number"
          required
          label="Amount"
          value={amount}
          onChange={handleChange(setAmount, true)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
