import "../../styles/createRoom.scss";
import Button from "@material-ui/core/Button";
import Badge from "../Badge";
import Seperator from "./../Seperator";
import { createRoom } from "./../../store/reducers/roomReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const getRoom = useSelector((state) => state.entities.room.room);

  const handleRoomName = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="create-room-container">
      <div
        className={
          getRoom && getRoom.name ? "create-room-left-side side-disabled" : "create-room-left-side "
        }>
        <Badge number={1} />
        <h2 className="side-title">Enter your room name</h2>
        <input type="text" value={roomName} onChange={handleRoomName}></input>
        <Button
          variant="contained"
          color="primary"
          className="create-room-btn"
          size="large"
          onClick={() => dispatch(createRoom({ name: roomName }))}
          style={{ fontSize: "1.2rem" }}>
          Submit
        </Button>
      </div>

      <Seperator />

      <div
        className={
          getRoom && getRoom.name
            ? "create-room-right-side"
            : "create-room-right-side side-disabled"
        }>
        <Badge number={2} />

        <h2 className="side-title">Invite your roommates to the room</h2>
        <p className="create-room-add-members-p">Enter a valid user email</p>
        <input type="text"></input>
        <Button
          variant="contained"
          color="primary"
          className="create-room-btn"
          size="large"
          style={{ fontSize: "1.2rem" }}
          onClick={() => {
            console.log(getRoom);
          }}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateRoom;
