import React, { useState } from 'react';
import './RegisterForm.css';
import milkImage from '../../assets/Logo.jpg'
import { Link } from 'react-router-dom';

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
        if (password.length < 5 || password.length > 20) {
            return 'Mật khẩu phải có từ 5 đến 20 ký tự.';
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
            <div className='registerForm'>
            <div className="image-container">
                <img src={milkImage} alt="Little Angel Milk" />
            </div>
            <div className="form-container-register">
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <label>Địa chỉ Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập địa chỉ Email"
                        className='registerInput'
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Tên đăng nhập</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tên đăng nhập"
                        className='registerInput'
                    />

                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        className='registerInput'
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label>Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        className='registerInput'
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <label>Số điện thoại</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Nhập số điện thoại"
                        className='registerInput'
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    <div className='registerFormBtns'>
                    <Link to='/login' className='backLink'><button type='submit' className='backBtn'>Quay lại</button></Link>
                    <button type="submit" className='registerBtn'>Tạo tài khoản</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default Register;
