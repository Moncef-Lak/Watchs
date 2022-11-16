import React, {  } from "react";
import { Link, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/context";
import './orders.css';

const Orders = () => {
  const {count}=useGlobalContext();
  return (
    count===0 ?
      <section className="orders">
        <div className="empty" >
          <p>No orders have been placed yet.</p>
          <Link to={'/store'}>Browse Products</Link>
        </div >
      </section >
      :
      <Navigate to='/cart' replace />
  );
}

export default Orders;
