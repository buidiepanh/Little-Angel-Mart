import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, gql } from "@apollo/client";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import './CartPage.css';
import { PiShoppingCartLight } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

const GET_CART = gql`
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

const GET_CART_ITEMS = gql`
  query Query($where: CartItemWhereInput!) {
    cartItems(where: $where) {
      cartId {
        id
      }
      id
      price
      quantity
      productId {
        id
        name
        productImage {
          publicUrl
        }
        productPrice
      }
    }
  }
`;

const UPDATE_CART = gql`
  mutation UpdateCart($where: CartWhereUniqueInput!, $data: CartUpdateInput!) {
    updateCart(where: $where, data: $data) {
      quantity
    }
  }
`;

const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($where: CartItemWhereUniqueInput!) {
    deleteCartItem(where: $where) {
      cartId {
        id
      }
      id
      price
      quantity
      productId {
        id
      }
    }
  }
`;

const CartPage = () => {
  const { data: cartData, refetch: refetchCart } = useQuery(GET_CART, {
    variables: {
      where: {
        id: localStorage.getItem("cartId"),
      },
    },
    skip: !localStorage.getItem("cartId"),
  });

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [updateCart] = useMutation(UPDATE_CART);
  const cartId = localStorage.getItem("cartId");

  const { data, loading, error: queryError, refetch: refetchItems } = useQuery(GET_CART_ITEMS, {
    variables: {
      where: {
        cartId: {
          id: {
            equals: cartId || ""
          }
        }
      }
    },
    skip: !cartId,
  });

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);

  useEffect(() => {
    if (data && data.cartItems) {
      console.log("Fetched cart items:", data.cartItems);
      setItems(data.cartItems);
    }
  }, [data]);

  const handleQuantityChange = (id, delta) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setItems(updatedItems);
  };

  const handleRemoveItem = async (id) => {
    let itemsCount = cartData?.cart?.quantity || 0;
    console.log(itemsCount);
    const itemExists = items.find(item => item.id === id);
    if (!itemExists) {
      setError(`Item with id ${id} does not exist in the cart.`);
      return;
    }

    try {
      await deleteCartItem({
        variables: {
          where: { id: id }
        }
      });
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      await updateCart({
        variables: {
          where: { id: cartId },
          data: { quantity: itemsCount - 1 },
        },
      });
    } catch (err) {
      setError(`Error deleting cart item: ${err.message}`);
    }
    await refetchCart();
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cartId) return <div>Error: cartId is missing. Please add items to your cart.</div>;

  if (loading) return <div>Loading...</div>;
  if (queryError) return <div>Error loading cart items: {queryError.message}</div>;

  return (
    <div className='shoppingCartPage'>
      <Header />
      <div className="shopping-cart-container">
        <div className="progress-bar">
          <div className="step active">
            <div className="icon"><PiShoppingCartLight /></div>
            <span>Giỏ hàng</span>
          </div>
          <div className="step">
            <div className="icon"><RxPerson /></div>
            <span>Thông tin khách hàng</span>
          </div>
          <div className="step">
            <div className="icon"><GoCreditCard /></div>
            <span>Thanh toán</span>
          </div>
          <div className="step">
            <div className="icon"><FaCheck /></div>
            <span>Xác nhận đơn hàng</span>
          </div>
        </div>
        <div className="contentCart">
          <div className="shopping-cart">
            <h2 className='titleCart'>Giỏ hàng</h2>
            {error && <div className="error-message">{error}</div>}
            {items.map(item => (
              <div key={item.id} className="cart-item">
                {item.productId.productImage && (
                  <img src={item.productId.productImage.publicUrl} alt={item.productId.name} className="cart-item-image" />
                )}
                <div className="cart-item-details">
                  <h3>{item.productId.name}</h3>
                  <p className="price">Giá: {item.price.toLocaleString("vi-VN")}đ</p>
                  <div className="cart-item-quantity">
                    <span>Số lượng:</span>
                    <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Xóa khỏi giỏ hàng</button>
                </div>
              </div>
            ))}
          </div>
          <div className="total-section">
            <p>Tổng cộng ({items.length} sản phẩm): <strong>{total.toLocaleString("vi-VN")}đ</strong></p>
            <div className='btns'>
              <Link to='/'><button className="back-button">Quay lại</button></Link>
              {items.length > 0 ? (
                <Link to='/CustomerCartInfo'><button className="continue-button">Tiếp tục</button></Link>
              ) : (
                <button className="continue-button" disabled>Tiếp tục</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
