import Header from "./component/header/Header";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./page/LoginForm/LoginForm";
import RegisterForm from "./page/RegisterForm/RegisterForm";
import Home from "./page/Home/Home";
import ForgotPage from "./page/ForgotPage/ForgotPage";

const App = () => {
  return (
    <ForgotPage />
    // <Router>
    //     <div>
    //         <Routes>
    //           <Route path="/" element={<Home/>} />
    //             <Route path="/login" element={<LoginForm />} />
    //             <Route path="/register" element={<RegisterForm />} />
    //         </Routes>
    //     </div>
    // </Router>
  );
};

export default App;
