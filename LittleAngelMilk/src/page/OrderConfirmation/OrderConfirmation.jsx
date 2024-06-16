import React, { useState } from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const initialCustomer = {
    name: 'Nguyen Van A',
    address: '123 Đường ABC, Quận 1, TP. HCM',
    email: 'nguyenvana@example.com',
    phone: '0123456789'
  };

  const [customer, setCustomer] = useState(initialCustomer);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState(initialCustomer);

  const orderItems = [
    { name: 'Item 1', quantity: 2, price: 20 },
    { name: 'Item 2', quantity: 1, price: 50 },
    { name: 'Item 3', quantity: 3, price: 15 }
  ];

  const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setCustomer(updatedCustomer);
    setIsEditing(false);
  };

  return (
    <div className="background-wrapper">
      <div className="order-container">
        <div className="step-indicator">
          <div>Giỏ hàng</div>
          <div>Thông tin khách hàng</div>
          <div>Thanh toán</div>
          <div className="active">Xác nhận đơn hàng</div>
        </div>
        <div className="shopping-cart-section">
          <h2>Xác nhận đơn hàng</h2>
          <div className="customer-info">
            <h3>Thông tin khách hàng</h3>
            {isEditing ? (
              <div className="customer-form">
                <p>
                  <strong>Tên:</strong>
                  <input
                    type="text"
                    name="name"
                    value={updatedCustomer.name}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Địa chỉ:</strong>
                  <input
                    type="text"
                    name="address"
                    value={updatedCustomer.address}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Email:</strong>
                  <input
                    type="email"
                    name="email"
                    value={updatedCustomer.email}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Số điện thoại:</strong>
                  <input
                    type="text"
                    name="phone"
                    value={updatedCustomer.phone}
                    onChange={handleInputChange}
                  />
                </p>
                <button className="save-button" onClick={handleSaveClick}>Lưu</button>
              </div>
            ) : (
              <div>
                <p><strong>Tên:</strong> {customer.name}</p>
                <p><strong>Địa chỉ:</strong> {customer.address}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Số điện thoại:</strong> {customer.phone}</p>
                <button className="update-button" onClick={handleUpdateClick}>Cập nhật thông tin</button>
              </div>
            )}
          </div>
          <div className="order-summary">
            <h3>Thông tin đơn hàng</h3>
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}$</td>
                    <td>{item.price * item.quantity}$</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Tổng cộng</td>
                  <td>{totalPrice}$</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="confirmation-buttons">
          <button className="cancel-button">Hủy đơn hàng</button>
          <button className="confirm-button">Xác nhận hoàn tất và tạo đơn hàng</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
