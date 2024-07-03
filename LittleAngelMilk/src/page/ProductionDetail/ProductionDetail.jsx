import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import ProductCounter from "../../component/ProductionDetail/ProductCounter";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import toast, { Toaster } from "react-hot-toast";
import "./ProductionDetail.css";

const GET_PRODUCT = gql`
  query Products {
    products {
      id
      name
      category {
        name
      }
      productDescription
      productImage {
        publicUrl
      }
      productPrice
    }
  }
`;

const GET_PRODUCT_FEEDBACK = gql`
  query Query($productId: ID!) {
    feedbacks(where: { product: { id: { equals: $productId } } }) {
      id
      comment
    }
  }
`;

const GET_CART_ITEM = gql`
  query Query($where: CartItemWhereUniqueInput!) {
    cartItem(where: $where) {
      id
      productId {
        id
      }
      quantity
    }
  }
`;

const CREATE_CART = gql`
  mutation CreateCart($data: CartCreateInput!) {
    createCart(data: $data) {
      createdAt
      id
      itemsCount
      user {
        id
      }
    }
  }
`;

const CREATE_CART_ITEM = gql`
  mutation CreateCartItem($data: CartItemCreateInput!) {
    createCartItem(data: $data) {
      cartId {
        id
      }
      id
      productId {
        id
        name
      }
      quantity
      price
    }
  }
`;

const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItem($where: CartItemWhereUniqueInput!, $data: CartItemUpdateInput!) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }
`;

const FEEDBACK_MUTATION = gql`
  mutation Mutation($data: FeedbackCreateInput!) {
    createFeedback(data: $data) {
      comment
    }
  }
`;

function ProductionDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT);
  const selectedProduct = data?.products?.find((product) => product.id === id);
  const { data: feedbackOfProduct, refetch: refetchFeedback } = useQuery(GET_PRODUCT_FEEDBACK, {
    variables: { productId: selectedProduct?.id },
    skip: !selectedProduct
  });

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [createCart] = useMutation(CREATE_CART);
  const [createCartItem] = useMutation(CREATE_CART_ITEM);
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const userId = localStorage.getItem("userId");

  const { data: cartItemData, refetch } = useQuery(GET_CART_ITEM, {
    variables: {
      where: {
        id: localStorage.getItem("cartItemId")
      }
    },
    skip: !localStorage.getItem("cartItemId")
  });

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const user = localStorage.getItem("userName");
    if (token && user) {
      setUsername(user);
    }
  }, []);

  const [inputFeedback, setInput] = useState({
    comment: "",
  });

  const [feedbacks, setFeedbacks] = useState(() => {
    const storedFeedbacks = localStorage.getItem(`feedbacks_${selectedProduct?.id}`);
    return storedFeedbacks ? JSON.parse(storedFeedbacks) : [];
  });

  useEffect(() => {
    if (feedbackOfProduct?.feedbacks) {
      const initialFeedbacks = feedbackOfProduct.feedbacks.map(fb => ({
        comment: fb.comment,
        date: fb.date || new Date().toLocaleString() // Use the date from feedback or current date for existing feedbacks
      }));
      setFeedbacks(initialFeedbacks);
    }
  }, [feedbackOfProduct]);

  useEffect(() => {
    localStorage.setItem(`feedbacks_${selectedProduct?.id}`, JSON.stringify(feedbacks));
  }, [feedbacks, selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const [createFeedback] = useMutation(FEEDBACK_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputFeedback.comment.trim() === "") {
      toast.error("Hãy nhập đánh giá của ba mẹ vào đây nhé !!!");
      return;
    }

    const currentDate = new Date().toLocaleString();  // Get the current date and time

    try {
      await createFeedback({
        variables: {
          data: {
            product: { connect: { id: selectedProduct.id } },
            user: { connect: { id: userId } },
            comment: inputFeedback.comment,
          },
        },
      });
      toast.success("Feedback submitted successfully!");
      setInput({ comment: "" });
      setFeedbacks([...feedbacks, { comment: inputFeedback.comment, date: currentDate }]); // Store the feedback with date
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error(`Error submitting feedback: ${err.message}`);
    }
  };

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading product details</Typography>;

  if (!selectedProduct)
    return <Typography color="error">Product not found</Typography>;

  const handleAddToCart = async () => {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      try {
        const { data } = await createCart({
          variables: {
            data: {
              createdAt: new Date().toISOString(),
              user: { 
                connect: 
                { 
                  id: userId
                } 
              },
            },
          },
        });
        cartId = data.createCart.id;
        localStorage.setItem("cartId", cartId);
      } catch (err) {
        console.error("Error creating cart:", err);
        toast.error(`Error creating cart: ${err.message}`);
        return;
      }
    }
/*commented piece of code for increasing quantity when adding the same product, will be implemented and updated later*/

await refetch();
// const existingCartItem = cartItemData?.cartItem;

// if (existingCartItem && existingCartItem.productId.id === selectedProduct.id) {
//   try {
//     await updateCartItemQuantity({
//       variables: {
//         where: { id: existingCartItem.id },
//         data: { quantity: existingCartItem.quantity + 1 },
//       },
//     });

//     toast('Đã cập nhật số lượng sản phẩm trong giỏ hàng!', {
//       icon: '🛒',
//     });
//   } catch (err) {
//     console.error("Error updating cart item quantity:", err);
//     toast.error(`Error updating cart item quantity: ${err.message}`);
//   }
// } 
// else {


//add item to cart

    try {
      const { data } = await createCartItem({
        variables: {
          data: {
            cartId: { 
              connect: 
              { 
                id: cartId
              } 
            },
            price: selectedProduct.productPrice,
            productId: { 
              connect: 
              { 
                id: selectedProduct.id
              } 
            },
            quantity: 1,
          },
        },
      });

      localStorage.setItem("cartItemId", data.createCartItem.id);

      toast('Đã thêm vào giỏ hàng!', {
        icon: '🛒',
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(`Error adding to cart: ${err.message}`);
    }
  };

  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(2);

  const handleLoadMoreFeedback = () => {
    setVisibleFeedbackCount((prevCount) => prevCount + 2);
  };

  const handleLoadLessFeedback = () => {
    setVisibleFeedbackCount((prevCount) => Math.max(prevCount - 2, 2));
  };

  return (
    <div>
      <Toaster />
      <Header />
      <Container maxWidth="lg" className="product-detail-container">
        <Card className="product-upper">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} className="product-image">
              {selectedProduct.productImage?.publicUrl && (
                <CardMedia
                  component="img"
                  image={selectedProduct.productImage.publicUrl}
                  alt={selectedProduct.name}
                  className="product-image"
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} className="product-info">
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {selectedProduct.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {selectedProduct.productPrice.toLocaleString("vi-VN")}đ
                </Typography>
                <ProductCounter />
                {username ? (
                  <Box
                    className="product-actions"
                    display="flex"
                    gap={2}
                    marginTop={2}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      className="btn-buy"
                    >
                      Mua ngay
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="btn-cart"
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Box>
                ) : (
                  <Box className="product-actions">
                    <Link to="/Login">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="btn-buy"
                      >
                        Mua ngay
                      </Button>
                    </Link>
                    <Link to="/Login">
                      <Button
                        variant="contained"
                        color="primary"
                        className="btn-cart"
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </Link>
                  </Box>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Box className="product-lower">
          <Box className="product-description">
            <Typography variant="h6">Mô tả sản phẩm</Typography>
            <Typography variant="body1">
              {selectedProduct.productDescription}
            </Typography>
          </Box>
          <Box className="product-recommendations">
            <Typography variant="h6">Các sản phẩm tương tự</Typography>
          </Box>
          <Box className="product-comments">
            <Typography variant="h6">Bình luận</Typography>
            <TextField
                name="comment"
                value={inputFeedback.comment}
                onChange={handleChange}
                placeholder="Hãy viết nội dung..."
                multiline
                rows={4}
                variant="outlined"
                fullWidth
            />
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
            >
                Submit Comment
            </Button>
            {/* Hiển thị feedbacks */}
            {feedbacks.slice(0, visibleFeedbackCount).map((feedback, index) => (
                <Box key={index} className="feedback-item">
                    <div className="icon-container">
                        <AccountCircleOutlinedIcon style={{ fontSize: 50 }} />
                    </div>
                    <div className="feedback-content">
                        <div className="feedback-header">
                            <span>User</span>
                            <span>{feedback.date}</span>
                        </div>
                        <Typography variant="body1">{feedback.comment}</Typography>
                    </div>
                </Box>
            ))}
            <Box className="button-container">
                {feedbacks.length > visibleFeedbackCount && (
                    <Button 
                      variant="contained"
                      onClick={handleLoadMoreFeedback} 
                      className="load-more-button"
                    >
                      Xem thêm
                    </Button>
                )}
                {visibleFeedbackCount > 2 && (
                    <Button 
                      variant="contained"
                      onClick={handleLoadLessFeedback} 
                      className="load-less-button"
                    >
                      Giảm bớt
                    </Button>
                )}
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default ProductionDetail;
