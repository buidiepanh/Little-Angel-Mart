// header.jsx
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="FirstLayer">
          <div className="logo">
            <img src="src/assets/image/raw_logo.png" alt="Logo" />
            <p className="Title">
              Little <span className="Angel">Angel</span> Milk
            </p>
          </div>
          <div className="FirstLayerRight">
            <div className="SearchBtn">
              <Link to="/">
                <FaMagnifyingGlass className="SearchCircle" />
              </Link>
            </div>

            <div className="CartBtn">
              <Link to="/cart">
                <FaShoppingCart className="CartCircle" />
              </Link>
            </div>

            <div className="LoginBtn">
              <Link to="/login">
                <FaRegUserCircle className="UserCircle" />
              </Link>
            </div>
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
          <Link to="/posts">Bài viết</Link>
          <Link to="/voucher">Voucher</Link>
        </div>
      </div>
    );
  }
}
