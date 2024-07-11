import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
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
import { formatMoney } from "../../utils/formatMoney";
import "./ProductionDetail.css";
import { GET_PRODUCT, GET_PRODUCTS } from "../Queries/product";
import { FEEDBACK_MUTATION } from "../Mutations/feedback";
import { GET_PRODUCT_FEEDBACK } from "../Queries/feedback";
import { GET_CART, GET_CART_ITEM } from "../Queries/cart";
import {
  CREATE_CART,
  CREATE_CART_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_CART,
} from "../Mutations/cart";
import { useDispatch } from "react-redux";
import { saveProduct } from "../../store/product/productSlice";

function ProductionDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("sessionToken");
  const username = localStorage.getItem("userName") || "";
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateCart] = useMutation(UPDATE_CART);

  const {
    data: productDetail,
    loading,
    error,
  } = useQuery(GET_PRODUCT, {
    variables: { where: { id } },
  });

  console.log(productDetail);
  // Khởi tạo trạng thái để lưu trữ nội dung phản hồi người dùng đang nhập
  const [inputFeedback, setInput] = useState({
    comment: "",
  });

  // Khởi tạo trạng thái để lưu trữ danh sách các phản hồi từ localStorage
  // const [feedbacks, setFeedbacks] = useState(() => {
  //   const storedFeedbacks = localStorage.getItem(`feedbacks_${id}`);
  //   return storedFeedbacks ? JSON.parse(storedFeedbacks) : [];
  // });

  // useQuery
  const { data: feedbackOfProduct } = useQuery(GET_PRODUCT_FEEDBACK, {
    variables: { productId: productDetail?.product.id },
  });
  console.log(feedbackOfProduct);

  // console.log(feedbackOfProduct)
  //useEffect
  // useEffect để kiểm tra và khởi tạo feedback từ localStorage hoặc server
  // useEffect(() => {
  //   const storedFeedbacks = localStorage.getItem(`feedbacks_${id}`);
  //   if (storedFeedbacks) {
  //     setFeedbacks(JSON.parse(storedFeedbacks));
  //   } else {
  //     // If there are no stored feedbacks, attempt to fetch from the server and initialize
  //     if (feedbackOfProduct?.feedbacks) {
  //       const initialFeedbacks = feedbackOfProduct.feedbacks.map((fb) => ({
  //         comment: fb.comment,
  //         date: fb.date || new Date().toLocaleString(), // Fallback to new date if none is provided (initial load from server)
  //       }));
  //       setFeedbacks(initialFeedbacks);
  //       localStorage.setItem(
  //         `feedbacks_${id}`,
  //         JSON.stringify(initialFeedbacks)
  //       ); // Store initially fetched feedbacks
  //     }
  //   }
  // }, [id, feedbackOfProduct]);

  // // useEffect để lưu feedback vào localStorage khi feedback thay đổi
  // useEffect(() => {
  //   localStorage.setItem(`feedbacks_${id}`, JSON.stringify(feedbacks));
  // }, [feedbacks, id]);

  // const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);

  // Lấy dữ liệu giỏ hàng từ API
  const { data: cartItemData, refetch } = useQuery(GET_CART_ITEM, {
    variables: {
      where: {
        cartId: {
          id: {
            equals: localStorage.getItem("cartId"),
          },
        },
      },
    },
    skip: !localStorage.getItem("cartId"),
  });

  console.log(cartItemData);
  const { data: cartData, refetch: refetchCart } = useQuery(GET_CART, {
    variables: {
      where: {
        id: localStorage.getItem("cartId"),
      },
    },
    skip: !localStorage.getItem("cartId"),
  });

  //use mutation
  const [createCart] = useMutation(CREATE_CART);
  const [createCartItem] = useMutation(CREATE_CART_ITEM);
  const [createFeedback] = useMutation(FEEDBACK_MUTATION);

  // Handle change when input feedback form
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Handle event
  //Handle event submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputFeedback.comment.trim() === "") {
      toast.error("Hãy nhập đánh giá của ba mẹ vào đây nhé !!!");
      return;
    }

    const currentDate = new Date().toLocaleString();

    try {
      const { data } = await createFeedback({
        variables: {
          data: {
            product: { connect: { id } },
            user: { connect: { id: userId } },
            comment: inputFeedback.comment,
            createdAt: new Date().toISOString(),
            //
          },
        },
      });

      toast.success("Feedback submitted successfully!");
      setInput({ comment: "" });
      // setFeedbacks((prevFeedbacks) => [
      //   ...prevFeedbacks, // Giữ lại các phản hồi cũ
      //   { comment: inputFeedback.comment, date: feedbackDate }, // Thêm phản hồi mới với thời gian hiện tại
      // ]);
      // localStorage.setItem(
      //   `feedbacks_${id}`,
      //   JSON.stringify([
      //     ...feedbacks,
      //     { comment: inputFeedback.comment, date: feedbackDate },
      //   ]) // Lưu phản hồi mới vào localStorage
      // );
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error(`Error submitting feedback: ${err.message}`);
    }
  };

  const handleAddToCart = async () => {
    localStorage.setItem("lastAction", "addToCart");
    let cartId = localStorage.getItem("cartId");
    let itemsCount = cartData?.cart?.quantity || 0;
    console.log(itemsCount);
    console.log("product id:", productDetail.product.id);
    console.log("product price:", productDetail.product.productPrice);
    dispatch(saveProduct(productDetail.product));
    if (!cartId) {
      try {
        const { data } = await createCart({
          variables: {
            data: {
              createdAt: new Date().toISOString(),
              user: {
                connect: {
                  id: userId,
                },
              },
              quantity: 1,
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

    const existingCartItem = cartItemData?.cartItems?.find(
      (item) => item.productId[0].id === productDetail.product.id
    );

    console.log("productDetail.product.id:", productDetail?.product?.id);
    console.log(`productId:`, id);
    console.log("existing cart item: ", existingCartItem);
    if (cartItemData && cartItemData.cartItems) {
      cartItemData.cartItems.forEach((item, index) => {
        console.log(`Item product Id${index}:`, item.productId[0].id);
        // cartItemData.cartItems.productId.forEach((productItem, index1) => {
        //   console.log(`Item Product${index1}:`, productItem);
        // })
      });
    }
    if (existingCartItem) {
      try {
        await updateCartItemQuantity({
          variables: {
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + 1 },
          },
        });
        toast("Đã cập nhật giỏ hàng!", {
          icon: "🛒",
        });
      } catch (err) {
        console.error("Error updating cart item quantity:", err);
        toast.error(`Error updating cart item quantity: ${err.message}`);
      }
    } else {
      try {
        await createCartItem({
          variables: {
            data: {
              cartId: {
                connect: {
                  id: cartId,
                },
              },
              price: productDetail.product.productPrice,
              productId: {
                connect: {
                  id: productDetail.product.id,
                },
              },
              quantity: 1,
            },
          },
        });
        toast("Đã thêm vào giỏ hàng!", {
          icon: "🛒",
        });
      } catch (err) {
        console.error("Error adding to cart:", err);
        toast.error(`Error adding to cart: ${err.message}`);
      }
    }

    try {
      await updateCart({
        variables: {
          where: { id: cartId },
          data: { quantity: itemsCount + 1 },
        },
      });
    } catch (err) {
      console.error("Error updating cart quantity:", err);
      toast.error(`Error updating cart quantity: ${err.message}`);
    }
    await refetch();
    await refetchCart();
  };

  const handleBuyNow = async () => {
    localStorage.setItem("lastAction", "buyNow");
    //Save data into redux
    dispatch(saveProduct(productDetail.product));
    navigate("/CustomerCartInfo");
  };

  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(2);

  const handleLoadMoreFeedback = () => {
    setVisibleFeedbackCount((prevCount) => prevCount + 2);
  };

  const handleLoadLessFeedback = () => {
    setVisibleFeedbackCount((prevCount) => Math.max(prevCount - 2, 2));
  };

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading product details</Typography>;

  if (!productDetail)
    return <Typography color="error">Product not found</Typography>;

  return (
    <div>
      <Toaster />
      <Header />
      <Container maxWidth="lg" className="product-detail-container">
        <Card className="product-upper">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} className="product-image">
              {productDetail.product.productImage?.publicUrl && (
                <CardMedia
                  component="img"
                  image={productDetail.product.productImage.publicUrl}
                  alt={productDetail.product.name}
                  className="product-image"
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} className="product-info">
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {productDetail.product.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {formatMoney(productDetail.product.productPrice)}
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
                      onClick={handleBuyNow}
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
              {productDetail.product.productDescription}
            </Typography>
          </Box>
          <Box className="product-recommendations">
            <Typography variant="h6">Các sản phẩm khác</Typography>
            <SimilarProducts />
          </Box>
          <Box className="product-comments">
            <Typography variant="h6">Bình luận</Typography>
            <TextField
              name="comment"
              value={inputFeedback.comment}
              onChange={handleFeedbackChange}
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
              Đăng Bình Luận
            </Button>
            {/* Hiển thị feedbacks */}
            {/* {feedbacks.slice(0, visibleFeedbackCount).map((feedback, index) => (
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
            ))} */}
            {/* <Box className="button-container">
                {feedbacks.length > visibleFeedbackCount && (
                  <Button
                    variant="contained"
                    onClick={handleLoadMoreFeedback} // Xử lý load thêm feedback
                    className="load-more-button"
                  >
                    Xem thêm
                  </Button>
                )}
                {visibleFeedbackCount > 2 && (
                  <Button
                    variant="contained"
                    onClick={handleLoadLessFeedback} // Xử lý giảm bớt feedback
                    className="load-less-button"
                  >
                    Giảm bớt
                  </Button>
                )}
              </Box> */}
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default ProductionDetail;
