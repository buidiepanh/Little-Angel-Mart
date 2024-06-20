import { Link } from "react-router-dom";
import "./payment.scss";

function Payment() {
  return (
    <div className="payment">
      <div className="wrapper">
        <div className="wrapper__header">
          <h2>Thông tin thanh toán</h2>
        </div>
        <h4>Số thẻ</h4>
        <input type="text" placeholder="111-222-333" />
        <h4>Tên in trên thẻ</h4>
        <input type="text" placeholder="Nguyen Van A" />
        <h4>Ngày hết hạn</h4>
        <input type="date" />
        <div className="wrapper__button">
          <Link to="/CustomerCartInfo">
            <button className="back">Quay lại</button>
          </Link>
          <Link>
            <button className="confirm">Xác nhận và tạo đơn hàng</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Payment;
