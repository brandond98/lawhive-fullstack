import { ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';

const topCenter = {
  position: toast.POSITION.TOP_CENTER,
};

export const errorToast = (error: ApolloError) => {
  return toast.error(`Error: ${error.message}`, topCenter);
};

export const successToast = (message: string) => {
  return toast.success(message, topCenter);
};
