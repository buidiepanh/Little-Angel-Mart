import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./content.scss";
import Carousel from "../carousel/carousel";
import Header from "../header/Header";
import Footer from "../footer/footer";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Content() {
  return (
    <div className="content">
      <Header/>
      <Carousel/>
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
        <div className="top">
        <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>

          <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>

          <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>

          <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>
        </div>
        <div className="bot">
        <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>

          <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>

          <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>

          <Link to='/ProductDetail' className="LinkProductDetail" style={{textDecoration:'none', color:'black'}}>
          <Card style={{ width: '18rem', 
                        border:  '1.5px solid rgb(195, 193, 193)',
                        padding: '5px 7px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column'
             }}>
          <Card.Img variant="top" src="src/image\content\milk.jpg" />
          <Card.Body>
            <Card.Title>Sữa bột</Card.Title>
            <Card.Text>
              <div className="price">200.000đ</div>
            </Card.Text>
          <Button variant="primary" className='goToCartBtn' style={{width:'50%' }}>Thêm vào giỏ hàng</Button>
          </Card.Body>
          </Card>
          </Link>
        </div>
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
        <Footer/>
    </div>
  );
}

export default Content;
