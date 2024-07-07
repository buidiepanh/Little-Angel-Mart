import { gql } from "@apollo/client";

//Mutation to create cart
export const CREATE_CART = gql`
  mutation CreateCart($data: CartCreateInput!) {
    createCart(data: $data) {
      createdAt
      id
      itemsCount
      user {
        id
      }
    }
  }
`;

//Mutation to create cart item
export const CREATE_CART_ITEM = gql`
  mutation CreateCartItem($data: CartItemCreateInput!) {
    createCartItem(data: $data) {
      cartId {
        id
      }
      id
      productId {
        id
        name
      }
      quantity
      price
    }
  }
`;

//Mutation update cart item quantity
export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItem(
    $where: CartItemWhereUniqueInput!
    $data: CartItemUpdateInput!
  ) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }
`;

//Mutation update cart
export const UPDATE_CART = gql`
  mutation UpdateCart($where: CartWhereUniqueInput!, $data: CartUpdateInput!) {
    updateCart(where: $where, data: $data) {
      quantity
    }
  }
`;
