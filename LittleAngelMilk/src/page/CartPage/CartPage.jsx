import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import "./CartPage.css";
import { PiShoppingCartLight } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

const CartPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setItems(storedItems);
  }, []);

  const handleQuantityChange = (id, delta) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const total = items.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  return (
    <div className="shoppingCartPage">
      <Header />
      <div className="shopping-cart-container">
        <div className="progress-bar">
          <div className="step active">
            <div className="icon">
              <PiShoppingCartLight />
            </div>
            <span>Giỏ hàng</span>
          </div>
          <div className="step">
            <div className="icon">
              <RxPerson />
            </div>
            <span>Thông tin khách hàng</span>
          </div>
          <div className="step">
            <div className="icon">
              <GoCreditCard />
            </div>
            <span>Thanh toán</span>
          </div>
          <div className="step">
            <div className="icon">
              <FaCheck />
            </div>
            <span>Xác nhận đơn hàng</span>
          </div>
        </div>
        <div className="contentCart">
          <div className="shopping-cart">
            <h2 className="titleCart">Giỏ hàng</h2>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                {item.productImage?.publicUrl && (
                  <img
                    src={item.productImage.publicUrl}
                    alt={item.name}
                    className="cart-item-image"
                  />
                )}
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="price">
                    Giá: {item.productPrice.toLocaleString("vi-VN")}đ
                  </p>
                  <div className="cart-item-quantity">
                    <span>Số lượng:</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Xóa khỏi giỏ hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total-section">
            <p>
              Tổng cộng ({items.length} sản phẩm):{" "}
              <strong>{total.toLocaleString("vi-VN")}đ</strong>
            </p>
            <div className="btns">
              <Link to="/">
                <button className="back-button">Quay lại</button>
              </Link>
              <Link to="/CustomerCartInfo">
                <button className="continue-button">Tiếp tục</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
