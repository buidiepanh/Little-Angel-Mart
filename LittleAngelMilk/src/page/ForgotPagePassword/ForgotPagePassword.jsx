import React from 'react'
import "./ForgotPagePassword.css";
import { Link } from 'react-router-dom';
import LOGO from "../../assets/Logo.jpg";
export default function ForgotPage() {
  return (
    <div className="container">
      <div className='ForgotPassForm'>
      <div className="image-container">
        <img src={LOGO} alt="Logo" />
      </div>
      <div className="form-container">
        <div className='FormTitle'>
        <p className='FormHead'>Quên mật khẩu</p>
        <p>Hãy nhập mật khẩu mới</p>
        </div>
        <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        
        <div className="NewPasswordInput">
        <p><b>Mật khẩu mới</b></p>
            <input
              type="text"
              id="userEmail"
              placeholder="Nhập mật khẩu mới"
              required
            />
             <p><b>Xác minh mật khẩu mới</b></p>
            <input
              type="text"
              id="userEmail"
              placeholder="Nhập lại mật khẩu mới"
              required
            />
        </div> 
        <div className="btnClass">
       
            <button type="submit" className="ResetPassBtn">
            Đặt lại mật khẩu
            </button>
        </div>      
        </form>
      </div>
      </div>     
    </div>
  )
}
