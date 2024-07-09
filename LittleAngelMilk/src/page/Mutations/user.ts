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

//Mutation for update password.
export const CHANGE_PASSWORD = gql`
   mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      userPassword {
        isSet
      }
    }
  }
`;
