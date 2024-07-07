import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LOGO from "../../assets/Logo.jpg";
import "./LoginForm.css";
import { useMutation, gql } from "@apollo/client";
import { IoReturnDownBackOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { LOGIN_MUTATION } from "../Mutations/user";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //useState
  //Receive value when change
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errorMess, setErrorMess] = useState("");

  // const handleLoginGoogle = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       console.log(credential);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //handle event
  //Take value when change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login();
      if (res.data.authenticateUserWithPassword.sessionToken) {
        const { sessionToken, item } = res.data.authenticateUserWithPassword;
        localStorage.setItem("sessionToken", sessionToken);
        localStorage.setItem("userName", item.name);
        localStorage.setItem("userEmail", item.userEmail);
        localStorage.setItem("userPhoneNumber", item.userPhone);
        localStorage.setItem("userAddress", item.userAddress);
        localStorage.setItem("userId", item.id);
        setErrorMess("");
        navigate("/", { state: { fromLogin: true } });
      } else if (res.data.authenticateUserWithPassword.message) {
        setErrorMess(res.data.authenticateUserWithPassword.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMess("An error occurred. Please try again.");
    }
  }

  //useMutation
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: input,
  });

  useEffect(() => {
    if (location.state?.fromRegister) {
      toast.success("Đăng ký thành công!");
    }
  }, [location.state]);

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
      <Toaster />
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
