import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import axios from "axios";
// import { BsFacebook } from "react-icons/bs";
// import { SiGmail } from "react-icons/si";
import { useGlobalContext } from "../../../context/context";

const Login = () => {
  const [isHidden, setIsHidden] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [showMsg, setShowMsg] = useState({ show: false, msg: "" });
  const [stop, setStop] = useState(false);
  const {
    setUser,
    setAccess,
    apiPassword,
    setNotifications,
    notifications,
    setNotif,
    setVerifyEmail,
  } = useGlobalContext();

  const handleData = (formData) => {
    const myObj = new FormData();
    myObj.append("email", formData.email);
    myObj.append("password", formData.password);
    myObj.append("api_password", apiPassword);
    if (!stop) {
      try {
        axios
          .post(process.env.REACT_APP_BASE_API_URL + "api/UserLogin", myObj, {
            withCredentials: true,
          })
          .then((data) => {
            if (data.data.status) {
              setUser(data.data.data.user);
              setAccess(true);
              if (data.data.data.user.email_verified_at) {
                setVerifyEmail(false);
                const products = data?.data?.data?.notifications?.product;
                const messages = data?.data?.data?.notifications?.message;
                const all = [...products, ...messages];
                setNotifications(all);
                all.length > 0 && setNotif(true);
                window.scrollTo(0, 0);
              } else {
                window.scrollTo(0, 300);
                setVerifyEmail(true);
              }
            } else {
              setShowMsg({ show: true, msg: data.data.msg });
              window.scrollTo(0, 200);
            }
          });
      } catch (error) {
        console.log(error);
      }
      setStop(true);
    }
  };
  //order function
  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  useEffect(() => {
    const order = (orderBy, isNumber = false, direction = true) => {
      // setISsortSymNum(isNumber ? true : false);
      const newProducts = notifications?.sort(
        sort_by(orderBy, direction, (a) =>
          isNumber ? parseInt(a) : a.toUpperCase()
        )
      );
      setNotifications(newProducts);
    };
    order("created_at");
  }, [notifications, setNotifications]);

  // Stoping Req
  useEffect(() => {
    const stop = setTimeout(() => {
      setStop(false);
    }, 5000);
    return () => clearTimeout(stop);
  }, [stop]);

  // hidden Msg
  useEffect(() => {
    const hidden = setTimeout(() => {
      setShowMsg({ ...showMsg, show: false });
    }, 5000);
    return () => clearTimeout(hidden);
  }, [showMsg]);

  return (
    <div className="login">
      <div className="heading">Login</div>
      <div className="login-box">
        <form action="" onSubmit={handleSubmit(handleData)}>
          <div className={`error-box ${showMsg.show && "show-error-box"}`}>
            {showMsg.msg}
          </div>
          <div className="input-box">
            <div className="label"> Email address </div>
            <input
              type="text"
              {...register("email", { required: true, minLength: 3 })}
            />
            {errors?.email?.type === "required" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>{" "}
                This is Required
              </div>
            )}
          </div>

          <div className="input-box">
            <div className="label">Password *</div>
            <input
              type={`${isHidden ? "password" : "text"}`}
              autoComplete="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <div
              className={`hidden-show ${!isHidden && "show"}`}
              onClick={() => setIsHidden(!isHidden)}
            >
              <FaRegEye />
            </div>
            {errors?.password?.type === "required" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>{" "}
                This is Required
              </div>
            )}
            {errors?.password?.type === "minLength" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>
                Not enough to be a password
              </div>
            )}
          </div>
          <button className="account-btn">
            <div className="btn-prm">
              Identification
              <div className="arrow-right">
                <HiOutlineArrowNarrowRight />
              </div>
            </div>
          </button>
          <div className="mtps-srv">Forgot your password ?</div>
        </form>
        {/* <div className="media-account">
          <div className="media-box facebook" >
            <BsFacebook />
          </div>
          <div className="media-box gmail">
            <SiGmail />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
