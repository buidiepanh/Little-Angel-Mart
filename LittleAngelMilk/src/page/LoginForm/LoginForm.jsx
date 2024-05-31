import React from "react";
import "./LoginForm.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LOGO from "../../image/Logo.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const LoginForm = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={LOGO} alt="Logo" />
      </div>

      <div className="form-container">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username</label>
          <div className="form_input">
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
            />
            <PersonIcon style={styles.icon_above} />
          </div>

          <label htmlFor="password">Password</label>
          <div className="form_input">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            <LockIcon style={styles.icon_above} />
          </div>

          <div className="form_forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn_login">
            Login
          </button>
        </form>

        <button type="button" className="btn btn_signup">
          Sign up
        </button>

        <div className="form_below">
          <p>---------------OR---------------</p>

          <button type="button" className="btn">
            Login with Google
            <GoogleIcon style={styles.icon} />
          </button>

          <button type="button" className="btn">
            Login with Facebook
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
