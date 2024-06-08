import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import "./carousel.scss";

function Carousel() {
  return (
    <Swiper
      loop={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="carousel"
    >
      <SwiperSlide>
        <img src="src/image\carousel_images\img1.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\img2.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\img3.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\img4.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\img5.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\img6.jpg"></img>
      </SwiperSlide>
    </Swiper>
  );
}

export default Carousel;
