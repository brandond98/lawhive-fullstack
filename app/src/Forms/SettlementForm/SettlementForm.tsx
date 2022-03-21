import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormikInput } from '../../components';
import { calculatePayment, isInRange } from '../../helpers';
import { settlementValidationSchema } from '../../schemas/settlementSchema';
import { errorToast } from '../../toast';
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
  const handleSubmit = (amount: number) => {
    // If settlement amount is within 10% range update post state
    if (isInRange(post.expectedSettlement, amount)) {
      const payment = calculatePayment(amount, post.feePercentage);
      updatePostState({ variables: { id: post._id, amountPaid: payment } });
      handleClose();
      // Otherwise show error message to user
    } else {
      errorToast('Settlement too low!');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter settlement amount</DialogTitle>
      <Formik
        initialValues={{ amount: 0 }}
        onSubmit={({ amount }) => handleSubmit(amount)}
        validationSchema={settlementValidationSchema}
      >
        {() => (
          <Form>
            <FormikInput type="number" required label="Amount" name="amount" />
            <LoadingButton type="submit">Submit</LoadingButton>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
