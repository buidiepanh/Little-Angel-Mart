import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LOGO from "../../assets/Logo.jpg";
import "./LoginForm.css";
import { useMutation, gql } from "@apollo/client";
import { IoReturnDownBackOutline } from "react-icons/io5";

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

  const handleLoginGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [errorMess, setErrorMess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: input,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login();
      if (res.data.authenticateUserWithPassword.sessionToken) {
        const { sessionToken, item } = res.data.authenticateUserWithPassword;
        localStorage.setItem("sessionToken", sessionToken);
        localStorage.setItem("username", item.name);
        setErrorMess("");
        navigate("/");
      } else if (res.data.authenticateUserWithPassword.message) {
        setErrorMess(res.data.authenticateUserWithPassword.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMess("An error occurred. Please try again.");
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

          <Link to="/" className="btn_icon_back">
            <IoReturnDownBackOutline /> Quay lại trang chủ
          </Link>

          </form>
          

          {errorMess && <p style={{ color: "red" }}>{errorMess}</p>}
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
};

export default LoginForm;
