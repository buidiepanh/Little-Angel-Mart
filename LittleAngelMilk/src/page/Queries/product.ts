import { gql } from "@apollo/client";

// Query to get  product
export const GET_PRODUCT = gql`
  query GET_PRODUCT($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      productPrice
      productImage {
        publicUrl
      }
      productDescription
      name
      id
    }
  }
`;

// Query to get all products
export const GET_PRODUCTS = gql`
  query Query($take: Int) {
    products(take: $take) {
      id
      name
      productPrice
      productImage {
        publicUrl
      }
      category {
        name
      }
      productDescription
    }
  }
`;

export const GET_PRODUCT_FEEDBACK = gql`
  query GetProductFeedback($productId: ID!) {
    feedbacks(where: { product: { id: { equals: $productId } } }) {
      id
      comment
      createdAt
      user {
        name
      }
    }
  }
`;