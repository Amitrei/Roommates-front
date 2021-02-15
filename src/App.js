import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import "./styles/app.scss";
import { getUser } from "./store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth["user"]);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return <div className="App">{!user && <LandingPage />}</div>;
}

export default App;
