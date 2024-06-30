import { useEffect, useState } from "react";
import "./ProductList.css";
import { useQuery, gql } from "@apollo/client";
import img1 from "/src/assets/anh1.png";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/header/Header";
// import img2 from "/src/assets/anh2.png";
// import img3 from "/src/assets/anh3.png";
// import img4 from "/src/assets/anh4.png";
// import img5 from "/src/assets/anh5.png";
// import img6 from "/src/assets/anh6.png";
// import img7 from "/src/assets/anh7.png";
// import img8 from "/src/assets/anh8.png";
// import img9 from "/src/assets/anh9.png";
// import img10 from "/src/assets/anh10.png";
// import img11 from "/src/assets/anh11.png";
// import img12 from "/src/assets/anh12.png";

// const products = [
//   { id: 1, name: 'Combo 2 Tã quần GOO.N Mommy Kiss', price: '$19.99', section: 'Section 15', imgUrl: img1 },
//   { id: 2, name: 'Combo 2 Tã quần Molfix', price: '$29.99', section: 'Section 13', imgUrl: img2 },
//   { id: 3, name: 'Tã dán Merries', price: '$39.99', section: 'Section 15', imgUrl: img3 },
//   { id: 4, name: 'Tã dán Merries', price: '$49.99', section: 'Section 13', imgUrl: img4 },
//   { id: 5, name: 'Bình tritan lớn Diller BPA free 650ml', price: '$59.99', section: 'Section 15', imgUrl: img5 },
//   { id: 6, name: 'Khăn đa năng cho bé K126-7012', price: '$69.99', section: 'Section 13', imgUrl: img6 },
//   { id: 7, name: 'Nhiệt kế hồng ngoại AOJ-20A', price: '$79.99', section: 'Section 15', imgUrl: img7 },
//   { id: 8, name: 'Gối chống trào ngược ROTOTO BEBE', price: '$89.99', section: 'Section 13', imgUrl: img8 },
//   { id: 9, name: 'Yến Babi Bird', price: '$99.99', section: 'Section 15', imgUrl: img9 },
//   { id: 10, name: 'Combo 4 Sữa tươi tiệt trùng Oldenburger có đường 110ml', price: '$109.99', section: 'Section 13', imgUrl: img10 },
//   { id: 11, name: 'Combo 2 TUI NUOC YEN GENNEST 105ML 5%', price: '$119.99', section: 'Section 15', imgUrl: img11 },
//   { id: 12, name: 'Bỉm tã dán Elprairie AW', price: '$129.99', section: 'Section 13', imgUrl: img12 },
// ];

function ProductsList() {
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

  const GET_CATEGORY = gql`
    query Categories {
      categories {
        name
      }
    }
  `;

  const { data } = useQuery(GET_PRODUCT);
  const { searchUrl } = useParams();
  const searchValue = (searchUrl || "").toLowerCase();
  const products = data.products;
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setProductCategory(category);
  };
  const handlePriceChange = (event) => {
    const price = event.target.value;
    setProductPrice(price);
  };
  const filteredProducts = products.filter((product) => {
    const priceCondition =
      productPrice === "" || product.productPrice <= parseInt(productPrice, 10);
    const categoryCondition =
      productCategory === "" || product.category.name === productCategory;
    const searchCondition = data.products.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
    return priceCondition && categoryCondition && searchCondition;
  });
  useEffect(() => {
    console.log(productCategory);
  }, [productCategory]);

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORY);

  console.log(categoryData);

  if (categoryLoading) return <p>Loading</p>;
  if (categoryError) return <p>Error</p>;

  return (
    <div>
      <Header />
      <div className="product-list-page">
        <div className="sort-container">
          <label>Loại sản phẩm</label>
          <select name="category" onChange={handleCategoryChange}>
            <option value="">Tất cả</option>
            {categoryData.categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <label>Giá sản phẩm</label>
          <select name="category" onChange={handlePriceChange}>
            <option value=""></option>
            <option value="200000">Thấp hơn 200.000đ</option>
            <option value="500000">Thấp hơn 500.000đ</option>
            <option value="1000000">Thấp hơn 1.000.000đ</option>
            <option value="1500000">Thấp hơn 1.500.000đ</option>
            <option value="2000000">Thấp hơn 2.000.000đ</option>
            <option value="2500000">Thấp hơn 2.500.000đ</option>
            <option value="3000000">Thấp hơn 3.000.000đ</option>
          </select>
        </div>
        <div className="product-list-container">
          <div className="products">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/ProductDetail/${product.id}`}>
                  {/* <img src={img1} alt={product.name} /> */}
                  {product.productImage?.publicUrl && (
                    <img
                      src={product.productImage.publicUrl}
                      alt={product.name}
                    />
                  )}
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
