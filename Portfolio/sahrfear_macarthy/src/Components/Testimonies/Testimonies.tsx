import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiStarSFill } from "react-icons/ri";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import file from "../../Images/file.png";
// import required modules
import { Pagination } from "swiper/modules";
import "./Testimonies.css";
type Props = {
  id: string;
};
export default function Testimonies(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 testimony">
      {/* <div>Testimonies</div> */}

      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="container author_card">
            <img
              src={file}
              alt="electronic"
              style={{ width: "24px", height: "24px" }}
            />
            <div className="author_name">Dr. Satbir Singh Negi</div>
            <p>Title:DevOps Project Manager</p>
            <br />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <div className="description">
              Committed and Eager to Learn new Technologies.
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </section>
  );
}
