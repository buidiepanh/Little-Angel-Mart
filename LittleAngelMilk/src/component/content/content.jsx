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

function Content() {
  const { data, loading, error } = useQuery(GET_PRODUCT);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;

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
            <button>Xem thêm</button>
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
          {data &&
            data.products.map((product) => (
              <Grid key={product.id} item xs={3}>
                <Item>
                  <Link to="/ProductDetail">
                    <div className="product">
                      <img
                        
                        alt={product.name}
                      />
                      <div className="product__info">
                        <h4>{product.name}</h4>
                        <div className="price">{product.productPrice}đ</div>
                        <button>Thêm vào giỏ hàng</button>
                      </div>
                    </div>
                  </Link>
                </Item>
              </Grid>
            ))}
        </Grid>
        <div className="xemthem">
          <button>Xem thêm</button>
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
          <div className="article">
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
          </div>
          <div className="article">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Content;
