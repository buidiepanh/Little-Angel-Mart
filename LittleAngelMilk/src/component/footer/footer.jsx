import Link from "antd/es/typography/Link";
import "./footer.scss";
import { MailOutlined, PhoneOutlined, TeamOutlined } from "@ant-design/icons";

function Footer() {
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
          <img src="src/image\logo\trans.png" alt="" />
          <p className="Title">
            Little <span className="Angel">Angel</span>
            <br></br> Milk
          </p>
        </div>
        <div className="footer__bot__about">
          <h4>Về chúng tôi</h4>
          <hr />
          <Link className="op">Giới thiệu</Link>
          <br /> <br />
          <Link className="op">Cẩm nang cho mẹ</Link>
          <br /> <br />
          <Link className="op">Liên hệ</Link>
        </div>
        <div className="footer__bot__support">
          <h4>Hỗ trợ khách hàng</h4>
          <hr />
          <Link className="op">Hotline miễn phí: 0123456789</Link>
          <br /> <br />
          <Link className="op">Chính sách bảo hành</Link>
          <br /> <br />
          <Link className="op">Chính sách khách hàng</Link>
          <br /> <br />
          <Link className="op">Bảo mật thông tin cá nhân</Link>
        </div>
        <div className="footer__bot__convinient">
          <h4>Hệ thống tiện ích</h4>
          <hr />
          <Link className="op">Kiểm tra đơn hàng</Link>
          <br /> <br />
          <Link className="op">Phương thức thanh toán</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
