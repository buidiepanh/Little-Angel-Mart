import { Link } from "react-router-dom";
import "./payment.scss";
import { PiShoppingCartLight } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import Form, { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import React, { useState, useEffect } from "react";

function Payment() {
  const [formVarible] = useForm();
  const [product, setProduct] = useState(null);
  const [showCartStep, setShowCartStep] = useState(false);

  useEffect(() => {
    const lastAction = localStorage.getItem("lastAction");
    if (lastAction === "addToCart") {
      setShowCartStep(true);
    }
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const handleSubmit = (values) => {
    console.log(values.data);
  };

  return (
    <div className="payment">
      <div className="wrapper">
        <div className="wrapper__header">
          <div className="progress-container">
          {showCartStep && (
            <div className="step active">
              <div className="icon">
                <PiShoppingCartLight />
              </div>
              <div className="label">Giỏ hàng</div>
            </div>
          )}
            <div className="step active">
              <div className="icon">
                <RxPerson />
              </div>
              <div className="label">Thông tin khách hàng</div>
            </div>
            <div className="step active">
              <div className="icon">
                <GoCreditCard />
              </div>
              <div className="label">Thanh toán</div>
            </div>
            <div className="step">
              <div className="icon">
                <FaCheck />
              </div>
              <div className="label">Xác nhận đơn hàng</div>
            </div>
          </div>
          <h2>Thông tin thanh toán</h2>
        </div>
        {product && (
          <div className="product-info">
            <h3>Thông tin sản phẩm</h3>
            <p>Tên sản phẩm: {product.name}</p>
            <p>Giá: {product.productPrice}</p>
          </div>
        )}
        <div className="wrapper__form">
          <Form form={formVarible} onFinish={handleSubmit}>
            <div className="form-group">
              <label>Số thẻ</label>
              <FormItem>
                <input type="text" placeholder="111-222-333" />
              </FormItem>
            </div>
            <div className="form-group">
              <label>Tên in trên thẻ</label>
              <FormItem>
                <input type="text" placeholder="Nguyen Van A" />
              </FormItem>
            </div>
            <div className="form-group">
              <label>Ngày hết hạn</label>
              <FormItem>
                <input type="date" />
              </FormItem>
            </div>
          </Form>
        </div>
        <div className="wrapper__button">
          <Link to="/CustomerCartInfo">
            <button className="back">Quay lại</button>
          </Link>
          <Link to="/OrderConfirmation">
            <button className="confirm">Xác nhận và tạo đơn hàng</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Payment;
