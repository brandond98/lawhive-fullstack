import { gql } from '@apollo/client';

export const UPDATE_POST_STATE = gql`
  mutation UpdatePostState($id: String!, $amountPaid: Float!) {
    updatePostState(postId: $id, amountPaid: $amountPaid) {
      _id
      state
      amountPaid
    }
  }
`;
