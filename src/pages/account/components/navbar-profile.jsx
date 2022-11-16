import React, { useState ,useEffect} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../context/context";
const Navbar = () => {
  const [In, setIn] = useState(false);
  const {notif, setNotif,logOut} = useGlobalContext();
  const { pathname } = useLocation();

  useEffect(() => {
    pathname === '/account' ? setIn(true) : setIn(false);
    pathname === '/account/notification' && setNotif(false) ;
  }, [pathname,setNotif])

  return (
    <nav className="profile-nav">
      <Link to={'/account'} className={`link ${In && 'active'}`}>Dashboard</Link>
      <NavLink to={'/account/orders'} className="link">Orders</NavLink>
      <NavLink to='/account/notification' className={`link ${notif && 'notif'} `} >Notifications </NavLink>
      <NavLink to='/account/details' className="link">Account details</NavLink>
      <div className="link" onClick={logOut}>Logout</div>
    </nav>
  );
}

export default Navbar;
