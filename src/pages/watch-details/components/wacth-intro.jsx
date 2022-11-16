import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/context";

const WatchIntro = ({ product }) => {
  const {
    image_name,
    back_image_name,
    name,
    id,
    category,
    price,
    description,
    details,
  } = product;
  const { setProducts, products } = useGlobalContext();
  let navigate = useNavigate();

  const addToCart = () => {
    const product = {
      id: id,
      name: name,
      image: image_name,
      price: price,
      count: 1,
    };
    const myProduct = products.find((product) => product.id === id);
    if (myProduct) {
      myProduct.count = myProduct.count + 1;
      setProducts([...products]);
    } else {
      setProducts([...products, product]);
    }
    navigate("/cart");
  };
  return (
    <section className="intro-for-watch">
      <div className="top">
        <div className="watch-title">{name}</div>
        <div onClick={addToCart} className="btn-showing">
          <div className="btn-prm ">
            Buy now
            <div className="arrow-right">
              <HiOutlineArrowNarrowRight />
            </div>
          </div>
        </div>
        <div className="img">
          <img
            src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${back_image_name}`}
            alt="img"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${image_name}`}
            alt="img"
          />
          <div className="price">{price} £</div>
        </div>
        <div className="right">
          <div className="category-title"> Collection {category?.name}</div>
          <div className="watch-title">{name}</div>
          <div className="descrption">{description}</div>
          <div className="detail">{details}</div>
          <div className="descrption-detail">
            All parts of this model have found buyers. The next delivery is
            scheduled for the end of May 2023
          </div>
          <div onClick={addToCart} className="buy-btn">
            <div className="text">Buy now</div>
            <div className="arrow">
              <HiOutlineArrowNarrowRight />
            </div>
          </div>
        </div>
      </div>
      <div className="end">
        <div className="srvc">24 month warranty</div>
        <div className="srvc">Delivery and return offered</div>
        <div className="srvc">Try at home</div>
        <div className="srvc">Payment in 3x free of charge</div>
      </div>
    </section>
  );
};

export default WatchIntro;
