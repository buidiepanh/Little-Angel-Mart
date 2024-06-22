import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./content.scss";
import Carousel from "../carousel/carousel";
import Header from "../header/Header";
import Footer from "../footer/footer";
import { useQuery, useMutation, gql } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

const GET_POST = gql`
  query Query {
    posts {
      id
      title
      image {
        publicUrl
      }
      link {
        document
      }
      content
    }
  }
`;

function Content() {
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCT);
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(GET_POST);

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
          <Link to="/about"><button>Xem thêm</button></Link>
            <div className="icon">
              <RightOutlined />
            </div>
          </div>
        </div>
        <img src="src/image\content\milk.jpg"></img>
      </div>
      <div className="content__foryou">
        <h3>Dành cho bạn</h3>
        <div className="navbar">
          <a href="#">Sữa cho bé</a>
          <a href="#">Đồ chơi cho bé</a>
          <a href="#">Quần áo cho bé</a>
          <a href="#">Vệ sinh cho bé</a>
          <a href="#">Dụng cụ cho bé</a>
        </div>
        <Grid container spacing={2}>
          {productData &&
            productData.products.map((product) => (
              <Grid key={product.id} item xs={3}>
                <Item>
                  <Link to={`/ProductDetail/${product.id}`}>
                    <div className="product">
                      <img src="src\image\binhsua.jpg" alt={product.name} />
                      {/* <img
                        src={product.productImage.publicUrl}
                        alt={product.name}
                      /> */}
                      <div className="product__info">
                        <h4>{product.name}</h4>
                        <div className="price">{product.productPrice}đ</div>
                        <button>Xem thêm</button>
                      </div>
                    </div>
                  </Link>
                </Item>
              </Grid>
            ))}
        </Grid>
        <div className="xemthem">
          <Link to="/product-list"><button>Xem thêm</button></Link>
            
          <div className="icon">
            <RightOutlined />
          </div>
        </div>
      </div>
      <div className="content__article">
        <div className="title">
          <h3>Các bài viết mới</h3>
          <a href="#">Xem thêm</a>
        </div>
        <div className="content__articles">
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
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="article">
                            <img src="src/image\content\article.jpg" alt="" />
                            {/* <img src={post.image.publicUrl} alt={post.title} /> */}
                            <div className="article__info">
                              <h4>{post.title}</h4>
                              <div>{post.content}</div>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <div className="article">
                          <img src="src/image\content\article.jpg" alt="" />
                          {/* <img src={post.image.publicUrl} alt={post.title} /> */}
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

          {/* <div className="article">
            <img src="src/image\content\article.jpg" alt="" />
            <div className="article__info">
              <h4>
                Sữa Hàn Quốc cho bé loại nào tốt? Mách mẹ địa chỉ mua sữa bột
                Hàn Quốc uy tín
              </h4>
              <div>
                Trên thị trường hiện nay, bên cạnh nhiều dòng sữa bột trẻ em đến
                từ các cường quốc hàng đầu về dinh dưỡng như Mỹ, Đức, Anh, Nhật
                Bản,…
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Content;