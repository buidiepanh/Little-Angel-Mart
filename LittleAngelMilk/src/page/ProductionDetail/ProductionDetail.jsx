import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./ProductionDetail.css";
import ProductCounter from "../../component/ProductionDetail/ProductCounter";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import toast, { Toaster } from "react-hot-toast";

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

const CREATE_CART = gql`
  mutation Mutation($data: CartCreateInput!) {
    createCart(data: $data) {
      createdAt
      id
      user {
        id
      }
    }
  }
`;

const CREATE_CART_ITEM = gql`
  mutation Mutation($where: ProductWhereInput!, $data: CartItemCreateInput!) {
    createCartItem(data: $data) {
      cartId {
        id
      }
      id
      price
      productId(where: $where) {
        id
        name
      }
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
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [createCart] = useMutation(CREATE_CART);
  const [createCartItem] = useMutation(CREATE_CART_ITEM);

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

  const userId = localStorage.getItem("userId");

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
      alert("Feedback submitted successfully!");
      setInput({ comment: "" });
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert(`Error submitting feedback: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  const selectedProduct = data?.products?.find((product) => product.id === id);

  if (!selectedProduct) return <div>Product not found</div>;

  const handleAddToCart = async () => {
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      try {
        const { data } = await createCart({
          variables: {
            data: {
              createdAt: new Date().toISOString(),
              user: { connect: { id: userId } },
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

    try {
      await createCartItem({
        variables: {
          where: { id: { equals: selectedProduct.id } },
          data: {
            cartId: { connect: { id: cartId } },
            price: selectedProduct.productPrice,
            productId: { connect: 
              { 
                id: selectedProduct.id 
              },
            },
            quantity: 1,
          },
        },
      });

      toast('Đã thêm vào giỏ hàng!', {
        icon: '🛒',
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(`Error adding to cart: ${err.message}`);
    }
  };

  return (
    <div>
      <Toaster />
      <Header />
      <div className="product-detail-container">
        <div className="product-upper">
          <div className="product-image">
            {selectedProduct.productImage?.publicUrl && (
              <img
                src={selectedProduct.productImage.publicUrl}
                alt={selectedProduct.name}
              />
            )}
          </div>
          <div className="product-info">
            <h1>{selectedProduct.name}</h1>
            <div className="product-price">
              {selectedProduct.productPrice.toLocaleString("vi-VN")}đ
            </div>
            <ProductCounter />
            {username ? (
              <div className="product-actions">
                <button className="button-large btn-buy">Mua ngay</button>
                <button
                  className="button-large btn-cart"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            ) : (
              <div className="product-actions">
                <Link to="/Login">
                  <button className="button-large btn-buy">Mua ngay</button>
                </Link>
                <Link to="/Login">
                  <button className="button-large btn-cart">
                    Thêm vào giỏ hàng
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="product-lower">
          <div className="product-description">
            <h2>Mô tả sản phẩm</h2>
            {selectedProduct.productDescription}
          </div>
          <div className="product-recommendations">
            <h2>Các sản phẩm tương tự</h2>
          </div>
          <div className="product-comments">
            <h2>Bình luận</h2>
            <textarea
              name="comment"
              value={inputFeedback.comment}
              onChange={handleChange}
              placeholder="Hãy viết nội dung..."
            ></textarea>
            <button onClick={handleSubmit}>Submit Comment</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductionDetail;
