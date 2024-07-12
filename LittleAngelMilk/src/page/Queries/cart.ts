import { gql } from "@apollo/client";

// Query to get cart
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
export const GET_CARTS = gql`
query Carts($where: CartWhereInput!) {
  carts(where: $where) {
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
`
// Query to get cart items
export const GET_CART_ITEM = gql`
  query CartItem($where: CartItemWhereInput!) {
    cartItems(where: $where) {
      id
      productId {
        id
        name
        productImage {
          publicUrl
        }
        productPrice
      }
      quantity
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems($where: CartItemWhereInput!) {
    cartItems(where: $where) {
      id
      productId {
        id
        name
        productImage {
          publicUrl
        }
        productPrice
      }
      quantity
      price
    }
  }
`;
