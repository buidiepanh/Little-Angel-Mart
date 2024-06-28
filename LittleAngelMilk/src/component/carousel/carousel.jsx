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
        <img src="src/image\carousel_images\banner1.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\banner2.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\banner3.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\banner4.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\banner5.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="src/image\carousel_images\banner6.jpg"></img>
      </SwiperSlide>
    </Swiper>
  );
}

export default Carousel;
