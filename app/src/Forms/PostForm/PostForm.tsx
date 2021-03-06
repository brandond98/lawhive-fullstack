import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, MenuItem, Select } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormikInput, FormikSelect } from '../../components';
import { CREATE_POST } from '../../graphql/mutations/createPost';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { postValidationSchema } from '../../schemas/postValidation';
import { errorToast, successToast } from '../../toast';
import './styles.css';

type PostFormProps = {
  open: boolean;
  handleClose: () => void;
};

export const PostForm = ({ open, handleClose }: PostFormProps) => {
  // Creats post and handle success or error

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS, 'GetPosts'],
    onCompleted: () => {
      successToast('Post created!');
      handleClose();
    },
    onError: (error) => errorToast(error.message),
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Job Posting</DialogTitle>
      <Formik
        initialValues={{
          title: '',
          url: '',
          feeStructure: '',
          feePercentage: 0,
          feeAmount: 0,
          expectedSettlement: 0,
        }}
        onSubmit={(input) => createPost({ variables: { input } })}
        validationSchema={postValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="post-form">
            <FormikInput autoFocus label="Title" required name="title" />
            <FormikInput
              label="Url"
              className="description-input"
              required
              name="url"
            />
            <FormikSelect required as={Select} name="feeStructure">
              <MenuItem value="no-win-no-fee">No Win No Fee</MenuItem>
              <MenuItem value="fixed-fee">Fixed Fee</MenuItem>
            </FormikSelect>
            {values.feeStructure === 'no-win-no-fee' && (
              <>
                <FormikInput
                  type="number"
                  label="Percentage"
                  required
                  name="feePercentage"
                />
                <FormikInput
                  type="number"
                  label="Expected Settlement Amount"
                  required
                  name="expectedSettlement"
                />
              </>
            )}
            {values.feeStructure === 'fixed-fee' && (
              <FormikInput
                type="number"
                label="Amount"
                required
                name="feeAmount"
              />
            )}
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
