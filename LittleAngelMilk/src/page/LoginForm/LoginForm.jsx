import React, { useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LOGO from "../../assets/Logo.jpg";
import "./LoginForm.css";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";


const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(userEmail: $email, userPassword: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          userPhone
          userEmail
          userAddress
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    password: "",
    email: "",
  });

  const [errorMess, setErrorMess] = useState("");

  const handleChange = (e) => {
    // if (e.target.name === "password") {
    // const newInput = {...input};
    // newInput.password = value;
    // setInput(newInput);
    //   setInput({ ...input, password: value });
    // } else {
    //   setInput({ ...input, email: value });
    // }
    const { name, value } = e.target;
    const newInput = {
      ...input,
    };
    newInput[name] = value;
    setInput(newInput);
  };

  const [login, { data, loading }] = useMutation(LOGIN_MUTATION, {
    variables: input,
    // refetchQueries: [{query: }]
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login();
      if (res.data.authenticateUserWithPassword.sessionToken) {
        // save token for later use
        // reset errorMess
        localStorage.setItem("sessionToken", sessionToken);
        setErrorMess("");
        // redirect to homepage
        navigate("/");
      }
      if (res.data.authenticateUserWithPassword.message) {
        setErrorMess(res.data.authenticateUserWithPassword.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="formLogin">
        <div className="image-container">
          <img src={LOGO} alt="Logo" />
        </div>
        <div className="form-container">
          
          <form method="POST" className="loginForm" onSubmit={handleSubmit}>
          <h2>Login</h2>
            <label htmlFor="username">Email đăng nhập</label>
            <div className="form_input">
              <input
                type="email"
                name="email"
                id="username"
                placeholder="Nhập email"
                value={input.email}
                onChange={handleChange}
                required
              />
              <PersonIcon style={styles.icon_above} />
            </div>

            <label htmlFor="password">Mật khẩu</label>
            <div className="form_input">
              <input
                type="password"
                name="password"
                value={input.password}
                id="password"
                placeholder="Mật khẩu"
                onChange={handleChange}
                required
              />
              <LockIcon style={styles.icon_above} />
            </div>

            <div className="form_forgot">
              <Link to="/ForgotPassEmail">Quên mật khẩu?</Link>
            </div>

            <button type="submit" className="btn btn_login">
              Đăng nhập
            </button>
            <Link to="/register" className="btn btn_signup">
            Đăng ký
          </Link>
          </form>
         

          {errorMess && <p style={{ color: "red" }}>{errorMess}</p>}

          {/* <div className="form_below">
            <p>---------------OR---------------</p>

            <div className="social-login">
              <a href="">
                <button type="button" className="btn">
                  Đăng nhập bằng Google
                  <GoogleIcon className="icon_below" />
                </button>
              </a>
              <a href="">
                <button type="button" className="btn">
                  Đăng nhập bằng Facebook
                  <FacebookIcon className="icon_below" />
                </button>
              </a>
            </div>
          </div> */}
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
    top: "60%",
    transform: "translateY(-50%)",
  },
  icon_below: {
    fontSize: "24px",
    position: "absolute",
    left: "630px",
    transform: "translateY(-5%)",
  },
};
export default LoginForm;
