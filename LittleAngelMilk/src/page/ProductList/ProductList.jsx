import { useEffect, useState } from "react";
import "./ProductList.css";
import { useQuery, gql } from "@apollo/client";
import img1 from "/src/assets/anh1.png";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";

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
  const products = data?.products || []; //Prevent lost data when refresh
  console.log(products);
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

  // console.log(categoryData);

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
      <Footer />
    </div>
  );
}

export default ProductsList;
