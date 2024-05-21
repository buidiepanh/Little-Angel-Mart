import React, { Component } from 'react'
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

export default class Header extends Component {
  render() {
    return (
      
      <div className='Header'>
        <div className='FirstLayer'>
          <div className='logo'>
            <img src='public/images/raw_logo.png'/>
            <p className='Title'>Little <span className='Angel'>Angel</span> Mart</p>
            
          </div>

          <div className='phoneContact'><BsFillTelephoneFill className='phoneIcon'/><p>Hotline: 1234 5678</p></div>
          <div className='mailContact'>
            <IoMdMail className='mailIcon'/>
            <p>Email: mail@domain.com</p></div>
          <div className='FirstLayerRight'>
          <div className='searchBar'>
            <input type='text'/>
          </div>

          <div className='LoginBtn'>
            <a href=''>Tài khoản </a>
          </div>
          </div>

          </div>
          <div className='links'>
            <div className='mainNavs'>         
              <a href=''>Trang chủ </a>
              <a href=''>Sản phẩm</a>
              <a href=''>Bài viết</a>
              <a href=''>Voucher</a>
            </div>
            <div className='Orders'>
              <a href=''>Giỏ hàng </a>
              <a href=''>Đơn hàng </a>
            </div>
          </div>
      </div>
    )
  }
}
