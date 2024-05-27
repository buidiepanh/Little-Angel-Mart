import React from "react";
import "./LoginForm.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LOGO from "../../image/Logo.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const LoginForm = () => {
  return (
    <div class="body">
      <div class="form">
        <div class="form_img">
          <img src={LOGO} alt="Logo" />
        </div>

        <div class="form_login">
          <div class="form_above">
            <form action="">
              <h1>Login</h1>

              <div class="form_input">
                <input
                  type="text"
                  placeholder="Enter your user name"
                  required
                />
                <PersonIcon style={styles.icon_above} />
              </div>

              <div class="form_input">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <LockIcon style={styles.icon_above} />
              </div>

              {/* Form forgot  */}
              <div class="form_forgot">
                <a href="#">Forgot Password?</a>
              </div>

              {/* Form submit  */}
              <button type="submit" class="btn btn_login">
                Login
              </button>
            </form>

            {/* Form sign up  */}
            <button type="submit" class="btn btn_signup">
              Sign up
            </button>
          </div>

          <div class="form_below">
            <p>---------------Or---------------</p>

            <form action="">
              {/* Form Google  */}
              <button type="submit" class="btn">
                Login with Google
                <FacebookIcon style={styles.icon_below} />
              </button>

              {/* Form Facebook  */}
              <button type="submit" class="btn">
                Login with Facebook
                <GoogleIcon style={styles.icon_below} />
              </button>
            </form>
          </div>
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
    transform: "translateY(-50%)",
  },
  icon_below: {
    fontSize: "24px",
    position: "absolute",
    left: "630px",
    transform: "translateY(-5%)",
  },
};

//hahahahahahahahahahaahahahahahahahahahahahahahahahahahahahahahahagit
export default LoginForm;
