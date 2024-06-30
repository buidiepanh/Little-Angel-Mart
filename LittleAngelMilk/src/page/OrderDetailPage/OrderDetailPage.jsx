import React from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './OrderDetailPage.css';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";

const OrderDetailPage = () => {
  const order = {
    id: '12345',
    customerName: "Nguyen Van A",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    status: "Đã hoàn tất thanh toán",
    items: [
      { id: 1, name: "Item 1", quantity: 2, price: 20, total: 40 },
      { id: 2, name: "Item 2", quantity: 1, price: 50, total: 50 },
      { id: 3, name: "Item 3", quantity: 3, price: 15, total: 45 }
    ],
    total: 135
  };

  return (
    <>
    <Header/>
    <Container maxWidth="md" className="order-detail-container">
      <Box className="order-detail-box">
        <Typography variant="h4" component="h1" gutterBottom className="order-detail-header">
          Chi tiết đơn hàng
        </Typography>

        <Box className="order-info">
          <Typography variant="h6" component="h2">Thông tin đơn hàng</Typography>
          <Typography><strong>ID đơn hàng:</strong> {order.id}</Typography>
          <Typography><strong>Tên khách hàng:</strong> {order.customerName}</Typography>
          <Typography><strong>Email:</strong> {order.email}</Typography>
          <Typography><strong>Địa chỉ:</strong> {order.address}</Typography>
          <Typography><strong>Tình trạng:</strong> {order.status}</Typography>
        </Box>

        <TableContainer component={Paper} className="order-detail-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Tổng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}$</TableCell>
                  <TableCell align="right">{item.total}$</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box className="order-summary">
          <Typography variant="h6" component="h2">Tổng kết đơn hàng</Typography>
          <Typography><strong>Tổng cộng:</strong> {order.total}$</Typography>
        </Box>

        <Box className="order-actions">
          <Button variant="contained" className="cancel-button">Hủy đơn hàng</Button>
          <Button variant="contained" component={Link} to="/" className="home-button">Quay lại trang chủ</Button>
        </Box>
      </Box>
    </Container>
    <Footer/>
    </>
  );
};

export default OrderDetailPage;
