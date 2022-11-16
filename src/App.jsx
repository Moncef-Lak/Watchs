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
