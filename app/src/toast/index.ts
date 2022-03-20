import { toast } from 'react-toastify';

const topCenter = {
  position: toast.POSITION.TOP_CENTER,
};

export const errorToast = (message: string) => {
  return toast.error(`Error: ${message}`, topCenter);
};

export const successToast = (message: string) => {
  return toast.success(message, topCenter);
};
