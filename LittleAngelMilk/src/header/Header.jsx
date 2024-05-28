import React, { Component } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

export default class Header extends Component {
  render() {
    return (
      
      <div className='Header'>
        <div className='FirstLayer'>
          <div className='logo'>
            <img src='src/images/raw_logo.png'/>
            <p className='Title'>Little <span className='Angel'>Angel</span> Milk</p>
          </div>   
          <div className='FirstLayerRight'>
          <div className='HomeBtn'>
            <a href=''><FaMagnifyingGlass className='HomeCircle'/></a>
          </div>

          <div className='CartBtn'>
            <a href=''><FaShoppingCart className='CartCircle'/></a>
          </div>

          <div className='LoginBtn'>
            <a href=''><FaRegUserCircle className='UserCircle'/></a>
          </div>
           
          </div>


          </div>
            <div className='mainNavs'>
              <a href=''>Trang chủ</a>       
              <div className='dropdown'>
            <a href='' className='productNav'>Sản phẩm <FaAngleDown /></a>
            <div className='dropdown-content'>
              <div>
              <a href='#'>Sản phẩm 1</a>
              <a href='#'>Sản phẩm 2</a>
              <a href='#'>Sản phẩm 3</a>
              </div>
              
            </div>
          </div>
              <a href=''>Bài viết</a>
              <a href=''>Voucher</a>
            </div>
      </div>
    )
  }
}
