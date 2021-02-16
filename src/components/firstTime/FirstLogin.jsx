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
      <div className="first-login-content-container">
        {/* <div className="first-login-content-header">
          <h1>Welcome!</h1>

          <p>
            We have noticed that you havent created a room or got invited to a room yet.
            <br /> Click the button below to create a new room or wait for a friend to add you to
            their room.
          </p>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="create-room-btn"
          size="large"
          style={{ fontSize: "1.4rem" }}
          startIcon={<AddIcon />}
          onClick={() => {
            setCreateMode(true);
          }}>
          Create Room
        </Button> */}
        <CreateRoom />
      </div>
    </div>
  );
};

export default FirstLogin;
