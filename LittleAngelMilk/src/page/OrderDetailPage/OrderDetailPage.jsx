// OrderDetailPage.jsx
import React from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './OrderDetailPage.css';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";

const GET_CART_QUERY = gql`
  query Cart($where: OrderWhereUniqueInput!) {
    order(where: $where) {
      createdAt
      id
      status
      totalPrice
    }
  }
`;

const OrderDetailPage = () => {
  const orderId = localStorage.getItem("orderId"); // Retrieve orderId from localStorage

  const { data, loading, error } = useQuery(GET_CART_QUERY, {
    variables: {
      where: {
        id: orderId
      }
    }
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading order details: {error.message}</Typography>;
  }

  const order = data.order; // Assuming there's only one order per id

  return (
    <>
      <Header />
      <Container maxWidth="md" className="order-detail-container">
        <Box className="order-detail-box">
          <Typography variant="h4" component="h1" gutterBottom className="order-detail-header">
            Chi tiết đơn hàng
          </Typography>

          <Box className="order-info">
            <Typography variant="h6" component="h2">Thông tin đơn hàng</Typography>
            <Typography><strong>ID đơn hàng:</strong> {order.id}</Typography>
            <Typography><strong>Trạng thái:</strong> {order.status}</Typography>
            <Typography><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleDateString()}</Typography>
            <Typography><strong>Tổng cộng:</strong> {order.totalPrice}đ</Typography>
          </Box>

          <Box className="order-actions">
            <Button variant="contained" className="cancel-button1">Hủy đơn hàng</Button>
            <Button variant="contained" component={Link} to="/" className="home-button1">Quay lại trang chủ</Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default OrderDetailPage;


//abc