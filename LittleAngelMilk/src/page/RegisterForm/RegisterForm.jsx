import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import "./RegisterForm.css";
import milkImage from "../../assets/Logo.jpg";
import { Link } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation Mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      userAddress
      userEmail
      userPhone
      userPassword {
        isSet
      }
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [register, { loading }] = useMutation(REGISTER_MUTATION);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenWords = ["cấm"];
    if (
      email.length > 254 ||
      !emailRegex.test(email) ||
      email.includes(" ") ||
      forbiddenWords.some((word) => email.includes(word)) ||
      email.startsWith(".") ||
      email.endsWith(".")
    ) {
      return "Địa chỉ email không hợp lệ.";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (password.length < 5 || password.length > 20) {
      return "Mật khẩu phải có từ 5 đến 20 ký tự.";
    }
    return null;
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d+$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return "Số điện thoại chỉ chứa chữ số.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(userEmail);
    const passwordError = validatePassword(userPassword);
    const confirmPasswordError =
      userPassword !== confirmPassword ? "Mật khẩu xác nhận không khớp." : null;
    const phoneNumberError = validatePhoneNumber(userPhone);

    setErrors({
      userEmail: emailError,
      userPassword: passwordError,
      confirmPassword: confirmPasswordError,
      userPhone: phoneNumberError,
    });

    if (
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !phoneNumberError
    ) {
      try {
        const res = await register({
          variables: {
            data: {
              name,
              userAddress,
              userEmail,
              userPhone,
              userPassword,
            },
          },
        });
        if (res.data) {
          // nav qua trang product
          navigate("/");
        }
        debugger;
      } catch (err) {
        console.error("Mutation error:", err);
        setErrors({ api: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="container">
      <div className="registerForm">
        <div className="image-container">
          <img src={milkImage} alt="Little Angel Milk" />
        </div>
        <div className="form-container-register">
          <form onSubmit={handleSubmit} className="regForm">
            <h2>Đăng ký</h2>
            <label>Họ tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ tên"
              className="registerInput"
            />

            <label>Địa chỉ</label>
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
              className="registerInput"
            />

            <label>Địa chỉ Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Nhập địa chỉ Email"
              className="registerInput"
            />
            {errors.userEmail && <p className="error">{errors.userEmail}</p>}

            <label>Số điện thoại</label>
            <input
              type="tel"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="registerInput"
            />
            {errors.userPhone && <p className="error">{errors.userPhone}</p>}

            <label>Mật khẩu</label>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="registerInput"
            />
            {errors.userPassword && (
              <p className="error">{errors.userPassword}</p>
            )}

            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="registerInput"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            {errors.api && <p className="error">{errors.api}</p>}

            <div className="registerFormBtns">
              <Link to="/login" className="backLink">
                <button type="button" className="backBtn">
                  Quay lại
                </button>
              </Link>
              <button type="submit" className="registerBtn">
                {loading ? "Đang xử lý..." : "Tạo tài khoản"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
