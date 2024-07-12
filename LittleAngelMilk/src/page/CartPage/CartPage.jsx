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
import { Pagination } from '@mui/material';
import { saveProduct, setCartItems } from "../../store/product/productSlice";
import { useDispatch } from "react-redux";
import {GET_CARTS, GET_CART, GET_CART_ITEMS} from "../../page/Queries/cart"
import Swal from "sweetalert2";



const UPDATE_CART = gql`
  mutation UpdateCart($where: CartWhereUniqueInput!, $data: CartUpdateInput!) {
    updateCart(where: $where, data: $data) {
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
        name
        productImage {
          publicUrl
        }
        productPrice
      }
    }
  }
`;

const CartPage = () => {
  const userLogInId = localStorage.getItem("userId");
  const { data: cartData, refetch: refetchCart } = useQuery(GET_CARTS, {
    variables: {
      where: {
        user:{
          id: {
            equals: userLogInId,
          }
        }
      },
    },
    skip: !userLogInId,
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [updateCart] = useMutation(UPDATE_CART);
  const cartId = cartData?.carts[0]?.id;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const itemsPerPage = 3;

  const { data, loading, error: queryError, refetch: refetchItems } = useQuery(GET_CART_ITEMS, {
    variables: {
      where: {
        cartId: {
          id: {
            equals: cartId || ""
          }
        }
      },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    },
    skip: !cartId,
  });

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);
  useEffect(() => {
    console.log("cartdataid: ", cartData?.carts[0]?.id);
    console.log("userId: ", userLogInId);
    if (data && data.cartItems) {
      console.log("Fetched cart items:", data.cartItems);
      setItems(data.cartItems);
      dispatch(setCartItems(data.cartItems))

    }
  }, [data]);
  const handleNotification = () =>{
    Swal.fire({
      icon: "error",
      title: "Giỏ hàng của bạn đang rỗng!",
    });
  }
  const handleQuantityChange = (id, delta) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setItems(updatedItems);
  };

  const handleRemoveItem = async (id) => {
    let itemsCount = cartData?.carts[0]?.quantity || 0;
    if(itemsCount < 0) itemsCount = 0;
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

      // Update the cart quantity
      await updateCart({
        variables: {
          where: { id: cartId },
          data: { quantity: itemsCount - 1 },
        },
      });

      // Refetch cart data and items
      await refetchCart();
      await refetchItems();

      // Recalculate the total number of pages
      const totalPages = Math.ceil((itemsCount - 1) / itemsPerPage);
      // Ensure the current page is valid
      if (page > totalPages) {
        setPage(totalPages);
        refetchItems({
          variables: {
            where: {
              cartId: {
                id: {
                  equals: cartId || ""
                }
              }
            },
            skip: (totalPages - 1) * itemsPerPage,
            take: itemsPerPage,
          },
        });
      }
    } catch (err) {
      setError(`Error deleting cart item: ${err.message}`);
    }
  };
  const calculateTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const totalQuantity = calculateTotalQuantity();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // if (!cartId) return <div>Error: cartId is missing. Please add items to your cart.</div>;

  
  if (queryError) return <div>Error loading cart items: {queryError.message}</div>;

  const handlePageChange = (event, value) => {
    setPage(value);
    refetchItems({
      variables: {
        where: {
          cartId: {
            id: {
              equals: cartId || ""
            }
          }
        },
        skip: (value - 1) * itemsPerPage,
        take: itemsPerPage,
      },
    });
  };
  const paginatedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
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
            <div className="icon"><FaCheck /></div>
            <span>Xác nhận đơn hàng</span>
          </div>
        </div>
        <div className="contentCart">
          <div className="shopping-cart">
            <h2 className='titleCart'>Giỏ hàng</h2>
            
            {paginatedItems.map(item => (
              <div key={item.id} className="cart-item">
                {item.productId[0] && item.productId[0].productImage && (
                  <img src={item.productId[0].productImage.publicUrl} alt={item.productId[0].name} className="cart-item-image" />
                )}
                <div className="cart-item-details">
                  <h3>{item.productId[0]?.name}</h3>
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
            <p>Tổng cộng ({totalQuantity} sản phẩm): <strong>{total.toLocaleString("vi-VN")}đ</strong></p>
            <div className='btns'>
              <Link to='/'><button className="back-button">Quay lại</button></Link>
              {items.length > 0 ? (
                <Link to='/CustomerCartInfo'><button className="continue-button">Tiếp tục</button></Link>
              ) : (
                <button className="continue-button" onClick={handleNotification}>Tiếp tục</button>
              )}
            </div>
          </div>
        </div>
        <Pagination count={Math.ceil(items.length / itemsPerPage)} page={page} onChange={handlePageChange} />
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
