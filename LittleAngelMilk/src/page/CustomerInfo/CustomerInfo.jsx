import React, { useState } from "react";
import "./CustomerInfo.css";
import { PiShoppingCartLight } from "react-icons/pi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import { RxPerson } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomerInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Địa chỉ email không hợp lệ.";
    }
    return null;
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d+$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return "Số điện thoại chỉ chứa chữ số.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const phoneNumberError = validatePhoneNumber(phoneNumber);

    setErrors({
      email: emailError,
      phoneNumber: phoneNumberError,
    });

    if (!emailError && !phoneNumberError) {
      console.log("Form is valid. Submitting...");
    }
  };

  return (
    <div className="full-page-container">
      <div className="customer-info-form-container">
        <div className="progress-container">
          <div className="step active">
            <div className="icon">
              <PiShoppingCartLight />
            </div>
            <div className="label">Giỏ hàng</div>
          </div>
          <div className="step active">
            <div className="icon">
              <RxPerson />
            </div>
            <div className="label">Thông tin khách hàng</div>
          </div>
          <div className="step">
            <div className="icon">
              <GoCreditCard />
            </div>
            <div className="label">Thanh toán</div>
          </div>
          <div className="step">
            <div className="icon">
              <FaCheck />
            </div>
            <div className="label">Xác nhận đơn hàng</div>
          </div>
        </div>
        <h2>Thông tin khách hàng</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên"
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label>Địa chỉ Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ Email"
              className="input"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="input"
              required
            />
            {errors.phoneNumber && (
              <p className="error">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
              className="input"
              required 
            />
          </div>

          <div className="button-group">
            <Link to="/Cart">
              {" "}
              <button type="button" className="button back-button">
                Quay lại
              </button>
            </Link>
            <Link to="/PaymentPage">
              <button type="submit" className="button submit-button">
                Xác nhận và tiếp tục thanh toán
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerInfo;
