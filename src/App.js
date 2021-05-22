import React, { useEffect } from "react";
import { io } from "socket.io-client";
import LandingPage from "./components/LandingPage";
import { ToastContainer } from "react-toastify";
import "./styles/app.scss";
import { getUser, nofiticationReceived } from "./store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { setSocketId } from "./store/reducers/authReducer";
import MainApp from "./components/MainApp";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth["user"]);
  const isBlackOverlay = useSelector((state) => state.globals.renderBlackOverlay);
  let socket;
  useEffect(() => {
    dispatch(getUser());

    // Store the client socket Id on the server side to implement specific notifications
    socket = io("http://localhost:3002", {});
    socket.on("connect", () => {
      dispatch(setSocketId(socket?.id));
    });

    socket?.on("notificationRecieved", (notification) => {
      dispatch(nofiticationReceived(notification));
    });
    return () => {};
  }, []);

  return (
    <div className="app">
      <div
        className={
          isBlackOverlay ? "black-overlay black-overlay-in" : "black-overlay black-overlay-out"
        }></div>
      {user && user.email ? <MainApp /> : <LandingPage />}
      <ToastContainer />
    </div>
  );
}

export default App;
