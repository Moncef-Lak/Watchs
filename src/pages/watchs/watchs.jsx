import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./watchs.css";
import gsap, { TweenMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Watchs = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let all = useRef(null);

  useEffect(() => {
    document.title = "STORE";
    const data = new FormData();
    data.append("api_password", process.env.REACT_APP_API_PASSWORD);
    try {
      axios
        .post(process.env.REACT_APP_BASE_API_URL + "api/getAllProducts", data)
        .then((data) => {
          if (data.data.status) {
            setCategories(data.data.categories);
            setIsLoading(false);
          } else {
            setCategories([]);
          }
        });
    } catch (e) {
      console.log("Error");
    }
  }, []);

  // animation function -------------------
  useEffect(() => {
    if (categories.length > 0 && all) {
      // for (let i = 0; i < all.children.length; i++) {
      //   console.log(all.children);
      // }
      const allWatchs = [];
      for (let i = 0; i < all.children.length; i++) {
        if (i % 2 !== 0) {
          for (
            let j = 0;
            j < all.children[i].children[1].children.length;
            j++
          ) {
            allWatchs.push(all.children[i].children[1].children[j]);
          }
        }
      }

      if (allWatchs.length > 0) {
        for (let i = 0; i < allWatchs.length; i++) {
          const backImg = allWatchs[i];
          TweenMax.from(backImg, 1, {
            y: 200,
            opacity: 0,
            scrollTrigger: {
              trigger: backImg,
              start: "-100px bottom",
              toggleActions: "play null null reverse",
            },
          });
        }
      }
    }
  }, [categories]);

  return (
    <section className="watchs" ref={(e) => (all = e)}>
      {isLoading ? (
        <div className="for-loading">
          <svg className="loader" viewBox="0 0 100 100">
            <g className="points">
              <circle
                cx="50"
                cy="50"
                r="50"
                fill="#fff"
                className="ciw"
              ></circle>
              <circle cx="5" cy="50" r="4" className="ci2"></circle>
              <circle cx="95" cy="50" r="4" className="ci1"></circle>
            </g>
          </svg>
        </div>
      ) : (
        <>
          <div className="mini-title">The Watchs</div>
          {categories?.map((category, key) => {
            const { name, description, products } = category;
            return (
              <React.Fragment key={key}>
                <div className="series-box">
                  <div className="category-title">{name}</div>
                  <div className="all-watchs">
                    {products?.map((product, key) => {
                      const { id, name, price, image_name, back_image_name } =
                        product;
                      return (
                        <Link
                          to={`/details/${id}`}
                          key={key}
                          className="watch-box"
                        >
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
                      );
                    })}
                  </div>
                </div>
                <div className="end-text">{description}</div>
              </React.Fragment>
            );
          })}
        </>
      )}
    </section>
  );
};

export default Watchs;
