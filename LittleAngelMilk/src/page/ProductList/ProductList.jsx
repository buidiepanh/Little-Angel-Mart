import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import { GET_PRODUCTS } from "../Queries/product";
import { GET_CATEGORYS } from "../Queries/category";
import { setSearchResults } from "../../store/searchProduct/searchSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import "./ProductList.css";

function ProductsList() {
  const { data } = useQuery(GET_PRODUCTS);

  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const { searchResults } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.products && searchResults.length === 0) {
      dispatch(setSearchResults([]));
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

  const priceOptions = [
    { value: "", label: "Tất cả" },
    { value: "200000", label: "Thấp hơn 200.000đ" },
    { value: "500000", label: "Thấp hơn 500.000đ" },
    { value: "1000000", label: "Thấp hơn 1.000.000đ" },
    { value: "1500000", label: "Thấp hơn 1.500.000đ" },
    { value: "2000000", label: "Thấp hơn 2.000.000đ" },
    { value: "2500000", label: "Thấp hơn 2.500.000đ" },
    { value: "3000000", label: "Thấp hơn 3.000.000đ" },
  ];

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

  if (categoryLoading) return <p>Loading</p>;
  if (categoryError) return <p>Error</p>;

  return (
    <div>
      <Header />
      <div className="product-list-page">
        <Box className="sort-container" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Loại sản phẩm</InputLabel>
            <Select
              value={productCategory}
              label="Loại sản phẩm"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categoryData.categories.map((category, index) => (
                <MenuItem key={index} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Giá sản phẩm</InputLabel>
            <Select
              value={productPrice}
              label="Giá sản phẩm"
              onChange={handlePriceChange}
            >
              {priceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.productPrice}</div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="no-products-message">Không tìm thấy sản phẩm.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsList;
