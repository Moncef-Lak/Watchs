import React, { useState, useEffect, useRef } from "react";

import { MdOutlineSwipe } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../../context/context";
import gsap, { TweenMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Showing() {
  const [products, setProducts] = useState([]);
  const [touStart, setTouStart] = useState(false);
  const { apiPassword } = useGlobalContext();
  let box = useRef(null);

  // get products function -----------------
  useEffect(() => {
    const data = new FormData();
    data.append("api_password", apiPassword);
    try {
      axios
        .post(
          process.env.REACT_APP_BASE_API_URL + "api/getProductsFirstPage",
          data
        )
        .then((data) => {
          if (data.data.status) {
            setProducts(data.data.products);
          } else {
            setProducts([]);
          }
        });
    } catch (e) {
      console.log("Error");
    }
  }, [apiPassword]);
  // --------------------------------------

  // animation function -------------------
  useEffect(() => {
    box &&
      TweenMax.from(box.children[0], 1, {
        xPercent: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: box.children[0],
          start: "center bottom",
          toggleActions: "play null null reverse",
        },
      });
    box &&
      TweenMax.from(box.children[1], 1, {
        xPercent: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: box.children[1],
          start: "center bottom",
          toggleActions: "play null null reverse",
        },
      });
  }, []);
  // --------------------------------------

  return (
    <>
      {products ? (
        <section className="showing" ref={(e) => (box = e)}>
          <div className="left-side-intro">
            <div className="title">Clean</div>
            <div className="text">
              The two founders of LM, the designer Didier Finck and the
              physicist Ludovic Zussa choose to return to the purity of high-end
              watches. Sober and exclusive design, chiselled materials to play
              with light, automatic movement serving a single function, unique
              format for women and men, direct relationship with the founders,
              exclusive online sales... all expressions of purity are mobilized
              to create exceptional objects highest value for money.
            </div>
          </div>
          <div className="right-side">
            <div className={`swip-hand ${touStart && "stop"}`}>
              <MdOutlineSwipe />
            </div>
            <Swiper
              modules={[Navigation]}
              navigation
              loop
              onTouchStart={() => setTouStart(true)}
            >
              {products.map((product, key) => {
                const { image_name, name, id, category } = product;
                return (
                  <SwiperSlide key={key}>
                    <Link to={`/details/${id}`}>
                      <div className="category-title">Collection</div>
                      <div className="watch-box">
                        <img
                          src={
                            process.env.REACT_APP_BASE_API_URL +
                            `Product/watchs/${image_name}`
                          }
                          alt="img"
                        />
                        <div className="title">
                          {category.name.substring(0, 7)}
                        </div>
                        <div className="details">{name}</div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default Showing;
