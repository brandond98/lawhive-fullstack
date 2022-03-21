import * as Yup from 'yup';

export const settlementValidationSchema = Yup.object({
  amount: Yup.number().required('Required'),
});
