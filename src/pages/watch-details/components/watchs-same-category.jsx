import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";

const WatchsSameCatergory = ({ sameCategory, category }) => {
  return (
    <section className="watchs-same-category">
      <div className="category-title"> {category}</div>
      <div className="all-watchs">
        <div className="left-arrow">
          <HiOutlineArrowNarrowRight />
        </div>
        <div className="watchs-slider">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".left-arrow",
              nextEl: ".right-arrow",
              clickable: true,
            }}
            slidesPerView={3}
            spaceBetween={50}
            loop
          >
            {sameCategory?.map((product, key) => {
              const { id, name, image_name, price, back_image_name } = product;

              return (
                <SwiperSlide key={key} className="watch-box">
                  <Link to={`/details/${id}`}>
                    <div className="title">{name}</div>
                    <img
                      src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${image_name}`}
                      alt="img"
                    />
                    <div className="price">{price}£</div>
                    <div className="back-img">
                      <img
                        src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${back_image_name}`}
                        alt="img"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="right-arrow">
          <HiOutlineArrowNarrowRight />
        </div>
      </div>
    </section>
  );
};

export default WatchsSameCatergory;
