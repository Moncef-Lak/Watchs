import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
// import { BsFacebook } from "react-icons/bs";
// import { SiGmail } from "react-icons/si";
import { BiError } from "react-icons/bi";
import axios from "axios";
// import FacebookLogin from 'react-facebook-login';
import { useGlobalContext } from "../../../context/context";
// import loginWithFacebook from "../../../functions/facebookLogin";

const Reg = ({ setIsReg }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [showMsg, setShowMsg] = useState({ show: false, msg: "" });
  const { setData, apiPassword } = useGlobalContext();

  const handleData = (formData) => {
    if (formData.password === formData.confirm_password) {
      // yroh yadrab tala ida email maftouh bih compte wala lala
      const myObj = new FormData();
      myObj.append("email", formData.email);
      myObj.append("api_password", apiPassword);
      try {
        axios
          .post(
            process.env.REACT_APP_BASE_API_URL + "api/checkEmailExist",
            myObj,
            { withCredentials: true }
          )
          .then((data) => {
            if (data.data.status) {
              setData({ email: formData.email, password: formData.password });
              setIsReg(true);
              window.scrollTo(0, 0);
            } else {
              setShowMsg({ show: true, msg: data.data.msg, error: true });
              window.scrollTo(0, 200);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowMsg({
        show: true,
        msg: "Password and confirm password does not match.",
      });
      window.scrollTo(0, 200);
    }
  };

  // facebook login function
  // const handleFacebookLogin = (response) => {
  //   const { accessToken } = response;
  //   loginWithFacebook(accessToken);
  // };

  // hidden Msg
  useEffect(() => {
    const hidden = setTimeout(() => {
      setShowMsg({ ...showMsg, show: false });
    }, 5000);
    return () => clearTimeout(hidden);
  }, [showMsg]);

  return (
    <div className="reg">
      <div className="heading">Register</div>
      <div className="reg-box">
        <form action="" onSubmit={handleSubmit(handleData)}>
          <div className={`error-box ${showMsg.show && "show-error-box"}`}>
            {showMsg.msg}
          </div>

          {/* email */}
          <div className="input-box">
            <div className="label">Email address*</div>
            <input type="email" {...register("email", { required: true })} />
            {errors?.email?.type === "required" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>{" "}
                This is Required
              </div>
            )}
          </div>

          {/* password */}
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

          {/* confirm_password */}
          <div className="input-box">
            <div className="label">Confirm password *</div>
            <input
              type={`${isHidden2 ? "password" : "text"}`}
              autoComplete="confirm_password"
              {...register("confirm_password", {
                required: true,
                minLength: 6,
              })}
            />
            <div
              className={`hidden-show ${!isHidden2 && "show"}`}
              onClick={() => setIsHidden2(!isHidden2)}
            >
              <FaRegEye />
            </div>
            {errors?.confirm_password?.type === "required" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>{" "}
                This is Required
              </div>
            )}
            {errors?.confirm_password?.type === "minLength" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>
                Not enough to be a password
              </div>
            )}
          </div>
          {/* <div className="mini-title">
            A password will be sent to your email address.
          </div>
           */}
          <button className="account-btn">
            <div className="btn-prm">
              Register
              <div className="arrow-right">
                <HiOutlineArrowNarrowRight />
              </div>
            </div>
          </button>
        </form>
        {/* <div className="media-account">
          <div className="media-box facebook">
            <BsFacebook />
          </div>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            fields="name,email,picture"
            callback={handleFacebookLogin}
            render={renderProps => (
              <div className="media-box facebook" onClick={() => console.log(renderProps)}>
                <BsFacebook />
              </div>
            )}
          />
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

export default Reg;
