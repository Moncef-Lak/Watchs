import React, { useEffect, useRef } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import peack1 from "../../../assets/images/peack1.png";
import peack2 from "../../../assets/images/peack2.png";
import peack3 from "../../../assets/images/peack3.png";
import peack4 from "../../../assets/images/peack4.png";
import peack5 from "../../../assets/images/peack5.png";
import peack6 from "../../../assets/images/peack6.png";
import peack7 from "../../../assets/images/peack7.png";
import peack8 from "../../../assets/images/peack8.png";
import gsap, { TweenMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Showing3 = () => {
  let all = useRef(null);

  // animation function -------------------
  useEffect(() => {
    if (all) {
      for (let i = 0; i < all.children.length; i++) {
        if (i !== 2) {
          TweenMax.from(all.children[i], 1.5, {
            y: 300,
            opacity: 0,
            scrollTrigger: {
              trigger: all.children[i],
              start: "-250px bottom",
              toggleActions: "play null null reverse",
            },
          });
        }
      }

      for (let i = 0; i < all.children[2].children.length; i++) {
        TweenMax.from(all.children[2].children[i], 1, {
          xPercent: -100,
          opacity: 0,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: all.children[2],
            start: "top bottom",
            toggleActions: "play null null reverse",
          },
        });
      }
      // TweenMax.from(all.children[2], '1.'+i, {
      //   xPercent: -100, opacity: 0,
      //   scrollTrigger: {
      //     trigger: all.children[2],
      //     start: 'top bottom',
      //     toggleActions: 'play null null reverse'
      //   }
      // })
    }
  }, []);
  // --------------------------------------
  return (
    <section className="showing3" ref={(e) => (all = e)}>
      <div className="title1">Algerian made</div>
      <div className="title2">
        The pure logic of creating the elegance of Algeria with the Algerians.
      </div>
      <div className="imgs">
        <img src={peack1} alt="img" />
        <img src={peack2} alt="img" />
        <img src={peack3} alt="img" />
        <img src={peack4} alt="img" />
        <img src={peack5} alt="img" />
        <img src={peack6} alt="img" />
        <img src={peack7} alt="img" />
        <img src={peack8} alt="img" />
      </div>
      <div className="text">
        <div className="part1">
          It seems that you have to be crazy to want to create a high-end watch,
          using the know-how of the most prestigious DZ manufacturers and
          without no components from Asia. Let's be crazy. This bet, LM decided
          to win it as a team. The LM watch requires the intervention of better
          sector players. Our luck is that these precious
        </div>
        <div className="part2">
          heirs to flamboyant watchmaking are DZ and today provide the most
          demanding global luxury brands. Watchmaking DZ can and should produce
          top watches range of DZ brand. LM, its partners and its customers are
          enthusiastically embarking on this adventure.
        </div>
      </div>
      <NavLink to="/advice" className="btn-showing3">
        <div className="btn-prm showing2-btn">
          Advice
          <div className="arrow-right">
            <HiOutlineArrowNarrowRight />
          </div>
        </div>
      </NavLink>
    </section>
  );
};

export default Showing3;
