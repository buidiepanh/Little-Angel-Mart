import productImage from '../../image/binhsua.jpg';

import React, { useState } from 'react';
import './CartPage.css';
import { PiShoppingCartLight } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
const ShoppingCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Product name',
      price: 10.99,
      quantity: 1,
      image: productImage
    },
    {
      id: 2,
      name: 'Product name',
      price: 10.99,
      quantity: 1,
      image: productImage
    }
  ]);

  const handleQuantityChange = (id, delta) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='shoppingCartPage'>
    <div className="shopping-cart-container">
      <div className="progress-bar">
        <div className="step active">
          <div className="icon"><PiShoppingCartLight />
          </div>
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
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="price">Giá: ${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <span>Số lượng:</span>
                  <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button className="remove-button">Xóa khỏi giỏ hàng</button>
              </div>
            </div>
          ))}
        </div>
        <div className="total-section">
          <p>Tổng cộng ({items.length} sản phẩm): <strong>${total.toFixed(2)}</strong></p>
          <div className='btns'>
          <Link  to='/CustomerCartInfo'><button className="continue-button">Tiếp tục</button></Link>
          <Link to='/'><button className="back-button">Quay lại</button></Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShoppingCart;
