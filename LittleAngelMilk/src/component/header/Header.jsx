import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import "./Header.css";


const Header = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const user = localStorage.getItem("username");
    if (token && user) {
      setUsername(user);
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };

  
  return (
    <div className="Header">
      <div className="FirstLayer">
        <div className="logo">
          <Link to="/">
            <img src="src/assets/raw_logo.png" alt="Logo" />
            <p className="Title">Little <span className="Angel">Angel</span> Milk</p>
          </Link>
        </div>

        <div className="SearchBar">
          <input type="text" placeholder="Search..." />
          <div className="SearchBtn">
            <Link to="/">
              <FaMagnifyingGlass className="SearchCircle" />
            </Link>
          </div>
        </div>
        <div className="FirstLayerRight">
          <div className="OrderListBtn">
            <div>
              
              {username ? (
              <Link to="/orderList">
              <BsCartCheck className="UserCircle" />
            </Link>): (
                <Link to="/login">
                <BsCartCheck  className="UserCircle" />
              </Link>)}
            </div>
            <div className="btnDesc">Đơn hàng</div>
          </div>

          <div className="CartBtn">
            <div>
              {username ? (
              <Link to="/cart">
                <FaShoppingCart className="CartCircle" />
              </Link>): (
                <Link to="/login">
                <FaShoppingCart className="CartCircle" />
              </Link>)}
              
            </div>
            <div className="btnDesc">Giỏ hàng</div>
          </div>

          {username ? (
            <div className="LoginBtn">
              <div onClick={toggleMenu} className="user-info">
                <FaRegUserCircle className="UserCircle" />
                <span>{username}</span>
              </div>
              {menuVisible && (
                <div className="dropdown-menu">
                  <Link to="/profile">Tài khoản</Link>
                  <Link to="/settings">Tùy chỉnh</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div className="LoginBtn">
              <div>
                <Link to="/login">
                  <FaRegUserCircle className="UserCircle" />
                </Link>
              </div>
              <div className="btnDesc">Đăng nhập</div>
            </div>
          )}
        </div>
      </div>
      <div className="mainNavs">
        <Link to="/">Trang chủ</Link>
        <div className="dropdown">
          <Link to="/products" className="productNav">
            Sản phẩm <FaAngleDown />
          </Link>
          <div className="dropdown-content">
            <div>
              <Link to="/product1">Sản phẩm 1</Link>
              <Link to="/product2">Sản phẩm 2</Link>
              <Link to="/product3">Sản phẩm 3</Link>
            </div>
          </div>
        </div>
        <Link to="/#articles">Bài viết</Link>
        <Link to="/voucher">Voucher</Link>
        
      </div>
    </div>
  );
};

export default Header;
