import React from 'react';
import './WarrantyPolicy.css';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";

const WarrantyPolicy = () => {
  return (
    <>
        <Header />
    <div className="warranty-container">
      <h1>Chính sách bảo hành</h1>
      <section>
        <h2>Điều kiện bảo hành</h2>
        <ul>
          <li>Sản phẩm phải còn trong thời hạn bảo hành.</li>
          <li>Sản phẩm bị lỗi do nhà sản xuất.</li>
          <li>Sản phẩm còn nguyên vẹn, không bị sửa chữa hoặc thay đổi bởi bên thứ ba.</li>
        </ul>
      </section>
      <section>
        <h2>Thời gian bảo hành</h2>
        <ul>
        <li>Thời gian bảo hành từ 6 tháng đến 1 năm kể từ ngày mua hàng.</li>
        <li>Bảo hành miễn phí nếu sản phẩm gặp lỗi do nhà sản xuất trong thời gian bảo hành.</li>
        </ul>
      </section>
      <section>
        <h2>Quy trình bảo hành</h2>
        <ol>
          <li>Liên hệ trung tâm bảo hành qua số điện thoại hoặc email.</li>
          <li>Cung cấp đầy đủ thông tin và mô tả chi tiết về lỗi sản phẩm.</li>
          <li>Chúng tôi sẽ kiểm tra và thông báo kết quả bảo hành trong vòng 7 ngày làm việc.</li>
        </ol>
      </section>
      <section>
        <h2>Các trường hợp không được bảo hành</h2>
        <ul>
          <li>Sản phẩm bị hư hỏng do sử dụng không đúng hướng dẫn.</li>
          <li>Sản phẩm bị rơi vỡ, cháy nổ, ngấm nước hoặc bị tác động bởi các yếu tố bên ngoài.</li>
          <li>Sản phẩm đã hết thời hạn bảo hành.</li>
        </ul>
      </section>
      <section>
        <h2>Đổi trả sản phẩm</h2>
        <ul>
        <li>Trong vòng 7 ngày kể từ ngày mua hàng, nếu sản phẩm bị lỗi do nhà sản xuất, khách hàng có thể yêu cầu đổi trả sản phẩm mới hoặc hoàn tiền.</li>
        <li>Sản phẩm đổi trả phải còn nguyên vẹn, đầy đủ phụ kiện và bao bì như khi mới mua.</li>
        </ul>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default WarrantyPolicy;
