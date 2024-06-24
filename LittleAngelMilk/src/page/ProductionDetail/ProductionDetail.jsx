import React, { Component } from "react";
import "./ProductionDetail.css";
import productImage from "../../image/binhsua.jpg";
import ProductCounter from "../../component/ProductionDetail/ProductCounter";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";

function ProductionDetail() {
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

  const { id } = useParams();
  const { data } = useQuery(GET_PRODUCT);
  const selectedProduct = data.products.find((product) => product.id === id);
  console.log(selectedProduct);
  return (
    <div>
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
            {/* <img src={productImage} alt="Hộp chia sữa 3 tầng tiện lợi" /> */}
          </div>
          <div className="product-info">
            <h1>{selectedProduct.name}</h1>
            <div className="product-price">
              {selectedProduct.productPrice.toLocaleString("vi-VN")}đ
            </div>
            <ProductCounter />
            <div className="product-actions">
              <button className="button-large btn-buy">Mua ngay</button>
              <button className="button-large btn-cart">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div className="product-lower">
          <div className="product-description">
            <h2>Mô tả sản phẩm</h2>
            {selectedProduct.productDescription}
          </div>
          <div className="product-recommendations">
            <h2>Các sản phẩm tương tự</h2>
            {/* Implement recommendations */}
          </div>
          <div className="product-comments">
            <h2>Bình luận</h2>
            <textarea placeholder="Hãy viết nội dung..."></textarea>
            <button>Submit Comment</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductionDetail;
