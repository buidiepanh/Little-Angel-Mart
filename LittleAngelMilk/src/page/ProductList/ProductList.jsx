import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProductList.css";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import { GET_PRODUCTS } from "../Queries/product";
import { GET_CATEGORYS } from "../Queries/category";
import { setSearchResults } from "../../store/searchProduct/searchSlice";

function ProductsList() {
  const { data } = useQuery(GET_PRODUCTS);

  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");

  //get search value and results from redux
  const { searchResults, searchTerm } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.products && searchResults.length === 0) {
      dispatch(setSearchResults([])); //if searchResult = 0, setSearchResult = [] in order to display: "No product found!"
    }
  }, [data, dispatch, searchResults.length]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setProductCategory(category);
  };
  const handlePriceChange = (event) => {
    const price = event.target.value;
    setProductPrice(price);
  };
  const filteredProducts = searchResults?.filter((product) => {
    const priceCondition =
      productPrice === "" || product.productPrice <= parseInt(productPrice, 10);
    const categoryCondition =
      productCategory === "" || product.category.name === productCategory;
    return priceCondition && categoryCondition;
  });

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORYS);

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
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/ProductDetail/${product.id}`}>
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
              ))
            ) : (
              <p>Không tìm thấy sản phẩm.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsList;
