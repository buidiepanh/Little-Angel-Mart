import React from 'react';
import { Link } from "react-router-dom"; 
import './AboutUsPage.css'; 
import backgroundImage from '../../assets/aboutus.jpg';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";

function AboutUsPage() {
  return (
   <div>
        <Header /> 
     <div className="aboutUs" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>Về Little Angel Milk</h1>
      <p>Little Angel Milk là chuỗi cửa hàng đồ dùng mẹ và bé được thành lập bởi Tập đoàn Thế Giới Di Động vào năm 2022, với mục tiêu cung cấp các sản phẩm chất lượng cao và an toàn cho bé.</p>
      <h2>Tầm Nhìn</h2>
      <p>Trở thành nhà cung cấp hàng đầu tại Việt Nam về các sản phẩm chăm sóc mẹ và bé, mang lại sự tin cậy và hài lòng cho khách hàng.</p>
      <h2>Sứ Mệnh</h2>
      <p>Đồng hành cùng các bậc phụ huynh trong hành trình nuôi dạy và chăm sóc con cái với sự yêu thương và tận tâm nhất.</p>
      <h2>Giá Trị Cốt Lõi</h2>
      <p>Chất lượng, An toàn, Yêu thương.</p>
      <h2>Liên hệ</h2>
      <p>Để biết thêm thông tin, xin vui lòng liên hệ:</p>
      <ul>
        <li>Email: support@littleangelmilk.com</li>
        <li>Phone: 0123 456 789</li>
        <li>Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</li>
      </ul>
      <Link to="/" className="back-button2">Quay Lại</Link>
     </div>
      <Footer />
    </div>
  );
}

export default AboutUsPage;

