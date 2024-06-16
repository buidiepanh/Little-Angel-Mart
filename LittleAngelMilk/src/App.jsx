


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './page/LoginForm/LoginForm';
import ProductionDetail from './page/ProductionDetail/ProductionDetail';
import RegisterForm from './page/RegisterForm/RegisterForm';
import ForgotPage from "./page/ForgotPage/ForgotPage";
import ForgotPagePassword from "./page/ForgotPagePassword/ForgotPagePassword";
import CartPage from './page/CartPage/CartPage';
import Content from './component/content/content';
import CustomerInfo from './page/CustomerInfo/CustomerInfo';
import OrderConfirmation from './page/OrderConfirmation/OrderConfirmation';
const App = () => {
    return (
      <div>
        <Router>
                <Routes>
                    <Route path="/ForgotPassEmail" element={<ForgotPage/>}/>
                    <Route path="/ForgotPass" element={<ForgotPagePassword/>}/>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/" element={<Content />} />
                    <Route path="/Cart" element={<CartPage/>} />
                    <Route path="/CustomerCartInfo" element={<CustomerInfo/>} />
                    <Route path="/ProductDetail" element={<ProductionDetail/>} />
                    <Route path="/OrderConfirm" element={<OrderConfirmation/>} />
                </Routes>
        </Router>
        </div>
    );
};


export default App;
