
import Header from "./component/header/Header";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './page/LoginForm/LoginForm';
import RegisterForm from './page/RegisterForm/RegisterForm';
import ForgotPage from "./page/ForgotPage/ForgotPage";
import ForgotPagePassword from "./page/ForgotPagePassword/ForgotPagePassword";
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/ForgotPassEmail" element={<ForgotPage/>}/>
                    <Route path="/ForgotPass" element={<ForgotPagePassword/>}/>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;