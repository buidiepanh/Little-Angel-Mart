import { gql } from "@apollo/client";

export const GET_CATEGORYS = gql`
  query Categories {
    categories {
      name
    }
  }
`;
