import React, { useState } from 'react';
import './RegisterForm.css';
import milkImage from '../../image/Logo.jpg';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const forbiddenWords = ['cấm'];
        if (
            email.length > 254 ||
            !emailRegex.test(email) ||
            email.includes(' ') ||
            forbiddenWords.some(word => email.includes(word)) ||
            email.startsWith('.') ||
            email.endsWith('.')
        ) {
            return 'Địa chỉ email không hợp lệ.';
        }
        return null;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (password.length < 8 || password.includes(' ') || !passwordRegex.test(password)) {
            return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt, không chứa khoảng trắng.';
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
        const passwordError = validatePassword(password);
        const confirmPasswordError = password !== confirmPassword ? 'Mật khẩu xác nhận không khớp.' : null;
        const phoneNumberError = validatePhoneNumber(phoneNumber);

        setErrors({
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
            phoneNumber: phoneNumberError,
        });

        if (!emailError && !passwordError && !confirmPasswordError && !phoneNumberError) {
            console.log('Form is valid. Submitting...');
        }
    };

    return (
        <div className="container">
            <div className="image-container">
                <img src={milkImage} alt="Little Angel Milk" />
            </div>
            <div className="form-container">
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <label>Địa chỉ Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập địa chỉ Email"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Tên đăng nhập</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tên đăng nhập"
                    />

                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label>Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <label>Số điện thoại</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                    <button type="submit">Tạo tài khoản</button>
                </form>
            </div>
        </div>
    );
};

export default Register;