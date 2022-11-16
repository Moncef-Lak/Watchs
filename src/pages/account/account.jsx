import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MoreWacths from "../../components/more-watchs/morWacths";
import { useGlobalContext } from "../../context/context";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "./account.css";
import { Login, Reg, Navbar, Form } from "./components/imp-exp-all";
import axios from "axios";

const Account = () => {
  const [isReg, setIsReg] = useState(false);
  const { access, logOut, verifyEmail, user, apiPassword } = useGlobalContext();

  useEffect(() => {
    document.title = "ACCOUNT";
  }, []);

  const resendEmailConfirmation = () => {
    if (user) {
      const myData = new FormData();
      myData.append("api_password", apiPassword);
      myData.append("id", [user.id]);
      try {
        axios
          .post(
            process.env.REACT_APP_BASE_API_URL + "api/resendVerificationEmail",
            myData,
            { withCredentials: true }
          )
          .then((data) => {
            // console.log(data.data);
            if (!data.data.status) {
              console.log("Failed to resend email");
            }
          });
      } catch (e) {
        console.log("Error");
      }
    }
  };
  return (
    <>
      <section className="account">
        <div className="title">
          {access && verifyEmail ? "Verify your Email" : "My account"}
        </div>
        <div className={`big-box ${access && "big-box-column"}`}>
          {access ? (
            <>
              {verifyEmail ? (
                <div className="verify-email-message">
                  <div className="message">
                    You need to verify your email address to activate your
                    account...
                  </div>
                  <div className="message-mini">
                    Did't get a confirmation link? Click in button below :
                  </div>
                  <div
                    onClick={resendEmailConfirmation}
                    className="account-btn"
                  >
                    <div className="btn-prm">
                      Resend
                      <div className="arrow-right">
                        <HiOutlineArrowNarrowRight />
                      </div>
                    </div>
                  </div>
                  <div className="log-Out-message">
                    <div className="message-mini-mini" onClick={logOut}>
                      LogOut
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Navbar />
                  <Outlet />
                </>
              )}
            </>
          ) : (
            <>
              {isReg ? (
                <Form setIsReg={setIsReg} />
              ) : (
                <>
                  <Login />
                  <Reg setIsReg={setIsReg} />
                </>
              )}
            </>
          )}
        </div>
      </section>
      <MoreWacths />
    </>
  );
};

export default Account;
