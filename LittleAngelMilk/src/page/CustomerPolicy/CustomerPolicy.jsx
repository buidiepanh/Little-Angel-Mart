import React from 'react';
import './CustomerPolicy.css';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
const CustomerPolicy = () => {
  return (
    <>
      <Header />
    <div className="customer-container" >
      <h1>Chính sách khách hàng</h1>
      <section>
        <h2>Cam kết chất lượng</h2>
        <ul>
          <li>Cung cấp sản phẩm chính hãng, đảm bảo chất lượng và an toàn.</li>
          <li>Sản phẩm được kiểm tra kỹ lưỡng trước khi đến tay khách hàng.</li>
        </ul>
      </section>
      <section>
        <h2>Dịch vụ chăm sóc khách hàng</h2>
        <ul>
        <li>Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ kịp thời.</li>
        <li>Khách hàng có thể liên hệ qua số điện thoại hoặc email bất cứ lúc nào.</li>
        </ul>
      </section>
      <section>
        <h2>Chính sách giao hàng</h2>
        <ul>
        <li>Cung cấp dịch vụ giao hàng tận nơi trên toàn quốc.</li>
        <li>Thời gian giao hàng từ 2-5 ngày làm việc tùy vào địa chỉ của khách hàng.</li>
        </ul>
      </section>
      <section>
        <h2>Chính sách đổi trả hàng</h2>
        <ul>
        <li>Khách hàng có thể đổi trả sản phẩm trong vòng 7 ngày nếu sản phẩm bị lỗi hoặc không đúng như mô tả.</li>
        <li>Sản phẩm đổi trả phải còn nguyên vẹn, đầy đủ phụ kiện và bao bì như khi mới mua.</li>
        </ul>
      </section>
      <section>
        <h2>Bảo mật thông tin khách hàng</h2>
        <ul>
        <li>Cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng.</li>
        <li>Thông tin khách hàng chỉ được sử dụng cho mục đích liên hệ, giao hàng và chăm sóc khách hàng.</li>
        </ul>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default CustomerPolicy;
