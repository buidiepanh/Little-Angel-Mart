import React, { Component } from 'react';
import './ProductList.css';
import Header from "../../component/header/Header";
import img1 from '/src/assets/anh1.png';  
import img2 from '/src/assets/anh2.png';
import img3 from '/src/assets/anh3.png';
import img4 from '/src/assets/anh4.png';
import img5 from '/src/assets/anh5.png';
import img6 from '/src/assets/anh6.png';
import img7 from '/src/assets/anh7.png';
import img8 from '/src/assets/anh8.png';
import img9 from '/src/assets/anh9.png';
import img10 from '/src/assets/anh10.png';
import img11 from '/src/assets/anh11.png';
import img12 from '/src/assets/anh12.png';

const products = [
  { id: 1, name: 'Combo 2 Tã quần GOO.N Mommy Kiss', price: '$19.99', section: 'Section 15', imgUrl: img1 },
  { id: 2, name: 'Combo 2 Tã quần Molfix', price: '$29.99', section: 'Section 13', imgUrl: img2 },
  { id: 3, name: 'Tã dán Merries', price: '$39.99', section: 'Section 15', imgUrl: img3 },
  { id: 4, name: 'Tã dán Merries', price: '$49.99', section: 'Section 13', imgUrl: img4 },
  { id: 5, name: 'Bình tritan lớn Diller BPA free 650ml', price: '$59.99', section: 'Section 15', imgUrl: img5 },
  { id: 6, name: 'Khăn đa năng cho bé K126-7012', price: '$69.99', section: 'Section 13', imgUrl: img6 },
  { id: 7, name: 'Nhiệt kế hồng ngoại AOJ-20A', price: '$79.99', section: 'Section 15', imgUrl: img7 },
  { id: 8, name: 'Gối chống trào ngược ROTOTO BEBE', price: '$89.99', section: 'Section 13', imgUrl: img8 },
  { id: 9, name: 'Yến Babi Bird', price: '$99.99', section: 'Section 15', imgUrl: img9 },
  { id: 10, name: 'Combo 4 Sữa tươi tiệt trùng Oldenburger có đường 110ml', price: '$109.99', section: 'Section 13', imgUrl: img10 },
  { id: 11, name: 'Combo 2 TUI NUOC YEN GENNEST 105ML 5%', price: '$119.99', section: 'Section 15', imgUrl: img11 },
  { id: 12, name: 'Bỉm tã dán Elprairie AW', price: '$129.99', section: 'Section 13', imgUrl: img12 },
];

export default class ProductList extends Component {
  state = {
    filteredProducts: products,
    sortOrder: 'newest'
  };

  handleSortChange = (event) => {
    const sortValue = event.target.value;
    this.setState({
      sortOrder: sortValue,
      filteredProducts: products.sort((a, b) => {
        if (sortValue === 'newest') {
          return b.dateAdded - a.dateAdded;
        } else {
          return a.dateAdded - b.dateAdded;
        }
      })
    });
  };

  render() {
    return (
      <div>
        <Header />
      <div className="product-list-page">
        <div className="product-list-container">
        <div className="sort-container">
          <label htmlFor="sort">Sắp xếp theo:</label>
          <select id="sort" value={this.state.sortOrder} onChange={this.handleSortChange}>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>
        <div className="products">
          {this.state.filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imgUrl} alt={product.name} />
              <div>{product.name}</div>
              <div>{product.price}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
    );
  }
}