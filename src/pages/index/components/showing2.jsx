import React, { useEffect, useRef } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import manWatch from "../../../assets/images/model- (1).jpg";
import gsap, { TweenMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Showing2 = () => {
  let img = useRef(null);
  let text = useRef(null);
  // animation function -------------------
  useEffect(() => {
    if (img) {
      const [_, child_1] = img.children;
      TweenMax.to(child_1, 2, {
        yPercent: 101,
        scrollTrigger: {
          trigger: img,
          start: "40% bottom",
          toggleActions: "play null null reverse",
        },
      });
    }

    if (text) {
      // const [_, child_1] = text.children;
      for (let i = 0; i < text.children.length; i++) {
        if (i !== 0 && i !== text.children.length - 1) {
          TweenMax.from(text.children[i], 1.5, {
            y: 300,
            opacity: 0,
            scrollTrigger: {
              trigger: text.children[i],
              start: "-200px bottom",
              toggleActions: "play null null reverse",
            },
          });
        }
      }
    }
  }, []);
  // --------------------------------------

  return (
    <section className="showing2" ref={(e) => (text = e)}>
      <div className="img" ref={(e) => (img = e)}>
        <img src={manWatch} alt="img" />
        <div className="before"></div>
      </div>
      <div className="title1">Moncef</div>
      <div className="title2">Very Algerian</div>
      <div className="text">
        More precisely, twice DZ. Mainly manufactured in the East of Algeria, LM
        watches are also thought out in all point in the purest DZ style. DZ
        styling? Each country develops specific qualities (or defects) that have
        a decisive influence on creations and behaviors.
        <br />
        <br />
        <br />
        In Algeria, this style combines very marked trends: the taste for ideas,
        the obsession with meaning, the thirst excellence, attention to detail,
        sobriety, the joyful indiscipline that leads to sidestepping. These
        character traits when expressed in creation and innovation become
        elegance Algeries, loved all over the world.
        <br />
        <br />
        <br />
        LM claims these singularities and shares them with its customers so that
        DZ elegance asserts itself even more.
      </div>
      <div className="btn-showing">
        <NavLink to="/store" className="btn-prm showing2-btn">
          All watchs
          <div className="arrow-right">
            <HiOutlineArrowNarrowRight />
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default Showing2;
