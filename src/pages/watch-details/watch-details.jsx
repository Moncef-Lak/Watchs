import React, { useEffect, useState } from "react";
import "./watch-details.css";
import {
  WatchIntro as Part1,
  WatchPictures as Part2,
  WatchsSameCatergory as Part3,
} from "./components/imp-exp-all";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MoreWacths from "../../components/more-watchs/morWacths";
import { useGlobalContext } from "../../context/context";

const WatchDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sameCategory, setSameCategory] = useState(null);
  const [pictures, setPictures] = useState(null);
  const { apiPassword } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (product) {
      const top = document.querySelector(
        ".watch-details .intro-for-watch .top"
      );
      top.style.height = window.innerHeight - 111 + "px";
    }
  }, [product]);

  useEffect(() => {
    const data = new FormData();
    data.append("api_password", apiPassword);
    data.append("id", id);
    try {
      axios
        .post(
          process.env.REACT_APP_BASE_API_URL + "api/getProductDetails",
          data
        )
        .then((data) => {
          if (data.data.status) {
            setIsLoading(false);
            setProduct(data.data.data.product);
            setSameCategory(data.data.data.sameCategory);
            setPictures(data.data.data.product.images);
            document.title = data.data.data.product.name;
          } else {
            navigate("/");
          }
        });
    } catch (e) {
      navigate("/");
    }
  }, [id, apiPassword, navigate]);

  return (
    <section className="watch-details">
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
          {product && <Part1 product={product} />}
          {product && pictures && (
            <Part2 pictures={pictures} title={product?.name} />
          )}
          {product && sameCategory?.length > 3 && (
            <Part3
              sameCategory={sameCategory}
              category={product?.category?.name}
            />
          )}
          {product && <MoreWacths id={id} />}
        </>
      )}
    </section>
  );
};

export default WatchDetails;
