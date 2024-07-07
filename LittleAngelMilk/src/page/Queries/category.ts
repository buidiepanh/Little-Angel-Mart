import { gql } from "@apollo/client";

//Query to get category
export const GET_CATEGORYS = gql`
  query Categories {
    categories {
      name
    }
  }
`;
