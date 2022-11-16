import { Power3, TimelineLite } from "gsap";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineUser } from 'react-icons/ai';
import { BsBag, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
import { MdOutlineRoomService } from 'react-icons/md';
import { NavLink, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Menu from "../Menu/menu";
import './header.css';


function Header({ setIsOpen, isOpen }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [watchDeg, setWatchDeg] = useState(80);
  const [show, setShow] = useState(false);
  const [stop, setStop] = useState(false);
  const { pathname } = useLocation();
  const run = useRef(false);
  const { count, notif, setPathname, theme, access, notifications, setTheme } = useGlobalContext();
  const [darkLightMode, setDarkLightMode] = useState(theme ? true : false);
  let left_side = useRef(null);
  let top = useRef(null);

  useEffect(() => {
    const logo = document.querySelector('.logo');
    // var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (100 < currentScrollPos) {
        logo.classList.add('logo-after-scroll');
        setIsScrolling(true);
      } else {
        logo.classList.remove('logo-after-scroll');
        setIsScrolling(false);
      }
    }
  }, [isOpen, isScrolling,])

  // close menu if page change (if pathName change ) 
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
    setPathname(pathname);
  }, [pathname, setIsOpen, setPathname])

  useEffect(() => {
    const leftSideHeight = left_side.getBoundingClientRect();
    leftSideHeight.height = '100vw';
  }, [])


  // animation function
  useEffect(() => {
    let tl = new TimelineLite();
    tl
      .from(top, 1.5, { opacity: 0, xPercent: 100, ease: Power3.easeInOut })
      .staggerTo(top.children[0].children[1].children, 1.5, { opacity: 1, scale: 1, x: '0vw', ease: Power3.easeIn }, .3, '-=1.5')
      .from(left_side.parentElement, 1.5, { opacity: 0, yPercent: 100, ease: Power3.easeInOut }, '-=2.7')
      .staggerTo([left_side.children[1], left_side.children[0]], 1.5, { opacity: 1, y: '0vw', ease: Power3.easeInOut }, .5, '-=1.8')
      .to(top.children[0].children[0], 1.5, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=1.7')

    // console.log(top.children[0].children[1].children[2]);
  }, [])

  //  dark light mood function
  const updateMode = () => {
    if (!stop) {
      setDarkLightMode(!darkLightMode);
      setTimeout(() => {
        setWatchDeg(prev => prev + 360);
        setTheme(theme === '' ? 'light' : '')
      }, 1000);
      setStop(true);
    }

  }

  //  dark light mood function
  useEffect(() => {
    const stop = setTimeout(() => {
      setShow(false);
    }, [3000]);
    return () => clearTimeout(stop);
  }, [show])

  //  dark light mood function
  useEffect(() => {
    if (run.current) {
      setShow(true);
    }
    run.current = true;
  }, [darkLightMode])

  //  dark light mood function
  useEffect(() => {
    const stop = setTimeout(() => {
      setStop(false);
    }, [3000]);
    return () => clearTimeout(stop);
  }, [stop])

  return (
    <>
      <section className="header" ref={e => top = e}>
        <div className="top-side">
          <NavLink to='/' className={`logo ${isScrolling && 'logo-after-scroll'} ${isOpen && 'logo-menu-open'}`}>{isScrolling ? 'LM' : 'Moncef'}</NavLink>

          <div className="elements">
            <div className="light-dark-style" onClick={updateMode}>
              <div className="icone">
                <div className={`player ${darkLightMode && 'player_after'}`}></div>
                <div className={`left ${darkLightMode && 'left_after'}`}><BsFillMoonFill /></div>
                <div className={`right ${darkLightMode && 'right_after'}`}><BsFillSunFill /></div>
              </div>
            </div>
            <div className="menu" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? 'Close the Menu' : "Menu"}
            </div>
            <NavLink className="user" to='/account'>
              <div ><AiOutlineUser /> {(notif && access && notifications) && <div className="notif"><IoNotifications /></div>}</div>
            </NavLink>
            <NavLink to='/cart' className="navbar-cart"><BsBag /><p className="current">{count}</p></NavLink>
          </div>
        </div>
      </section>
      <section className="left-side-out">
        <div className="left-side" ref={e => left_side = e}>
          <NavLink to='/contact' className="bottom"><MdOutlineRoomService /></NavLink>
          <div className={`top ${isOpen && 'top-menu-open'}`}>
            <div className="before-menu-open">
              <NavLink to='Privacy-Policy' className="sym">Privacy Policy</NavLink>
              <NavLink to='/meeting' className="sym">Let's meet up</NavLink>
            </div>
            <div className="after-menu-open">
              <NavLink to='https://www.youtube.com' className="sym">YouTube</NavLink>
              <NavLink to='https://www.facbook.com' className="sym">Facebook</NavLink>
              <NavLink to='https://www.twitter.com' className="sym">Twitter</NavLink>
            </div>
          </div>
        </div>
      </section>
      <section className={`watch-animation ${show && 'watch-animation-after'}`} >
        <div className="center-box">
          <div className="watch">
            <div className="line-1"></div>
            <div className="in-watch" style={{ transform: 'rotate(' + watchDeg + 'deg)' }}>
              <div className="line-2"></div>
            </div>
          </div>
        </div>
      </section>
      <Menu isOpen={isOpen} />

    </>
  );
}

export default Header;
