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
