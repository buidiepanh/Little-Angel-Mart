import React, { useState, useEffect } from 'react';
import './OrderConfirmation.css';
import { RxPerson } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';

const CREATE_ORDER_MUTATION = gql`
  mutation Mutation($data: OrderCreateInput!) {
    createOrder(data: $data) {
      createdAt
      id
      status
      totalPrice
    }
  }
`;

const GET_CART_ITEMS = gql`
  query GetCartItems($where: CartItemWhereInput!) {
    cartItems(where: $where) {
      id
      productId {
        id
        name
        productImage {
          publicUrl
        }
        productPrice
      }
      quantity
      price
    }
  }
`;

const OrderConfirmation = () => {
  const initialCustomer = {
    name: '',
    address: '',
    email: '',
    phone: ''
  };

  const [customer, setCustomer] = useState(initialCustomer);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState(initialCustomer);
  const [showCartStep, setShowCartStep] = useState(false);
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);

  const cartId = localStorage.getItem("cartId");

  const { data: cartItemsData, loading: cartItemsLoading, error: cartItemsError } = useQuery(GET_CART_ITEMS, {
    variables: {
      where: {
        cartId: {
          id: {
            equals: cartId || ""
          }
        }
      }
    },
    skip: !cartId,
  });

  useEffect(() => {
    if (cartItemsData && cartItemsData.cartItems) {
      setCartItems(cartItemsData.cartItems);
    }
  }, [cartItemsData]);

  useEffect(() => {
    const lastAction = localStorage.getItem("lastAction");
    if (lastAction === "addToCart") {
      setShowCartStep(true);
    }

    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedPhone = localStorage.getItem("userPhoneNumber");
    const storedAddress = localStorage.getItem("userAddress");

    const loadedCustomer = {
      name: storedName || '',
      email: storedEmail || '',
      phone: storedPhone || '',
      address: storedAddress || ''
    };

    setCustomer(loadedCustomer);
    setUpdatedCustomer(loadedCustomer);

    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setCustomer(updatedCustomer);
    setIsEditing(false);

    localStorage.setItem("userName", updatedCustomer.name);
    localStorage.setItem("userEmail", updatedCustomer.email);
    localStorage.setItem("userPhoneNumber", updatedCustomer.phone);
    localStorage.setItem("userAddress", updatedCustomer.address);
  };

  const handleConfirmOrder = async () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    try {
      const response = await createOrder({
        variables: {
          data: {
            createdAt: new Date().toISOString(),
            status: 'published',
            totalPrice: totalPrice
          }
        }
      });
      const order = response.data.createOrder;
      const orderIdCreated = response.data.createOrder.id;
      console.log('Order created:', order);
      console.log('OrderID:', orderIdCreated);
      localStorage.setItem('orderId', orderIdCreated);
      await Swal.fire({
        title: "Khởi tạo đơn hàng thành công!",
        icon: "success"
      });
      localStorage.setItem("CreatedOrder", JSON.stringify(order));
      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="background-wrapper">
      <Toaster />
      <div className="order-container">
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
          <div className="step active">
            <div className="icon">
              <FaCheck />
            </div>
            <div className="label">Xác nhận đơn hàng</div>
          </div>
        </div>
        <div className="shopping-cart-section">
          <h2>Xác nhận đơn hàng</h2>
          <div className="customer-info">
            <h3>Thông tin khách hàng</h3>
            {isEditing ? (
              <div className="customer-form">
                <p>
                  <strong>Tên:</strong>
                  <input
                    type="text"
                    name="name"
                    value={updatedCustomer.name}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Địa chỉ:</strong>
                  <input
                    type="text"
                    name="address"
                    value={updatedCustomer.address}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Email:</strong>
                  <input
                    type="email"
                    name="email"
                    value={updatedCustomer.email}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Số điện thoại:</strong>
                  <input
                    type="text"
                    name="phone"
                    value={updatedCustomer.phone}
                    onChange={handleInputChange}
                  />
                </p>
                <button className="save-button" onClick={handleSaveClick}>Lưu</button>
              </div>
            ) : (
              <div>
                <p><strong>Tên:</strong> {customer.name}</p>
                <p><strong>Địa chỉ:</strong> {customer.address}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Số điện thoại:</strong> {customer.phone}</p>
                <button className="update-button" onClick={handleUpdateClick}>Cập nhật thông tin</button>
              </div>
            )}
          </div>
          <div className="order-summary">
            <h3>Thông tin đơn hàng</h3>
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.productId.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}đ</td>
                    <td>{item.price * item.quantity}đ</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Tổng cộng</td>
                  <td>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}đ</td>
                </tr>
              </tfoot>
            </table>
            {product && (
              <div className="product-details">
                <h3>Chi tiết sản phẩm</h3>
                <div className="product-card">
                  <img src={product.productImage?.publicUrl} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>Giá: {product.productPrice}đ</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="confirmation-buttons">
          <button className="cancel-button">Hủy đơn hàng</button>
          <button className="confirm-button" onClick={handleConfirmOrder}>Xác nhận hoàn tất và tạo đơn hàng</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
