import { gql } from "@apollo/client";

//Mutation to post data when login
export const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(userEmail: $email, userPassword: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          userPhone
          userEmail
          userAddress
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

//Mutation for update User's profile
export const UPDATE_PROFILE = gql`
mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    name
    userEmail
    userPhone
    userAddress
  }
}
`;
