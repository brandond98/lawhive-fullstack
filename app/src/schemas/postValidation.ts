import * as Yup from 'yup';

export const postValidationSchema = Yup.object({
  title: Yup.string()
    .min(1, 'Must be 1 character or more')
    .max(25, 'Must be 25 characters or less')
    .required('Required'),
  url: Yup.string().required('Required'),
  feeStructure: Yup.string().required('Required'),
  feeAmount: Yup.number(),
  feePercentage: Yup.number(),
  expectedSettlement: Yup.number(),
});
