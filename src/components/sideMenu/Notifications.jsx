import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { joinRoom } from "../../store/reducers/roomReducer";
import { getNotifications, deleteNotification } from "./../../store/reducers/authReducer";
import "../../styles/notifications.scss";
const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.auth.notifications);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  const UnseenNotifications = () => {
    let results = false;
    notifications.forEach((notif) => {
      if (!notif.seen) {
        results = true;
        return;
      }
    });

    return results;
  };

  const handleNotificationsClicked = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <>
      <div
        className={
          UnseenNotifications()
            ? "notification-container active-notification"
            : "notification-container"
        }
        onClick={handleNotificationsClicked}>
        {UnseenNotifications() ? <span className="red-notify-dot" /> : ""}

        {UnseenNotifications() ? (
          <NotificationsActiveOutlinedIcon className="notification-icon " />
        ) : (
          <NotificationsNoneOutlinedIcon className="notification-icon" />
        )}
      </div>
      <div
        className={showNotifications ? "notifications-menu notifications-menu-in" : "display-none"}>
        <h3 className={showNotifications ? "notifications-menu-title-in" : "display-none"}>
          Notifications{" "}
          <span style={{ fontSize: "1.2rem", color: "grey", opacity: "0.7", marginLeft: "0.5rem" }}>
            {notifications.length}
          </span>
        </h3>

        {notifications.map((notif) => {
          return notif.type === "memberInvitation" ? (
            <div
              key={notif._id}
              className={
                showNotifications ? "notification-row-container notifcation-row-in" : "display-none"
              }>
              <span className="notification-content">{notif.content}</span>
              <div className="invite-notification-btns-container">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => dispatch(joinRoom(notif.roomId, notif._id))}>
                  Accept
                </Button>

                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => dispatch(deleteNotification(notif._id))}>
                  Decline
                </Button>
              </div>
            </div>
          ) : (
            <span>{notif.content}</span>
          );
        })}

        {!notifications.length ? (
          <span className="empty-notifications-msg notifcation-row-in">No notifications.</span>
        ) : null}
      </div>
    </>
  );
};

export default Notifications;
