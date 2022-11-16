import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "./cart.css";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

const Cart = () => {
  const { products, setProducts, total } = useGlobalContext();
  const [done, setDone] = useState(false);

  // drop fucntion
  const dropProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // +++++++
  const next = (id) => {
    const myProduct = products.find((product) => product.id === id);
    if (myProduct) {
      if (myProduct.count < 5) {
        myProduct.count = myProduct.count + 1;
      }
      setProducts([...products]);
    }
  };

  // -------
  const prev = (id) => {
    const myProduct = products.find((product) => product.id === id);
    if (myProduct) {
      if (myProduct.count > 1) {
        myProduct.count = myProduct.count - 1;
        setProducts([...products]);
      } else {
        dropProduct(id);
      }
    }
  };

  useEffect(() => {
    document.title = "CART";
  }, []);
  return (
    <section className="cart">
      <div className="title">My Cart</div>

      {products?.length > 0 && !done ? (
        <div className="table">
          <table>
            <tbody>
              <tr className="types">
                <th className="img"></th>
                <th className="Produit">Product</th>
                <th className="Prix">Price</th>
                <th className="Quantité"> Quantity</th>
                <th className="Sous-total">Subtotal</th>
                <th className="drop"></th>
              </tr>
              {products.map((product, key) => {
                const { id, name, price, image, count } = product;
                return (
                  <tr key={key} className="watch-box">
                    <td className="img">
                      <NavLink to={`/details/${id}`}>
                        <img
                          src={`${process.env.REACT_APP_BASE_API_URL}Product/watchs/${image}`}
                          alt="img"
                        />
                      </NavLink>
                    </td>
                    <td to="/details" className="Produit">
                      {name}
                    </td>
                    <td className="Prix">{price} £</td>
                    <td className="Quantité">
                      <div className="top-arrow" onClick={() => prev(id)}>
                        <HiOutlineArrowNarrowRight />
                      </div>
                      <div className="count">{count}</div>
                      <div className="bottom-arrow" onClick={() => next(id)}>
                        <HiOutlineArrowNarrowRight />
                      </div>
                    </td>
                    <td className="Sous-total">{count * price} £</td>
                    <td className="drop" onClick={() => dropProduct(id)}>
                      X
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="promo-form">
            <div className="left">
              <input type="text" placeholder="Coupon code" />
            </div>
            <div className="right">
              <div className="btn-prm">
                Applied the Coupon code
                <div className="arrow-right">
                  <HiOutlineArrowNarrowRight />
                </div>
              </div>
            </div>
          </div>
          <div className="total">
            <div className="left">Total</div>
            <div className="right">{total} €</div>
          </div>
          <div
            className="valid-btn"
            onClick={() => {
              setDone(true);
              window.scrollTo(0, 0);
            }}
          >
            Validate the order
          </div>
        </div>
      ) : (
        <>
          <div className="empty">
            {!done
              ? "Your cart is currently empty."
              : "Sorry, we weren't able to complete your payment this time. Please try again later."}
          </div>
          <NavLink to={"/store"} className="btn-prm">
            Return to shop
            <div className="arrow-right">
              <HiOutlineArrowNarrowRight />
            </div>
          </NavLink>
        </>
      )}
    </section>
  );
};

export default Cart;
