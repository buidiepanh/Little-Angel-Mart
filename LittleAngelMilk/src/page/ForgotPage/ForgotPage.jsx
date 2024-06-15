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
        <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        
        <div className="emailInput">
        <p><b>Email</b></p>
            <input
              type="text"
              id="userEmail"
              placeholder="example@gmail.com"
              required
            />
            <Link to="/ForgotPass">
            <button type="submit" className="ForgotPassEmailBtn">
            Tiếp tục
            </button>
            </Link>
          </div>       
          </form>
      </div>
      </div>     
    </div>
  )
}
