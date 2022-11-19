import React, { useEffect, useState } from "react";
import Header from "./components/header/header";
import {
  Index,
  Watchs,
  WatchDetails,
  Cart,
  Meeting,
  Contact,
  Account,
  Advice,
  Politics,
  Terms,
  Dashboard,
  Orders,
  Profile,
  Notification,
} from "./pages/imp-exp-all";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Foot from "./components/foot/foot";
import { useGlobalContext } from "./context/context";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useGlobalContext();
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  useEffect(() => {
    console.log(
      "%c Hello to LM Watch store ",
      "font-weight: bold; font-size: 50px;color:#555; text-shadow: 3px 3px 0 #444 , 6px 6px 0 #333 , 9px 9px 0 #222; margin-bottom: 12px; padding: 5%"
    );
    console.log(
      "%c moncef.lakehal@outlook.com",
      "font-weight: bold; font-size: 20px;background: linear-gradient(45deg,#bdc3c7,#2c3e50);color:#fff;margin: 1rem; padding: 3.5%"
    );
    console.log(
      "%c https://www.linkedin.com/in/moncef-lakehal-198020204/",
      "font-weight: bold; font-size: 20px;background: linear-gradient(45deg,#0a66c2,#ddd);color:#fff;margin: 1rem; padding: 3.5%"
    );
  }, []);
  return (
    <div
      className={`container ${isOpen && "hidden-scroll"}`}
      data-theme={theme}
    >
      <Router>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <Routes>
          <Route exacat path="/" element={<Index />} />
          <Route exacat path="/store" element={<Watchs />} />
          <Route exacat path="/details/:id" element={<WatchDetails />} />
          <Route exacat path="/cart" element={<Cart />} />
          <Route exacat path="/meeting" element={<Meeting />} />
          <Route exacat path="/contact" element={<Contact />} />

          <Route exacat path="/account" element={<Account />}>
            <Route path="" element={<Dashboard />} />
            <Route exacat path="orders" element={<Orders />} />
            <Route exacat path="details" element={<Profile />} />
            <Route exacat path="notification" element={<Notification />} />
          </Route>

          <Route exacat path="/advice" element={<Advice />} />
          <Route exacat path="/Privacy-Policy" element={<Politics />} />
          <Route exacat path="/terms" element={<Terms />} />
        </Routes>
        <Foot />
      </Router>
    </div>
  );
}

export default App;
