import productImage from '../../image/binhsua.jpg';
// ShoppingCart.jsx
// ShoppingCart.jsx
import React, { useState } from 'react';
import './CartPage.css';

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
    <div className="shopping-cart-container">
      <div className="progress-bar">
        <div className="step active">
          <div className="icon">🛒</div>
          <span>Giỏ hàng</span>
        </div>
        <div className="step">
          <div className="icon">👤</div>
          <span>Thông tin khách hàng</span>
        </div>
        <div className="step">
          <div className="icon">💳</div>
          <span>Thanh toán</span>
        </div>
        <div className="step">
          <div className="icon">✔️</div>
          <span>Xác nhận đơn hàng</span>
        </div>
      </div>
      <div className="content">
        <div className="shopping-cart">
          <h2 className='titleCart'>Shopping Cart</h2>
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="price">Price: ${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <span>Quantity:</span>
                  <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button className="remove-button">Remove from Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className="total-section">
          <p>Total ({items.length} items): <strong>${total.toFixed(2)}</strong></p>
          <button className="continue-button">Tiếp tục</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
