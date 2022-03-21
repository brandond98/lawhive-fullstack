import { Box, Select } from '@mui/material';
import { Field, useField } from 'formik';
import React from 'react';

type FormikSelectProps = {
  name: string;
  [x: string]: any;
  children: React.ReactNode;
};

export const FormikSelect = ({ children, ...props }: FormikSelectProps) => {
  const [field, meta] = useField(props);

  return (
    <Box>
      <Field as={Select} {...field} {...props} fullWidth>
        {children}
      </Field>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Box>
  );
};
