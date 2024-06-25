import React from "react";
import "./UserAccount.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { Form, Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { Input } from "antd";
function UserAccount() {
  return (
    <div className="layer">
      <div className="user">
        <div className="user__ava">
          <FaRegUserCircle />
        </div>
        <span>Moon</span>
        <Link to="/">
          <button>Trờ về trang chủ</button>
        </Link>
        <Link>
          <button>Đăng xuất</button>
        </Link>
      </div>
      <div className="info">
        <h3>Thông tin cá nhân</h3>
        <form className="info__form">
          <span>Tên người dùng</span>
          <input type="text" value="Moon"></input>
          <span>Email</span>
          <input type="text" value="buidiepanh0905@gmail.com"></input>
          <span>Số điện thoại </span>
          <input type="text" value="0965798796"></input>
          <span>Địa chỉ</span>
          <input type="text" placeholder="Nhập địa chỉ của bạn"></input>
        </form>
        <button>Lưu</button>
      </div>
    </div>
  );
}

export default UserAccount;
