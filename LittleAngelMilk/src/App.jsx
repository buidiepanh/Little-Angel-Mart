

import './page/ProductionDetail/ProductionDetail.css'; 

import ProductionDetail from './page/ProductionDetail/ProductionDetail';
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
