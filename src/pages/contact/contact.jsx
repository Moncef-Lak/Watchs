import React, { useState, useEffect } from "react";
import "./contact.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import MoreWacths from "../../components/more-watchs/morWacths";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import axios from "axios";
import { useGlobalContext } from "../../context/context";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [stop, setStop] = useState(false);
  const { apiPassword } = useGlobalContext();
  const [success, setSuccess] = useState({
    show: false,
    title: "Contact",
    msg: "LM is on-hand for any questions you may have about a product, order, after-sales service or the LM brand.",
  });
  const [showMsg, setShowMsg] = useState({ show: false, msg: "" });

  const handleData = (data) => {
    const myObj = new FormData();
    myObj.append("name", data.name);
    myObj.append("full_name", data.full_name);
    myObj.append("email", data.email);
    myObj.append("phone", data.phone);
    myObj.append("message", data.message);
    myObj.append("api_password", apiPassword);
    if (!stop) {
      try {
        axios
          .post(process.env.REACT_APP_BASE_API_URL + "api/AddContact", myObj, {
            withCredentials: true,
          })
          .then((data) => {
            if (data.data.status) {
              setSuccess({
                show: true,
                msg: data.data.msg,
                title: "Message sent",
              });
            } else {
              setShowMsg({ show: true, msg: data.data.msg });
            }
            window.scrollTo(0, 0);
          });
      } catch (error) {
        console.log(error);
      }
    }
    setStop(true);
  };

  // hidden Msg
  useEffect(() => {
    const hidden = setTimeout(() => {
      setShowMsg({ ...showMsg, show: false });
    }, 5000);
    return () => clearTimeout(hidden);
  }, [showMsg]);

  // Stoping Req
  useEffect(() => {
    const stop = setTimeout(() => {
      setStop(false);
    }, 5000);
    return () => clearTimeout(stop);
  }, [stop]);

  useEffect(() => {
    document.title = "CONTACT";
  }, []);

  return (
    <>
      <section className="contact">
        <div className="title">{success.title}</div>
        <div className="text">{success.msg}</div>
        {!success.show ? (
          <form action="" onSubmit={handleSubmit(handleData)}>
            <div className={`error-box ${showMsg.show && "error-box-hidden"}`}>
              {showMsg.msg}
            </div>
            <div className="input-box">
              <div className="label">Your name*</div>

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
              <div className="label">Your fullName*</div>
              <input
                type="text"
                {...register("full_name", { required: true })}
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
              <div className="label">Your phone number*</div>
              <input
                type="number"
                {...register("phone", {
                  required: true,
                  minLength: 9,
                  maxLength: 12,
                })}
              />
              {errors.phone && errors.phone.type === "required" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>{" "}
                  This is Required
                </div>
              )}
              {errors?.phone?.type === "minLength" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>{" "}
                  Min Length Should Be 9
                </div>
              )}
              {errors?.phone?.type === "maxLength" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>{" "}
                  Max Length Should Be 12
                </div>
              )}
            </div>
            <div className="input-box">
              <div className="label">Your email*</div>
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
            <div className="text-area-box">
              <div className="label">Your Message*</div>
              <textarea
                rows="10"
                {...register("message", { required: true, minLength: 10 })}
              ></textarea>
              {errors?.message?.type === "required" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>{" "}
                  This is Required
                </div>
              )}
              {errors?.message?.type === "minLength" && (
                <div className="validate">
                  <div className="sym">
                    <BiError />
                  </div>
                  Min Length Should Be 10
                </div>
              )}
            </div>
            <button className="contact-btn">
              <div className="btn-prm">
                Send
                <div className="arrow-right">
                  <HiOutlineArrowNarrowRight />
                </div>
              </div>
            </button>
          </form>
        ) : (
          <></>
        )}
      </section>
      <MoreWacths />
    </>
  );
};

export default Contact;
