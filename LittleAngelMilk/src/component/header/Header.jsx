import { useState, useEffect, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { useQuery, gql } from "@apollo/client";
import "./Header.css";
import logo from '/src/assets/raw_logo.png';

export const ProductContext = createContext();
const Header = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const user = localStorage.getItem("userName");
    if (token && user) {
      setUsername(user);
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("cartItems");
    setUsername("");
    navigate("/login");
  };

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

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

  const { data } = useQuery(GET_PRODUCT);

  const handleSearch = () => {
    const availableProducts = data.products.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
    setProductList(availableProducts);
  };
  useEffect(() => {
    console.log(productList);
  }, [productList]);

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
            placeholder="Search..."
            onChange={handleSearchValue}
          />
          <div className="SearchBtn">
            <Link to={`/product-list/:${productList}`}>
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
                <Link to="/cart">
                  <FaShoppingCart className="CartCircle" />
                </Link>
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
                  <Link to="/settings">Tùy chỉnh</Link>
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
          <Link to="/products" className="productNav">
            Sản phẩm <FaAngleDown />
          </Link>
          <div className="dropdown-content">
            <div>
              <Link to="/product1">Sản phẩm 1</Link>
              <Link to="/product2">Sản phẩm 2</Link>
              <Link to="/product3">Sản phẩm 3</Link>
            </div>
          </div>
        </div>
        <Link to="/#articles">Bài viết</Link>
        <Link to="/voucher">Voucher</Link>
      </div>
    </div>
  );
};

export default Header;
