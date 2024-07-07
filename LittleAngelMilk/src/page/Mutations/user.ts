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

//Mutation to create user
export const REGISTER_MUTATION = gql`
  mutation Mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      userAddress
      userEmail
      userPhone
      userPassword {
        isSet
      }
    }
  }
`;
