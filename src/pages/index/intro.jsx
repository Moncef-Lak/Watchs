import React, { useEffect } from "react";
import "./intro.css";
import {
  TextSection as Part1,
  Showing as Part2,
  Showing2 as Part3,
  Showing3 as Part4,
  Showing4 as Part5,
} from "./components/imp-exp-all";

const Index = () => {
  useEffect(() => {
    document.title = "LM WATCH";
  }, []);

  return (
    <section className="index">
      <Part1 />
      <Part2 />
      <Part3 />
      <div className="line"></div>
      <Part4 />
      <div className="line"></div>
      <Part5 />
    </section>
  );
};

export default Index;
