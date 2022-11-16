import React, { useState, useEffect } from "react";
import { BiError } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGlobalContext } from "../../../context/context";

const Form = ({ IsChose2, date, houre, setDone }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [stop, setStop] = useState(false);
  const [showMsg, setShowMsg] = useState({ show: false, msg: "" });
  const { apiPassword } = useGlobalContext();

  const handleData = (data) => {
    const myObj = new FormData();
    myObj.append("name", data.name);
    myObj.append("email", data.email);
    myObj.append("phone", data.phone);
    myObj.append("comment", data.comment);
    myObj.append(
      "date",
      date.toLocaleDateString().split("/").reverse().join("-")
    );
    myObj.append("houre", houre);
    myObj.append("api_password", apiPassword);
    if (!stop) {
      try {
        axios
          .post(process.env.REACT_APP_BASE_API_URL + "api/AddMeeting", myObj, {
            withCredentials: true,
          })
          .then((data) => {
            if (data.data.status) {
              setDone(true);
              window.scrollTo(0, 0);
            } else {
              setShowMsg({ show: true, msg: data.data.msg });
            }
          });
      } catch (error) {
        console.log(error);
        setShowMsg({ show: true, msg: "Somthing rong" });
      }
      setStop(true);
    }
  };

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
    <div className={`content ${IsChose2 && "anwser-after"}`}>
      <div className="metting-form">
        <div className="data">
          Date : {date?.toDateString()} at {houre?.substring(0, 5)} <br />
          You want : Program a video conference
        </div>
        <form action="" onSubmit={handleSubmit(handleData)}>
          <div className={`error-box ${showMsg.show && "error-box-hidden"}`}>
            {showMsg.msg}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Your Name*"
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
            <input
              type="number"
              placeholder="Phone number*"
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
            <input
              type="email"
              placeholder="Email*"
              {...register("email", { required: true })}
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
            <input
              type="text"
              placeholder="Comment*"
              {...register("comment", { required: true, minLength: 10 })}
            />
            {errors?.comment?.type === "required" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>{" "}
                This is Required
              </div>
            )}
            {errors?.comment?.type === "minLength" && (
              <div className="validate">
                <div className="sym">
                  <BiError />
                </div>
                Min Length Should Be 10
              </div>
            )}
          </div>
          <button className="meeting-btn">
            <div to="/store" className="btn-prm">
              Finish my order
              <div className="arrow-right">
                <HiOutlineArrowNarrowRight />
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
