import React, { } from "react";
import { useGlobalContext } from "../../../context/context";
import './dashboard.css';
const Dashboard = () => {
  const {user,logOut}=useGlobalContext();
  return (
    <section className="dashboard">
      <header>
        Hello {user?.name} (not {user?.name}? <span style={{cursor:'pointer'}} onClick={logOut}>Logout</span> )
      </header>
      <footer>
        From your account dashboard,
        you can view your recent orders,
        favorite products,
        manage your shipping and billing
        addresses as well as change your password and account details.
      </footer>
    </section>
  );
}

export default Dashboard;
