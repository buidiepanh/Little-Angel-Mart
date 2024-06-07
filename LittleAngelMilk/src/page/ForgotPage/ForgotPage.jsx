import React from 'react'
import "./ForgotPage.css";
import { Link } from 'react-router-dom';
import LOGO from "../../assets/Logo.jpg";
export default function ForgotPage() {
  return (
    <div className="container">
      <div className='ForgotPassEmailForm'>
      <div className="image-container">
        <img src={LOGO} alt="Logo" />
      </div>
      <div className="form-container">
        <div className='FormTitle'>
        <p className='FormHead'>Quên mật khẩu</p>
        <p>Hãy nhập email của bạn</p>
        </div>
        <p><b>Email</b></p>
        <div className="emailInput">
            <input
              type="text"
              id="userEmail"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <button type="submit" className="btn btn_login">
            Đăng nhập
          </button>
      </div>
      </div>
      
    </div>
  )
}
