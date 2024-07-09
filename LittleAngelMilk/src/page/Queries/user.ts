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

//get user id
export const GET_USERID = gql`
query Query($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
  }
}
`;
