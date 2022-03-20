import { gql } from '@apollo/client';

export const UPDATE_POST_STATE = gql`
  mutation UpdatePostState($id: String!, $feeAmount: Float!) {
    updatePostState(postId: $id, feeAmount: $feeAmount) {
      _id
      state
      feeAmount
    }
  }
`;
