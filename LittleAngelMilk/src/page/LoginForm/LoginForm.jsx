import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LOGO from "../../image/Logo.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./LoginForm.css";
const LoginForm = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={LOGO} alt="Logo" />
      </div>

      <div className="form-container">
        <h2>Login</h2>
        <form className="loginForm">
          <label htmlFor="username">Tên đăng nhập</label>
          <div className="form_input">
            <input
              type="text"
              id="username"
              placeholder="Nhập tên đăng nhập"
              required
            />
            <PersonIcon style={styles.icon_above} />
          </div>

          <label htmlFor="password">Mật khẩu</label>
          <div className="form_input">
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              required
            />
            <LockIcon style={styles.icon_above} />
          </div>

          <div className="form_forgot">
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="btn btn_login">
            Đăng nhập
          </button>
        </form>
        <Link to="/register" className="btn btn_signup">Đăng ký</Link>

        <div className="form_below">
          <p>---------------OR---------------</p>

          <button type="button" className="btn">
            Đăng nhập bằng Google
            <GoogleIcon style={styles.icon} />
          </button>

          <button type="button" className="btn">
            Đăng nhập bằng Facebook
            <FacebookIcon style={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  icon_above: {
    fontSize: "24px",
    position: "absolute",
    right: "20px",
    top: "50%",
    
  },
  icon_below: {
    fontSize: "24px",
    position: "absolute",
    left: "20px",
    
   
  },
};

export default LoginForm;