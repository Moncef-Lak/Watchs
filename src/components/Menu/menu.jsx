import React, { useRef, useState, useEffect } from "react";
import "./menu.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { Power3, TimelineLite } from "gsap";

function Menu({ isOpen }) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [trend, settrend] = useState([]);
  const { apiPassword } = useGlobalContext();
  let parent = useRef(null);

  useEffect(() => {
    const data = new FormData();
    data.append("api_password", apiPassword);
    try {
      axios
        .post(process.env.REACT_APP_BASE_API_URL + "api/getProductsMenu", data)
        .then((data) => {
          if (data.data.status) {
            setProducts(data.data.data.products);
            settrend(data.data.data.trend);
          } else {
            setProducts([]);
            settrend();
          }
        });
    } catch (e) {
      console.log("Error");
    }
  }, [apiPassword]);

  useEffect(() => {
    let tl = new TimelineLite();

    if (parent) {
      const [children_1, children_2] = parent.children;
      const [children_1_1, children_1_2, children_1_3, children_1_4] =
        children_1.children;
      const [children_2_1, children_2_2] = children_2.children;

      if (isOpen) {
        setTimeout(() => {
          tl.to(children_1, 1.3, {
            opacity: 1,
            xPercent: 0,
            ease: Power3.easeInOut,
            background: "var(--color-dark-black-5)",
          })
            .to(
              children_2,
              1.3,
              { opacity: 1, xPercent: 0, ease: Power3.easeInOut },
              0.5
            )
            .to(
              children_1_1,
              1.3,
              { opacity: 1, yPercent: 0, ease: Power3.easeOut },
              1
            )
            .to(
              children_1_2,
              1.3,
              { opacity: 1, yPercent: 0, ease: Power3.easeOut },
              1.25
            )
            .to(
              children_1_3,
              1.3,
              { opacity: 1, yPercent: 0, ease: Power3.easeOut },
              1.5
            )
            .to(
              children_1_4,
              1.3,
              { opacity: 1, yPercent: 0, ease: Power3.easeOut },
              1.75
            )
            .to(
              children_2_1,
              1.3,
              { opacity: 1, yPercent: 0, ease: Power3.easeOut },
              1.75
            )
            .to(
              children_2_2,
              1.3,
              { opacity: 1, yPercent: 0, ease: Power3.easeOut },
              2
            );
        }, 500);
      } else {
        setTimeout(() => {
          tl.to(children_1, 1.3, {
            opacity: 0,
            xPercent: 100,
            ease: Power3.easeInOut,
            background: "var(--color-dark-black-1)",
          })
            .to(
              children_2,
              1.3,
              { opacity: 0, xPercent: -100, ease: Power3.easeInOut },
              0.5
            )
            .to(
              children_1_1,
              1.3,
              { opacity: 0, yPercent: 100, ease: Power3.easeOut },
              1
            )
            .to(
              children_1_2,
              1.3,
              { opacity: 0, yPercent: 100, ease: Power3.easeOut },
              1.25
            )
            .to(
              children_1_3,
              1.3,
              { opacity: 0, yPercent: 100, ease: Power3.easeOut },
              1.5
            )
            .to(
              children_1_4,
              1.3,
              { opacity: 0, yPercent: 100, ease: Power3.easeOut },
              1.75
            )
            .to(
              children_2_1,
              1.3,
              { opacity: 0, yPercent: -100, ease: Power3.easeOut },
              1.75
            )
            .to(
              children_2_2,
              1.3,
              { opacity: 0, yPercent: -100, ease: Power3.easeOut },
              2.25
            );
        }, 500);
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={(e) => (parent = e)}
      className={`menu-page ${isOpen && "menu-page-open"}`}
    >
      <div className="all-titles">
        <div className="service-client">
          <div className="title">Customer service</div>
          <NavLink to="/advice" className="service">
            Advice & maintenance
          </NavLink>
          <NavLink to="/Privacy-Policy" className="service">
            Privacy Policy
          </NavLink>
          <NavLink to="/terms" className="service">
            Terms of Sales
          </NavLink>
        </div>
        <Link
          to={`${trend ? `/details/${trend.id}` : "/"}`}
          className="best-watch-saller"
        >
          {trend && (
            <>
              <div className="title">Trend</div>
              <div className="watch-title">{trend?.name}</div>
              <div className="img">
                {trend?.image_name && (
                  <img
                    src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${trend?.image_name}`}
                    alt="img"
                  />
                )}
              </div>
            </>
          )}
        </Link>
        <div className="multi-contact">
          <div className="contact-box">
            <div className="title">By videoconference</div>
            <NavLink to="/meeting" className="lien">
              On appointment
            </NavLink>
          </div>
          <div className="contact-box">
            <div className="title">By phone</div>
            <a href="tel:+213656711226" className="lien">
              +213 6 56 71 12 26
            </a>
          </div>
          <div className="contact-box">
            <div className="title">Over a coffee</div>
            <a
              href="https://www.google.com/maps/place/Alger
            /@36.7386901,2.8591443,10z/data=!3m1!4b1!4m5!3m4!
            1s0x128fb26977ea659f:0x4231102d38a36f49!8m2!3
            d36.753768!4d3.0587561"
              className="lien"
            >
              Alger Algeria route 58...{" "}
            </a>
          </div>
        </div>
        <div className="to-store">
          <NavLink to="/store" className="title">
            All watchs
          </NavLink>
        </div>
      </div>

      <div className="menu-watchs">
        <div className="controller">
          <NavLink to="/store" className="title">
            All watchs
          </NavLink>
          <div className="arrows">
            <div className="left-arrow" ref={navigationPrevRef}>
              <HiOutlineArrowNarrowRight />
            </div>
            <div className="right-arrow" ref={navigationNextRef}>
              <HiOutlineArrowNarrowRight />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={2}
          modules={[Navigation]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          loop
        >
          {products.map((product, key) => {
            const { id, name, image_name, category } = product;
            return (
              <SwiperSlide key={key}>
                <Link to={`/details/${id}`}>
                  <div className="watch">
                    <div className="left">
                      <img
                        src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${image_name}`}
                        alt="img"
                      />
                    </div>
                    <div className="right">
                      <div className="category">{category?.name}</div>
                      <div className="title">{name}</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Menu;
