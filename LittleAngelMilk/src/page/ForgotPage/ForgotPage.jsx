import React, { useState } from "react";
import "./ForgotPage.css";
import { Link } from "react-router-dom";
import { IoReturnDownBackOutline } from "react-icons/io5";
import LOGO from "../../assets/Logo.jpg";
export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const handleEmailValue = (event) => {
    setEmail(event.target.value);
  };
  const handleButton = () => {
    localStorage.setItem("emailValue", email);
  };
  return (
    <div className="container">
      <div className="ForgotPassEmailForm">
        <div className="image-container">
          <img src={LOGO} alt="Logo" />
        </div>
        <div className="form-container">
          <div className="FormTitle">
            <p className="FormHead">Quên mật khẩu</p>
            <p>Hãy nhập email của bạn</p>
          </div>
          <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
            <div className="emailInput">
              <p>
                <b>Email</b>
              </p>
              <input
                type="text"
                id="userEmail"
                placeholder="example@gmail.com"
                onChange={handleEmailValue}
                required
              />
              <Link to="/ForgotPass">
                <button
                  type="submit"
                  className="ForgotPassEmailBtn"
                  onClick={handleButton}
                >
                  Tiếp tục
                </button>
              </Link>
              <Link to="/login" className="btn_icon_back">
                <IoReturnDownBackOutline /> Trở lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
