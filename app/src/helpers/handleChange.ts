import { SelectChangeEvent } from '@mui/material';
import React from 'react';

export const handleChange = (
  setState: React.Dispatch<React.SetStateAction<any>>,
) => {
  return (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<any>,
  ) => setState(e.target.value);
};
