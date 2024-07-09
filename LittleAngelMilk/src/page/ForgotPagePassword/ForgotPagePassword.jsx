import React, { useState } from "react";
import "./ForgotPagePassword.css";
import { Link } from "react-router-dom";
import { IoReturnDownBackOutline } from "react-icons/io5";
import LOGO from "../../assets/Logo.jpg";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROFILE } from "../Queries/user";
import { CHANGE_PASSWORD } from "../Mutations/user";
export default function ForgotPage() {
  //get user profile
  const { data, loading, error } = useQuery(GET_PROFILE);
  const user = data?.users?.[0] || {};
  if (!user) return <p>No user data found.</p>;
  console.log(user);
  //get new password
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [
    changePassword,
    { data: changeData, loading: changeLoading, error: changeError },
  ] = useMutation(CHANGE_PASSWORD);

  const handleSave = async () => {
    if (newPass !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    const variables = {
      where: {
        userEmail: localStorage.getItem("emailValue"),
      },
      data: {
        userPassword: newPass,
      },
    };
    console.log(variables);
    try {
      const result = await changePassword({ variables });
      console.log(result);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.networkError) {
        console.error("Network Error:", error.networkError.result.errors);
      }
      if (error.graphQLErrors) {
        console.error("GraphQL Errors:", error.graphQLErrors);
      }
      alert("Failed to change password. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="container">
      <div className="ForgotPassForm">
        <div className="image-container">
          <img src={LOGO} alt="Logo" />
        </div>
        <div className="form-container">
          <div className="FormTitle">
            <p className="FormHead">Quên mật khẩu</p>
            <p>Hãy nhập mật khẩu mới</p>
          </div>
          <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
            <div className="NewPasswordInput">
              <p>
                <b>Mật khẩu mới</b>
              </p>
              <input
                type="password"
                id="userEmail"
                placeholder="Nhập mật khẩu mới"
                onChange={(e) => setNewPass(e.target.value)}
                required
              />
              <p>
                <b>Xác minh mật khẩu mới</b>
              </p>
              <input
                type="password"
                id="userEmail"
                placeholder="Nhập lại mật khẩu mới"
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <button
                type="submit"
                className="ResetPassBtn"
                onClick={handleSave}
              >
                Đặt lại mật khẩu
              </button>
              <Link to="/ForgotPassEmail" className="btn_icon_back">
                <IoReturnDownBackOutline /> Trở lại
              </Link>
              {changeLoading && <p>Changing...</p>}
              {changeError && <p>Error: {changeError.message}</p>}
              {changeData && <p>Password changed successfully!</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
