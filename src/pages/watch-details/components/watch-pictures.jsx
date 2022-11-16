import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

const WatchPictures = ({ pictures, title }) => {
  const [count, setCount] = useState(0);
  return (
    <section className="pictures">
      <div className="mini-title">{title}</div>
      <div className="text">
        In the world of luxury and art, black is all about elegance, nobility
        and serenity.
      </div>
      <div className="photo-controller">
        <div
          className="left-arrow"
          onClick={() =>
            setCount((prev) => (count < pictures?.length + 1 ? prev + 1 : 0))
          }
        >
          <HiOutlineArrowNarrowRight />
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay
          navigation={{
            prevEl: ".left-arrow",
            nextEl: ".right-arrow",
            clickable: true,
          }}
          slidesPerView={1}
          onSlideNextTransitionStart={() =>
            setCount((prev) => (count < pictures?.length ? prev + 1 : 1))
          }
          onSlidePrevTransitionStart={() =>
            setCount((prev) => (count === 1 ? pictures.length : prev - 1))
          }
          loop
        >
          {pictures.map((picture, key) => {
            const { image_name } = picture;
            return (
              <SwiperSlide key={key}>
                <img
                  src={`${process.env.REACT_APP_BASE_API_URL}Product/images/${image_name}`}
                  alt="img"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="right-arrow">
          <HiOutlineArrowNarrowRight />
        </div>
        <div className="count">
          {count} / {pictures?.length}
        </div>
      </div>
    </section>
  );
};

export default WatchPictures;
