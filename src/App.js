import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import { ToastContainer } from "react-toastify";

import "./styles/app.scss";
import { getUser } from "./store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import MainApp from "./components/MainApp";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth["user"]);
  const isCreateTransaction = useSelector(
    (state) => state.entities.transactions.createTransaction.render
  );
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="app">
      <div
        className={
          isCreateTransaction ? "black-overlay black-overlay-in" : "black-overlay black-overlay-out"
        }></div>
      {user && user.email ? <MainApp user={user} /> : <LandingPage />}
      <ToastContainer />
    </div>
  );
}

export default App;
