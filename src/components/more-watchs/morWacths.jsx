import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./morWacths.css";
import { useGlobalContext } from "../../context/context";

const MoreWacths = ({ id = "null" }) => {
  const [products, setProducts] = useState([]);
  const { apiPassword } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = new FormData();
    data.append("api_password", apiPassword);
    data.append("id", id);
    try {
      axios
        .post(process.env.REACT_APP_BASE_API_URL + "api/getMoreProduct", data)
        .then((data) => {
          if (data.data.status) {
            setProducts(data.data.products);
            setIsLoading(false);
          } else {
            setProducts([]);
          }
        });
    } catch (e) {
      console.log("Error");
    }
    return () => setProducts((products) => [...products]);
  }, [id, apiPassword]);

  return (
    <section className="trend">
      <section className="more-watchs">
        <div className="category-title">The watches</div>
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
          <div className="all-watchs">
            <div className="watchs-slider">
              {products?.map((product, key) => {
                const { id, name, image_name, price } = product;
                return (
                  <Link to={`/details/${id}`} className="watch-box" key={key}>
                    <div className="title">{name}</div>
                    <img
                      src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${image_name}`}
                      alt="img"
                    />
                    <div className="price">{price}£</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default MoreWacths;
