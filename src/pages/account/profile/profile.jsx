import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import "./profile.css";
import { useGlobalContext } from "../../../context/context";
import axios from "axios";

const Profile = () => {
  const [showMsg, setShowMsg] = useState({ show: false, msg: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const [isHidden3, setIsHidden3] = useState(true);
  const { user, apiPassword, setUser } = useGlobalContext();

  // set old data
  useEffect(() => {
    if (user) {
      const { name, full_name, email } = user;
      reset({
        name: name,
        full_name: full_name,
        email: email,
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    }
  }, [user, reset]);

  const handleData = (data) => {
    if (user) {
      window.scroll(0, 250);
      if (data.new_password === data.confirm_password) {
        const { name, full_name, email } = user;
        const myObj = new FormData();
        data.name !== name && myObj.append("name", data.name);
        data.full_name !== full_name &&
          myObj.append("full_name", data.full_name);
        data.email !== email && myObj.append("new_email", data.email);
        data.new_password && myObj.append("new_password", data.new_password);
        myObj.append("email", email);
        myObj.append("password", data.current_password);
        myObj.append("api_password", apiPassword);
        try {
          axios
            .post(
              process.env.REACT_APP_BASE_API_URL + "api/updateUser",
              myObj,
              { withCredentials: true }
            )
            .then((data) => {
              if (data.data.status) {
                setShowMsg({ show: true, msg: data.data.msg });
                setUser(data.data.user);
              } else {
                setShowMsg({ show: true, msg: data.data.msg });
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        setShowMsg({
          show: true,
          msg: "Confirmation password does not match.",
        });
      }
    }
  };

  //  // Reset Data
  //  useEffect(() => {
  //   if (admin) {
  //     const { name, email, image_name, phone } = admin;
  //     image_name && setNewImg(process.env.REACT_APP_BASE_API_URL + `Product/${admin?.image_name}`);
  //     reset({
  //       name: name,
  //       email: email,
  //       phone: phone,
  //       admin_img: '',
  //     });

  //   }
  // }, [admin, reset]);

  // hidden Msg
  useEffect(() => {
    const hidden = setTimeout(() => {
      setShowMsg({ ...showMsg, show: false });
    }, 5000);
    return () => clearTimeout(hidden);
  }, [showMsg]);

  return (
    <section className="profile">
      <div className={`error-box ${showMsg.show && "error-box-hidden"}`}>
        {showMsg.msg}
      </div>
      <form onSubmit={handleSubmit(handleData)}>
        {/* name */}
        <div className="input-box">
          <div className="label">Name</div>
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

        {/* full name */}
        <div className="input-box">
          <div className="label">Full-Name</div>
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

        {/* email */}
        <div className="input-box">
          <div className="label">Email</div>
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

        {/* current password */}
        <div className="input-box">
          <div className="label">Current password </div>
          <input
            type={`${isHidden3 ? "password" : "text"}`}
            {...register("current_password", { required: true, minLength: 6 })}
          />
          <div
            className={`hidden-show ${!isHidden3 && "show"}`}
            onClick={() => setIsHidden3(!isHidden3)}
          >
            <FaRegEye />
          </div>
          {errors?.current_password?.type === "minLength" && (
            <div className="validate">
              <div className="sym">
                <BiError />
              </div>{" "}
              Min Length Should Be 6
            </div>
          )}
          {errors?.current_password?.type === "required" && (
            <div className="validate">
              <div className="sym">
                <BiError />
              </div>{" "}
              This is Required
            </div>
          )}
        </div>

        {/* new password */}
        <div className="input-box">
          <div className="label">
            New password (leave blank to keep the current one)
          </div>
          <input
            type={`${isHidden2 ? "password" : "text"}`}
            {...register("new_password", { minLength: 5 })}
          />
          <div
            className={`hidden-show ${!isHidden2 && "show"}`}
            onClick={() => setIsHidden2(!isHidden2)}
          >
            <FaRegEye />
          </div>
          {errors?.new_password?.type === "minLength" && (
            <div className="validate">
              <div className="sym">
                <BiError />
              </div>{" "}
              Min Length Should Be 6
            </div>
          )}
        </div>

        {/*confirm password */}
        <div className="input-box">
          <div className="label">
            Confirm the new password (leave blank to keep the current one)
          </div>
          <input
            type={`${isHidden ? "password" : "text"}`}
            {...register("confirm_password")}
          />
          <div
            className={`hidden-show ${!isHidden && "show"}`}
            onClick={() => setIsHidden(!isHidden)}
          >
            <FaRegEye />
          </div>
        </div>

        <button className="account-btn">
          <div className="btn-prm">
            Save Changes
            <div className="arrow-right">
              <HiOutlineArrowNarrowRight />
            </div>
          </div>
        </button>
      </form>
    </section>
  );
};

export default Profile;
