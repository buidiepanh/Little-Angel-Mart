

import React, { useState, useEffect } from "react";
import "./CustomerInfo.css";
import { PiShoppingCartLight } from "react-icons/pi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import { RxPerson } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomerInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [showCartStep, setShowCartStep] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lastAction = localStorage.getItem("lastAction");
    if (lastAction === "addToCart") {
      setShowCartStep(true);
    }

    // Load user data from local storage
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedPhoneNumber = localStorage.getItem("userPhoneNumber");
    const storedAddress = localStorage.getItem("userAddress");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
    if (storedAddress) setAddress(storedAddress);
  }, []);

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
    const nameError = name.trim() === "" ? "Họ và tên là bắt buộc." : null;
    const addressError = address.trim() === "" ? "Địa chỉ là bắt buộc." : null;

    setErrors({
      name: nameError,
      email: emailError,
      phoneNumber: phoneNumberError,
      address: addressError,
    });

    if (!emailError && !phoneNumberError && !nameError && !addressError) {
      console.log("Form is valid. Submitting...");
      navigate("/OrderConfirmation");
    }
  };

  const handleBackClick = () => {
    const lastAction = localStorage.getItem("lastAction");
    if (lastAction === "buyNow") {
      navigate("/");
    } else if (lastAction === "addToCart") {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="full-page-container">
      <div className="customer-info-form-container">
        <div className="progress-container">
          {showCartStep && (
            <div className="step active">
              <div className="icon">
                <PiShoppingCartLight />
              </div>
              <div className="label">Giỏ hàng</div>
            </div>
          )}
          <div className="step active">
            <div className="icon">
              <RxPerson />
            </div>
            <div className="label">Thông tin khách hàng</div>
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
            {errors.name && <p className="error">{errors.name}</p>}
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
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="button-group">
            <button type="button" className="button back-button" onClick={handleBackClick}>
              Quay lại
            </button>
            <button type="submit" className="button submit-button">
              Xác nhận và tiếp tục thanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerInfo;
