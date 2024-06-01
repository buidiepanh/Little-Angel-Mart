import React from "react";
import { Link } from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LOGO from "../../image/Logo.jpg";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={LOGO} alt="Logo" />
      </div>

      <div className="form-container">
        <h2>Login</h2>
        <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="username">Tên đăng nhập</label>
          <div className="form_input">
            <input
              type="text"
              id="username"
              placeholder="Nhập tên đăng nhập"
              required
            />
            <PersonIcon className="icon_above" />
          </div>

          <label htmlFor="password">Mật khẩu</label>
          <div className="form_input">
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              required
            />
            <LockIcon className="icon_above" />
          </div>

          <div className="form_forgot">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>

          <button type="submit" className="btn btn_login">
            Đăng nhập
          </button>
        </form>
        <Link to="/register" className="btn btn_signup">Đăng ký</Link>

        <div className="form_below">
          <p>---------------OR---------------</p>

          <div className="social-login">
            <button type="button" className="btn">
              Đăng nhập bằng Google
              <GoogleIcon className="icon_below" />
            </button>

            <button type="button" className="btn">
              Đăng nhập bằng Facebook
              <FacebookIcon className="icon_below" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
