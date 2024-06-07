<<<<<<< HEAD
// import LoginForm from "./page/LoginForm/LoginForm";
// import Register from "./page/RegisterForm/RegisterForm";
// import Header from "./header/Header";
import Carousel from "./component/carousel/carousel";
import Footer from "./component/footer/footer";
import Content from "./component/content/content";
||||||| 151d472
import LoginForm from "./page/LoginForm/LoginForm";
import Register from "./page/RegisterForm/RegisterForm";
import Header from "./header/Header";
import Carousel from "./component/carousel/carousel";
import Footer from "./component/footer/footer";
=======
import Header from "./component/header/Header";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./page/LoginForm/LoginForm";
import RegisterForm from "./page/RegisterForm/RegisterForm";
import Home from "./page/Home/Home";
import ForgotPage from "./page/ForgotPage/ForgotPage";
>>>>>>> main

const App = () => {
  return (
<<<<<<< HEAD
    <div>
      <Carousel />
      <Content />
      <Footer />
    </div>
||||||| 151d472
    <div>
      <Carousel />
      <Footer />
    </div>
=======
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
>>>>>>> main
  );
};

export default App;
