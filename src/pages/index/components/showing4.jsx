import React, { useEffect, useRef } from "react";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { NavLink } from "react-router-dom";
import manWatch2 from '../../../assets/images/apose-relation-directe-marque-montres.jpg';
import gsap, { TweenMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Showing4 = () => {
  let all = useRef(null)

  // animation function -------------------
  useEffect(() => {
    if (all) {
      for (let i = 0; i < all.children.length; i++) {
        if (i !== 0) {
          TweenMax.from(all.children[i], 1.5, {
            y: 300, opacity: 0,
            scrollTrigger: {
              trigger: all.children[i],
              start: '-250px bottom',
              toggleActions: 'play null null reverse',
            }
          })
        }
      }

      TweenMax.to(all.children[0].children[1], 2, {
        yPercent: 101,
        scrollTrigger: {
          trigger: all.children[0],
          start: '40% bottom',
          toggleActions: 'play null null reverse'
        }
      })
    }
  }, [])

  return (
    <section className="showing4" ref={e => all = e}>
      <div className="img">
        <img src={manWatch2} alt="img" />
        <div className="before"></div>
      </div>
      <div className="title1">In direct relation with the brand</div>
      <div className="title2">Between us, a direct, simple and sincere link</div>
      <div className="text">
        Manufacture in Algeria and offer a report
        particularly attractive quality / price
        is an equation known to be impossible to solve.
        The solution is exclusive online sales which, in
        eliminating the traditional cascade of intermediaries,
        also makes it possible to forge an incomparable relationship between LM
        and its (future) customers.
        This is an extraordinary opportunity to be able to
        meet around an LM watch.
      </div>
      <div className="btn-showing">
        <NavLink to='/meeting' className="btn-prm showing4-btn">
          Let's meet up
          <div className="arrow-right">
            <HiOutlineArrowNarrowRight />
          </div>
        </NavLink>
      </div>
    </section>

  );
}

export default Showing4;
