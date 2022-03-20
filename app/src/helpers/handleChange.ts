import { SelectChangeEvent } from '@mui/material';
import React from 'react';

export const handleChange = (
  setState: React.Dispatch<React.SetStateAction<any>>,
  number?: boolean,
) => {
  return (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>,
    // Check if number parameter passed and return string or number
  ) => setState(number ? parseInt(e.target.value, 10) : e.target.value);
};
