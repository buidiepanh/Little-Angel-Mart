import React, { Component } from "react";
import "./ProductionDetail.css";
import productImage from "../../image/binhsua.jpg";
import ProductCounter from "../../component/ProductionDetail/ProductCounter";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
class ProductionDetail extends Component {
  render() {
    return (
      <div className="productDetail">
      <div className="product-detail-container">
        <div>
        <Header/>
        </div>
        <div className="product-upper">
          <div className="product-image">
            <img src={productImage} alt="Hộp chia sữa 3 tầng tiện lợi" />
          </div>
          <div className="product-info">
            <h1>Hộp chia sữa 3 tầng tiện lợi</h1>
            <div className="product-rating">
              <span>Rating:</span>
              ★★★★☆
            </div>
            <div className="product-price">109.000đ</div>
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
            Hộp chia sữa 3 tầng tiện lợi Dottodot là món đồ tiện lợi mà các bà
            mẹ có con nhỏ không nên bỏ qua. Sản phẩm được làm từ nhựa cao cấp
            chịu nhiệt tốt, giúp các mẹ bỉm bảo quản vẹn nguyên dòng sữa nguyên
            chất cho con. Thiết kế hộp 3 tầng có thể tháo lắp dễ dàng, giúp ba
            mẹ tiện lợi mang theo khi đưa bé đi chơi xa.
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
      <Footer/>
      </div>
    );
  }
}

export default ProductionDetail;
