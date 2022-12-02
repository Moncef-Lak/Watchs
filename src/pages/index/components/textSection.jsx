import React, { useEffect, useRef } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CgScrollV } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import img from "../../../assets/images/watch_background (2).webp";
import video from "../../../assets/videos/video2.mp4";
import { TweenMax, Power3 } from "gsap";
import {
  wordsLetters,
  wordsLettersJsx,
} from "../../../functions/words_letters";

const TextSection = () => {
  let all_words = useRef(null);
  let button = useRef(null);

  // animation function
  useEffect(() => {
    all_words &&
      TweenMax.staggerFrom(
        wordsLetters(all_words),
        0.5,
        { x: 100, opacity: 0, ease: Power3.easeOut },
        0.1
      );
    button?.classList.add("animation");
  }, []);

  return (
    <section className="text-section">
      <div className="video">
        <video autoPlay loop poster={img}>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div
        className="scroll"
        onClick={() => window.scrollTo(0, window.innerHeight - 50)}
      >
        <CgScrollV />
      </div>
      <div className="title" ref={(e) => (all_words = e)}>
        {wordsLettersJsx("Pure, Automatic and very DZ watches")}
      </div>
      <NavLink
        to="/store"
        ref={(e) => (button = e)}
        className="btn-prm index-btn"
      >
        Discover the watchs
        <div className="arrow-right">
          <HiOutlineArrowNarrowRight />
        </div>
      </NavLink>
    </section>
  );
};

export default TextSection;
