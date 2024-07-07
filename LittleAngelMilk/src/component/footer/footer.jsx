import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./footer.scss";
import { MailOutlined, PhoneOutlined, TeamOutlined } from "@ant-design/icons";
import logo from '/src/assets/raw_logo.png';

function Footer() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (user) {
      setUsername(user);
    }
  }, []);

  const handlePrivacyPolicyClick = () => {
    if (username) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="footer">
      <div className="footer__top">
        <div className="footer__address">
          <div className="footer__logo">
            <TeamOutlined />
          </div>
          <div className="footer__address_info">
            <h4>Địa Điểm</h4>
            <div>abc,xyz phường 123 tp.Hồ Chí Minh</div>
          </div>
        </div>

        <div className="footer__phone">
          <div className="footer__logo">
            <PhoneOutlined />
          </div>
          <div className="footer__phone__info">
            <h4>Số Điện Thoại</h4>
            <div>0123456789</div>
          </div>
        </div>

        <div className="footer__mail">
          <div className="footer__logo">
            <MailOutlined />
          </div>
          <div className="footer__mail__info">
            <h4>Email</h4>
            <div>abcd@gmail.com</div>
          </div>
        </div>
      </div>
      <hr className="line" />
      <div className="footer__bot">
        <div className="footer__bot__logo">
         <img src={logo} alt="Logo" />
          <p className="Title">
            Little <span className="Angel">Angel</span>
            <br></br> Milk
          </p>
        </div>
        <div className="footer__bot__about">
          <h4>Về chúng tôi</h4>
          <hr />
          <Link className="op" to="/about">Giới thiệu</Link>
          <br /> <br />
          <Link className="op" to="/posts">Cẩm nang cho mẹ</Link>
          <br /> <br />
          <Link className="op" to="/contact">Liên hệ</Link>
        </div>
        <div className="footer__bot__support">
          <h4>Hỗ trợ khách hàng</h4>
          <hr />
          <Link className="op">Hotline miễn phí: 0123456789</Link>
          <br /> <br />
          <Link className="op" to="/warranty-policy">Chính sách bảo hành</Link>
          <br /> <br />
          <Link className="op" to="/customer-policy">Chính sách khách hàng</Link>
          <br /> <br />
          <span className="op" onClick={handlePrivacyPolicyClick} >Bảo mật thông tin cá nhân</span>
        </div>
        <div className="footer__bot__convinient">
          <h4>Hệ thống tiện ích</h4>
          <hr />
          <Link className="op" to="/order-detail">Kiểm tra đơn hàng</Link>
          <br /> <br />
          <Link className="op">Phương thức thanh toán</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
