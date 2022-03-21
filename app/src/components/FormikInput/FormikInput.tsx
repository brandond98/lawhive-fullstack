import { Box, TextField } from '@mui/material';
import { Field, useField } from 'formik';

type FormikInputProps = {
  name: string;
  [x: string]: any;
};

export const FormikInput = ({ ...props }: FormikInputProps) => {
  const [field, meta] = useField(props);

  return (
    <Box>
      <Field type="text" as={TextField} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Box>
  );
};
