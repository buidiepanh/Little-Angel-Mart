import { gql } from "@apollo/client";

// Query to get post
export const GET_POSTS = gql`
  query Query($take: Int) {
    posts(take: $take) {
      id
      title
      image {
        publicUrl
      }
      link {
        document
      }
      content
    }
  }
`;
