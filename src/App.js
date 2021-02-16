import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import "./styles/app.scss";
import { getUser } from "./store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import MainApp from "./components/MainApp";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth["user"]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="app">
      {!user && <LandingPage />}
      {user && <MainApp user={user} />}
    </div>
  );
}

export default App;
