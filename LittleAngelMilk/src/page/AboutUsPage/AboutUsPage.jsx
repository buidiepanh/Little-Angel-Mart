import React from 'react';
import { Link } from "react-router-dom"; 
import './AboutUsPage.css'; 
import backgroundImage from '../../assets/aboutus.jpg';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";

function AboutUsPage() {
  return (
   <>
        <Header /> 
     <div className="aboutUs">
     <h1>Về Chúng Tôi</h1>
     <section className="mission">
        <h2>Sứ Mệnh</h2>
        <p>
          Little Angel Milk cam kết mang đến những sản phẩm chăm sóc tốt nhất cho mẹ và bé, giúp các bậc phụ huynh an tâm và hài lòng tuyệt đối. Chúng tôi tin rằng mỗi đứa trẻ đều xứng đáng được chăm sóc và yêu thương từ những sản phẩm chất lượng nhất.
        </p>
      </section>

      <section className="vision">
        <h2>Tầm Nhìn</h2>
        <p>
          Trở thành nhà cung cấp hàng đầu tại Việt Nam về các sản phẩm chăm sóc mẹ và bé, mang lại sự tin cậy và hài lòng cho khách hàng. Chúng tôi không ngừng nỗ lực để cải tiến và đa dạng hóa sản phẩm, nhằm đáp ứng mọi nhu cầu của các gia đình trẻ.
        </p>
      </section>

      <section className="core-values">
        <h2>Giá Trị Cốt Lõi</h2>
        <ul>
          <li><strong>Chất lượng:</strong> Sản phẩm của chúng tôi được kiểm định nghiêm ngặt, đảm bảo chất lượng cao nhất.</li>
          <li><strong>An toàn:</strong> Tất cả sản phẩm đều được sản xuất từ các nguyên liệu an toàn cho sức khỏe của mẹ và bé.</li>
          <li><strong>Yêu thương:</strong> Mỗi sản phẩm đều được tạo ra với tình yêu và sự quan tâm dành cho các thiên thần nhỏ.</li>
        </ul>
      </section>

      <section className="products">
        <h2>Sản Phẩm</h2>
        <p>
          Chúng tôi cung cấp đa dạng các sản phẩm chăm sóc mẹ và bé bao gồm:
        </p>
        <ul>
          <li>Bỉm, tã</li>
          <li>Sữa và thực phẩm dinh dưỡng</li>
          <li>Quần áo cho mẹ và bé</li>
          <li>Dụng cụ chăm sóc bé như bình sữa, xe đẩy, nôi cũi, và nhiều hơn nữa</li>
        </ul>
      </section>

      <section className="customer-care">
        <h2>Chăm Sóc Khách Hàng</h2>
        <p>
          Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời với dịch vụ chăm sóc khách hàng tận tâm và chuyên nghiệp.
        </p>
      </section>

      <section className="contact-info">
        <h2>Liên Hệ</h2>
        <p>
          Để biết thêm thông tin, xin vui lòng liên hệ:
        </p>
        <ul>
          <li>Email: support@littleangelmilk.com</li>
          <li>Phone: 0123 456 789</li>
          <li>Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</li>
        </ul>
      </section>
      <Link to="/" className="back-button2">Quay Lại</Link>
     </div>
      <Footer />
    </>
  );
}

export default AboutUsPage;

