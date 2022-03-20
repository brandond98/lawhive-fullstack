import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';

export type UpdatePostState = (
  // eslint-disable-next-line no-unused-vars
  options?:
    | MutationFunctionOptions<
        any,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined,
) => Promise<any>;
