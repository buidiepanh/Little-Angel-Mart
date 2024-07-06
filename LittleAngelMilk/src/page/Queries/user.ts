import { gql } from "@apollo/client";

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
