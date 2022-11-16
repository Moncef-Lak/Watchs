import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import "./../profile/profile.css";
import { useGlobalContext } from "../../../context/context";
import axios from "axios";

const Form = ({ setIsReg }) => {
  const [showMsg, setShowMsg] = useState({ show: false, msg: "" });
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { data, apiPassword } = useGlobalContext();

  // Register User
  const handleData = (formData) => {
    const myObj = new FormData();
    myObj.append("email", data.email);
    myObj.append("password", data.password);
    myObj.append("name", formData.name);
    myObj.append("full_name", formData.full_name);
    myObj.append("adress", formData.adress);
    myObj.append("api_password", apiPassword);
    try {
      axios
        .post(process.env.REACT_APP_BASE_API_URL + "api/registerUser", myObj, {
          withCredentials: true,
        })
        .then((data) => {
          if (data.data.status) {
            setIsRegisterDone(true);
          } else {
            setShowMsg({ show: true, msg: data.data.msg });
          }
          window.scrollTo(0, 0);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // hidden Msg
  useEffect(() => {
    const hidden = setTimeout(() => {
      setShowMsg({ ...showMsg, show: false });
    }, 5000);
    return () => clearTimeout(hidden);
  }, [showMsg]);

  return (
    <section className="profile" style={{ margin: 0 }}>
      {isRegisterDone ? (
        <div className="register-message">
          <div className="reg-form-title">Register complet</div>
          <div onClick={() => setIsReg(false)} className="account-btn">
            <div className="btn-prm">
              Login
              <div className="arrow-right">
                <HiOutlineArrowNarrowRight />
              </div>
            </div>
          </div>
          <div className="reg-form-title-mini">
            Please verify your email before logging in
          </div>
        </div>
      ) : (
        <>
          <div
            className={`reg-error-box ${showMsg.show && "show-reg-error-box"}`}
          >
            {showMsg.msg}
          </div>
          <form onSubmit={handleSubmit(handleData)}>
            <div className="input-box">
              <div className="label">Name*</div>
              <input
                type="text"
                {...register("name", { required: true, minLength: 3 })}
              />
              {errors?.name?.type === "required" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>{" "}
                  This is Required
                </div>
              )}
              {errors?.name?.type === "minLength" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>
                  Min Length Should Be 3
                </div>
              )}
            </div>
            <div className="input-box">
              <div className="label">Full-Name*</div>
              <input
                type="text"
                {...register("full_name", { required: true, minLength: 3 })}
              />
              {errors?.full_name?.type === "required" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>{" "}
                  This is Required
                </div>
              )}
              {errors?.full_name?.type === "minLength" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>
                  Min Length Should Be 3
                </div>
              )}
            </div>

            <div className="input-box">
              <div className="label">Adress</div>
              <input type="text" {...register("adress", { minLength: 5 })} />
              {errors?.adress?.type === "maxLength" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>{" "}
                  Min Length Should Be 5
                </div>
              )}
            </div>

            <button className="account-btn">
              <div className="btn-prm">
                Register
                <div className="arrow-right">
                  <HiOutlineArrowNarrowRight />
                </div>
              </div>
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default Form;
