import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./page/LoginForm/LoginForm";
import ProductionDetail from "./page/ProductionDetail/ProductionDetail";
import RegisterForm from "./page/RegisterForm/RegisterForm";
import ForgotPage from "./page/ForgotPage/ForgotPage";
import ForgotPagePassword from "./page/ForgotPagePassword/ForgotPagePassword";
import CartPage from "./page/CartPage/CartPage";
import Content from "./component/content/content";
import CustomerInfo from "./page/CustomerInfo/CustomerInfo";
import Payment from "./page/PaymentPage/payment";
import AboutUsPage from "./page/AboutUsPage/AboutUsPage";
import ProductList from "./page/ProductList/ProductList";
import OrderDetailPage from "./page/OrderDetailPage/OrderDetailPage";

import OrderConfirmation from "./page/OrderConfirmation/OrderConfirmation";
import UserAccount from "./page/UserAccount/UserAccount";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/ForgotPassEmail" element={<ForgotPage />} />
          <Route path="/ForgotPass" element={<ForgotPagePassword />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Content />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/CustomerCartInfo" element={<CustomerInfo />} />
          <Route path="/ProductDetail/:id" element={<ProductionDetail />} />
          <Route path="/PaymentPage" element={<Payment />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-list/:search" element={<ProductList />} />
          <Route path="/profile" element={<UserAccount />} />
          <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
          <Route path="/order-detail" element={<OrderDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
