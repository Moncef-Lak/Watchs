import React, { useEffect, useRef } from "react";
import "./foot.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import gsap, { TweenMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Foot() {
  let all = useRef(null);

  // let timeline = TimelineLite({
  //   scrollTrigger: {
  //     trigger: child_1,
  //     start: "top bottom",
  //     ease: "power2.easeOut",
  //     toggleActions: "play none none reverse",
  //   }
  // })
  useEffect(() => {
    // animation function -------------------
    if (all) {
      const [child_1] = all.children;

      for (let i = 0; i < child_1.children.length; i++) {
        TweenMax.from(child_1.children[i], 1, {
          xPercent: -101,
          opacity: 0,
          delay: i * 0.3,
          scrollTrigger: {
            trigger: child_1,
            start: "top bottom",
            toggleActions: "restart null null reverse",
          },
        });
      }
    }
  }, []);

  return (
    <section className="foot" ref={(e) => (all = e)}>
      <div className="services">
        <div className="service-box">
          <div className="title">Garantie 24 mois</div>
          <div className="text">Enjoy the high quality of LM watches.</div>
        </div>
        <div className="service-box">
          <div className="title">Delivery and return offered</div>
          <div className="text">
            You have the right to try and even to give up
          </div>
        </div>
        <div className="service-box">
          <div className="title">Try at home</div>
          <div className="text">
            Peace of mind, for 14 days at home, adopt a LM.
          </div>
        </div>
        <div className="service-box">
          <div className="title">Payment in 3 installments free of charge</div>
          <div className="text">
            Secure transaction and payment in 3 installments free of charge, if
            you want.
          </div>
        </div>
      </div>

      <div className="easy-contact">
        <div className="top">
          <div className="left">
            <NavLink to="/" className="title">
              LM
            </NavLink>
            <NavLink to="/store" className="title">
              The watches
            </NavLink>
            <NavLink to={"/meeting"} className="title">
              On appointment
            </NavLink>
          </div>
          <div className="right">
            <div className="email-box">
              <div className="email-title">Subscribe to LM news</div>
              <input type="text" placeholder="Votre adress email" />
            </div>
            <div className="socaile-media">
              <div className="sociale-media-box">Instgarm</div>
              <div className="sociale-media-box">Twitter</div>
              <div className="sociale-media-box">Facebook</div>
              <div className="sociale-media-box">YouTube</div>
              <div
                className="back-to-top"
                onClick={() => window.scrollTo(0, 0)}
              >
                <HiOutlineArrowNarrowRight className="to-top" />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <NavLink to="/contact" className="title">
            Contact
          </NavLink>
          <NavLink to="/advice" className="title">
            Advice
          </NavLink>
          <NavLink to="/terms" className="title">
            Legal Notice
          </NavLink>
          <NavLink to="/Privacy-Policy" className="title">
            Privacy Policy
          </NavLink>
          <NavLink to="terms" className="title">
            Terms of Sales
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Foot;
