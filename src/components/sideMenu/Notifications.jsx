import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotifications } from "./../../store/reducers/authReducer";
import "../../styles/notifications.scss";
const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.auth.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <div
      className={
        notifications.length
          ? "notification-container active-notification"
          : "notification-container"
      }>
      {notifications.length ? <span className="red-notify-dot" /> : ""}

      {notifications.length ? (
        <NotificationsActiveOutlinedIcon className="notification-icon " />
      ) : (
        <NotificationsNoneOutlinedIcon className="notification-icon" />
      )}
    </div>
  );
};

export default Notifications;
