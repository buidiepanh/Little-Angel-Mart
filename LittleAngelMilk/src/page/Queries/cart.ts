import { gql } from "@apollo/client";

//Query to get cart
export const GET_CART = gql`
  query Cart($where: CartWhereUniqueInput!) {
    cart(where: $where) {
      createdAt
      id
      itemsCount
      user {
        id
      }
      items {
        id
        productId {
          id
          name
        }
        quantity
        price
      }
      quantity
    }
  }
`;

//Query to get cart item
export const GET_CART_ITEM = gql`
  query Query($where: CartItemWhereUniqueInput!) {
    cartItem(where: $where) {
      id
      productId {
        id
      }
      quantity
    }
  }
`;