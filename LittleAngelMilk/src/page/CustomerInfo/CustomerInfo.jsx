import React, { useState } from 'react';
import './CustomerInfo.css';

const CustomerInfo = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Địa chỉ email không hợp lệ.';
        }
        return null;
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^\d+$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            return 'Số điện thoại chỉ chứa chữ số.';
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateEmail(email);
        const phoneNumberError = validatePhoneNumber(phoneNumber);

        setErrors({
            email: emailError,
            phoneNumber: phoneNumberError,
        });

        if (!emailError && !phoneNumberError) {
            console.log('Form is valid. Submitting...');
            // Handle form submission logic here
        }
    };

    return (
        <div className="full-page-container">
            <div className="form-container">
                <div className="progress-container">
                    <div className="step active">
                        <div className="icon">🛒</div>
                        <div className="label">Giỏ hàng</div>
                    </div>
                    <div className="step active">
                        <div className="icon">👤</div>
                        <div className="label">Thông tin khách hàng</div>
                    </div>
                    <div className="step">
                        <div className="icon">💳</div>
                        <div className="label">Thanh toán</div>
                    </div>
                    <div className="step">
                        <div className="icon">✔️</div>
                        <div className="label">Xác nhận đơn hàng</div>
                    </div>
                </div>
                <h2>Thông tin khách hàng</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập họ và tên"
                            className="input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Địa chỉ Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập địa chỉ Email"
                            className="input"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Nhập số điện thoại"
                            className="input"
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>

                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nhập địa chỉ"
                            className="input"
                        />
                    </div>

                    <div className="button-group">
                        <button type="button" className="button back-button">Quay lại</button>
                        <button type="submit" className="button submit-button">Xác nhận và tiếp tục thanh toán</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerInfo;
