import axios from "axios";
import Pusher from "pusher-js";
import React, { createContext, useContext, useState, useEffect } from "react";
import getCookie from "../functions/getCoockies";
import soundNotify from "../assets/sounds/elegant-notification-sound.mp3";
export const WatchProvider = createContext();

const WatchContext = ({ children }) => {
  const LocaleProducts = localStorage.getItem("products");
  const localTheme = localStorage.getItem("theme");
  const LocalNotification = localStorage.getItem("notifications");
  const [products, setProducts] = useState(
    LocaleProducts ? JSON.parse(LocaleProducts) : []
  );
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(localTheme ? localTheme : "");
  const [total, setTotal] = useState(0);
  const [notif, setNotif] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [access, setAccess] = useState(false);
  const [user, setUser] = useState(null);
  const [pathname, setPathname] = useState("/");
  const [stop, setStop] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [notifications, setNotifications] = useState(
    LocalNotification ? JSON.parse(LocalNotification) : []
  );
  const apiPassword = process.env.REACT_APP_API_PASSWORD;

  useEffect(() => {
    const getUser = () => {
      if (!user) {
        const myData = new FormData();
        myData.append("api_password", apiPassword);
        try {
          axios
            .post(
              process.env.REACT_APP_BASE_API_URL + "api/UserProfile",
              myData,
              { withCredentials: true }
            )
            .then((data) => {
              if (data.data.status) {
                setUser(data.data.user);
                if (!data.data.user.email_verified_at) {
                  setVerifyEmail(true);
                }
              }
            });
        } catch (e) {
          console.log("Error");
        }
      }
    };
    getUser();
  }, [user, apiPassword]);

  // notification real time function
  useEffect(() => {
    if (access) {
      console.log("in");
      Pusher.logToConsole = true;

      const pusher = new Pusher("c1c140559a420e83ab00", {
        cluster: "eu",
      });

      const channel = pusher.subscribe("Notifications");
      channel.bind("notification", function (data) {
        const url = `${process.env.REACT_APP_BASE_API_URL}api/productNotify `;
        const myData = new FormData();
        myData.append("notifyType", data.notification);
        myData.append("api_password", apiPassword);
        if (getCookie("userAccess")) {
          try {
            axios.post(url, myData, { withCredentials: true }).then((data) => {
              if (data.data.status) {
                setNotifications((prev) => [data?.data?.notification, ...prev]);
                setNotif(true);
                const sound = new Audio(soundNotify);
                setTimeout(() => {
                  sound.play();
                }, 100);
              }
            });
          } catch (e) {
            console.log("Error");
          }
        }
      });
    }
  }, [apiPassword, access]);

  // store notifications in localstorige function
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    // document.cookie = `notifications=${JSON.stringify(notifications)}; ; path=/`;
  }, [notifications]);

  // chnage theme function
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // hidden notification function
  const hiddenNotification = (id) => {
    setNotifications((prev) => prev.filter((notify) => notify.id !== id));
  };

  useEffect(() => {
    setAccess(getCookie("userAccess") ? true : false);
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    const allcount = products.reduce(
      ({ total, count }, product) => {
        count += product.count;
        total += product.count * product.price;
        return { total, count };
      },
      { total: 0, count: 0 }
    );

    setCount(allcount.count);
    setTotal(allcount.total);
  }, [products]);

  // logOut Function
  const logOut = () => {
    const data = new FormData();
    data.append("api_password", apiPassword);
    if (!stop) {
      try {
        axios
          .post(process.env.REACT_APP_BASE_API_URL + "api/UserLogout", data, {
            withCredentials: true,
          })
          .then((data) => {
            setAccess(false);
            setNotif(false);
            setUser({});
            if (!data?.data?.status) {
              console.log("Somthing rong");
            }
          });
      } catch (e) {
        console.log("Error");
      }
    }
    setStop(true);
  };

  // Stoping Req
  useEffect(() => {
    const stop = setTimeout(() => {
      setStop(false);
    }, 5000);
    return () => clearTimeout(stop);
  }, [stop]);

  return (
    <WatchProvider.Provider
      value={{
        products,
        total,
        count,
        theme,
        notif,
        data,
        access,
        user,
        apiPassword,
        notifications,
        verifyEmail,
        setProducts,
        setNotif,
        setData,
        setTheme,
        setAccess,
        setPathname,
        setUser,
        logOut,
        setNotifications,
        setVerifyEmail,
        hidden: hiddenNotification,
      }}
    >
      {children}
    </WatchProvider.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(WatchProvider);
};

export default WatchContext;
