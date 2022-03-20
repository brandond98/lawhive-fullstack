import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      title
      description
      state
      feeStructure
      feeAmount
      feePercentage
      amountPaid
      expectedSettlement
    }
  }
`;
