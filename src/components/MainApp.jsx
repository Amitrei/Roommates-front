import FirstLogin from "./firstTime/FirstLogin";
import SideMenu from "./sideMenu/SideMenu";
import "react-toastify/dist/ReactToastify.css";
import "../styles/mainApp.scss";
import Dashboard from "./Dashboard";
import Notifications from "./sideMenu/Notifications";
import { Route, Redirect, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MyAccount from "./MyAccount";
import { AnimatePresence } from "framer-motion";
const MainApp = ({ location }) => {
  const user = useSelector((state) => state.auth["user"]);

  return (
    <Router>
      <div className="main-app">
        <SideMenu />
        <Notifications />
        <div className="app-content">
          <Route
            render={({ location }) => (
              <AnimatePresence initial={false} exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route
                    exact
                    path="/"
                    render={() => (user.roomId ? <Redirect to="/dashboard" /> : <FirstLogin />)}
                  />
                  <Route exact path="/my-account" render={() => <MyAccount />} />
                  <Route exact path="/dashboard" render={() => <Dashboard />} />
                  <Route
                    exact
                    path="/logout"
                    render={() =>
                      window.location.assign(
                        `${process.env.REACT_APP_API_MAIN_URL}/api/auth/logout`
                      )
                    }
                  />
                </Switch>
              </AnimatePresence>
            )}
          />
        </div>
      </div>
    </Router>
  );
};

export default MainApp;
