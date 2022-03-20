export const calculatePayment = (amount: number, percentage: number) => {
  return amount * (percentage / 100);
};
