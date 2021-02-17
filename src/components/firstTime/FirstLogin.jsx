import { useSelector } from "react-redux";
import "../../styles/firstLogin.scss";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import CreateRoom from "../createRoom/CreateRoom";

const FirstLogin = () => {
  const user = useSelector((state) => state.auth["user"]);
  const [createMode, setCreateMode] = useState(false);

  return (
    <div className="first-login-wrapper">
      <CreateRoom />
    </div>
  );
};

export default FirstLogin;
