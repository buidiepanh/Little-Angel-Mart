import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../page/Queries/product";
import "./Header.css";
import logo from "/src/assets/raw_logo.png";
import { useDispatch } from "react-redux";
import {
  setSearchResults,
  setSearchTerm,
} from "../../store/searchProduct/searchSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const user = localStorage.getItem("userName");
    if (token && user) {
      setUsername(user);
    }

    // Event listener to clear localStorage on page close
    // const handleBeforeUnload = () => {
    //   localStorage.removeItem("cartId");
    //   localStorage.removeItem("cartItemId");
    // };
    // window.addEventListener("beforeunload", handleBeforeUnload);

    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userPhoneNumber");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartId"); // Remove cartId
    localStorage.removeItem("cartItemId"); // Remove cartItemId
    setUsername("");
    navigate("/login");
  };

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
    dispatch(setSearchTerm(searchValue));
  };

  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (data && !loading && !error) {
      const availableProducts = data.products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      dispatch(setSearchResults(availableProducts));
    }
  }, [data, searchValue, loading, error, dispatch]);

  const handleSearch = () => {
    if (data && !loading && !error) {
      const availableProducts = data.products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      dispatch(setSearchTerm(searchValue));
      dispatch(setSearchResults(availableProducts));
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="Header">
      <div className="FirstLayer">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
            <p className="Title">
              Little <span className="Angel">Angel</span> Milk
            </p>
          </Link>
        </div>

        <div className="SearchBar">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            onChange={handleSearchValue}
          />
          <div className="SearchBtn">
            <Link to={"/product-list"}>
              <FaMagnifyingGlass
                className="SearchCircle"
                onClick={handleSearch}
              />
            </Link>
          </div>
        </div>
        <div className="FirstLayerRight">
          <div className="OrderListBtn">
            <div>
              {username ? (
                <Link to="/order-detail">
                  <BsCartCheck className="UserCircle" />
                </Link>
              ) : (
                <Link to="/login">
                  <BsCartCheck className="UserCircle" />
                </Link>
              )}
            </div>
            <div className="btnDesc">Đơn hàng</div>
          </div>

          <div className="CartBtn">
            <div>
              {username ? (
                <FaShoppingCart
                  className="CartCircle"
                  onClick={handleCartClick}
                />
              ) : (
                <Link to="/login">
                  <FaShoppingCart className="CartCircle" />
                </Link>
              )}
            </div>
            <div className="btnDesc">Giỏ hàng</div>
          </div>

          {username ? (
            <div className="LoginBtn">
              <div onClick={toggleMenu} className="user-info">
                <FaRegUserCircle className="UserCircle" />
                <span>{username}</span>
              </div>
              {menuVisible && (
                <div className="dropdown-menu">
                  <Link to="/profile">Tài khoản</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div className="LoginBtn">
              <div>
                <Link to="/login">
                  <FaRegUserCircle className="UserCircle" />
                </Link>
              </div>
              <div className="btnDesc">Đăng nhập</div>
            </div>
          )}
        </div>
      </div>
      <div className="mainNavs">
        <Link to="/">Trang chủ</Link>
        <div className="dropdown">
          <Link to="/product-list" className="productNav">
            Sản phẩm
          </Link>
          <div className="dropdown-content"></div>
        </div>
        <Link to="/#articles">Bài viết</Link>
        <Link to="/about">Shop chúng tôi</Link>
      </div>
    </div>
  );
};

export default Header;
