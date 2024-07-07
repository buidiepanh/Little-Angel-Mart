import { gql } from "@apollo/client";

//query to get User
export const GET_PROFILE = gql`
  query Query {
    users {
      name
      userEmail
      userAddress
      userPhone
    }
  }
`;
