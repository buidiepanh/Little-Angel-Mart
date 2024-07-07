import { RightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./content.scss";
import Carousel from "../carousel/carousel";
import Header from "../header/Header";
import Footer from "../footer/footer";
import { useQuery, gql } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { formatMoney } from "../../utils/formatMoney";
import { GET_PRODUCTS } from "../../page/Queries/product";
import { GET_POSTS } from "../../page/Queries/post";

//Defined new component use styled
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2, //apply all font from theme
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary, //apply secondary color from theme
}));

function Content() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.fromLogin) {
      toast.success("Đăng nhập thành công!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  }, [location.state]);

  //Start: Save data into variables
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCTS, {
    variables: { take: 8 },
  });

  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(GET_POSTS, {
    variables: { take: 3 },
  });
  //End: Save data into variables

  const { pathname, hash } = location;

  useEffect(() => {
    if (hash === "#articles") {
      const element = document.getElementById("articles-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  //Handle situation
  if (productLoading || postLoading) return <p>Loading</p>;
  if (productError || postError) return <p>Error</p>;

  console.log(productData);
  console.log(postData);

  return (
    <div className="content">
      <Header />
      <Carousel />
      <div className="content__about">
        <div className="intro">
          <h3>Về Little Angel Milk</h3>
          <span>
            Chuỗi cửa hàng đồ dùng mẹ và bé được <br />
            thành lập bởi Tập đoàn Thế Giới Di Động <br />
            vào năm 2022.
          </span>
          <div className="intro__but">
            <Link to="/about">
              <button>Xem thêm</button>
            </Link>
            <div className="icon">
              <RightOutlined />
            </div>
          </div>
        </div>
        <img src="src/image\content\milk.jpg" alt="Little Angel Milk"></img>
      </div>
      <div className="content__foryou">
        <h3>Dành cho bạn</h3>

        {/* Start: Render data of product into view */}
        <Grid container spacing={2}>
          {/* productData: have data and have key in product */}
          {productData &&
            productData.products.map((product) => (
              <Grid key={product.id} item xs={3}>
                <Item>
                  <Link to={`/ProductDetail/${product.id}`}>
                    <div className="product">
                      {product.productImage?.publicUrl && (
                        <img
                          src={product.productImage.publicUrl}
                          alt={product.name}
                        />
                      )}
                      <div className="product__info">
                        <h4>{product.name}</h4>
                        <div>{formatMoney(product.productPrice)}</div>
                        <button>Xem thêm</button>
                      </div>
                    </div>
                  </Link>
                </Item>
              </Grid>
            ))}
        </Grid>
        {/* End: Render data of product into view */}

        <div id="articles-section" className="content__articles"></div>
        <div className="xemthem">
          <Link to="/product-list">
            <button>Xem thêm</button>
          </Link>
          <div className="icon">
            <RightOutlined />
          </div>
        </div>
      </div>

      <div className="content__article">
        <div className="title">
          <h3>Các bài viết mới</h3>
          <Link to="/posts">Xem thêm</Link>
        </div>

        <div className="content__articles">
          {/* Start: Render data of post into view */}
          <Grid container spacing={2}>
            {postData &&
              postData.posts.map((post) => {
                const link = post.link?.document?.[0]?.children?.find(
                  (child) => child.href
                )?.href;
                return (
                  <Grid key={post.id} item xs={4}>
                    <Item>
                      {link ? (
                        <a
                          href={link}
                          target="_blank" //open in new tab
                          rel="noopener noreferrer"
                        >
                          <div className="article">
                            {post.image?.publicUrl && (
                              <img
                                src={post.image.publicUrl}
                                alt={post.title}
                              />
                            )}
                            <div className="article__info">
                              <h4>{post.title}</h4>
                              <div>{post.content}</div>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <div className="article">
                          {post.image?.publicUrl && (
                            <img src={post.image.publicUrl} alt={post.title} />
                          )}
                          <div className="article__info">
                            <h4>{post.title}</h4>
                            <div>{post.content}</div>
                          </div>
                        </div>
                      )}
                    </Item>
                  </Grid>
                );
              })}
          </Grid>
          {/* End: Render data of post into view */}
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Footer />
    </div>
  );
}

export default Content;
