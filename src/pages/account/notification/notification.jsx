import React, { } from "react";
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { FaRegEyeSlash } from "react-icons/fa";
import { useGlobalContext } from "../../../context/context";
import './notification.css';


const Notification = () => {
  const { notifications, hidden } = useGlobalContext();

  return (
    <section className="notification">

      {notifications && notifications.map((notification, key) => {
        const { type } = notification;

        return <div className="notification-box" key={key}>
          <div className="sym"><MdOutlineNotificationsActive /></div>
          <div className="text">
            {type === 'message' && <><div className="notify-title">{notification?.title}:</div> {notification?.message}</>}
            {type === 'product' && <><div className="notify-title"> New Watch:
            </div> Keep your eyes open, And say hello to "{notification?.name}" from ^{notification?.category?.name}^</>}
            <div className="date">{notification.for_order}</div>
          </div>
          <div className="hidden-notification" onClick={() => hidden(notification?.id)}>
            <FaRegEyeSlash />
          </div>
        </div >
      })}

      <div className="notice">
        Notifications expires after logout
      </div>
    </section >
  );
}

export default Notification;
