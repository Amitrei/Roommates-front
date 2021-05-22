import "../../styles/createRoom.scss";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Badge from "../Badge";
import Seperator from "./../Seperator";
import Form from "./../inputs/Form";
import { createRoom } from "./../../store/reducers/roomReducer";
import { userJoinedRoom } from "./../../store/reducers/authReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateRoomName } from "./../inputs/validators/createRoomValidator";
import InviteMember from "./InviteMember";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import transition from "../../utils/transitionFramer";

const CreateRoom = () => {
  const history = useHistory();
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState({ createRoomForm: null });
  const dispatch = useDispatch();
  const getRoom = useSelector((state) => state.entities.room.room);

  const handleRoomName = (event) => {
    const { error } = validateRoomName(event.target.value);
    const updatedError = { ...error };
    if (error) {
      updatedError.createRoomForm = error.details[0].message;
      setError(updatedError);
    } else {
      updatedError.createRoomForm = null;
      setError(updatedError);
    }

    setRoomName(event.target.value);
  };

  const formsFields = {
    createRoomForm: [
      {
        value: roomName,
        onChange: handleRoomName,
        label: "Room name",
        error: error.createRoomForm,
      },
    ],
  };

  const handleGoDashboardClicked = () => {
    dispatch(userJoinedRoom(getRoom));
    history.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: [0.43, 0.6, 0.8, 0.96] },
      }}
      exit={{ opacity: 0 }}
      className="create-room-container">
      <div
        className={
          getRoom && getRoom.name ? "create-room-left-side side-disabled" : "create-room-left-side "
        }>
        <Badge number={1} />
        <h2 className="side-title">Enter your room name</h2>
        <Form
          fieldsArray={formsFields["createRoomForm"]}
          error={error.createRoomForm ? true : false}
          onSubmit={() => dispatch(createRoom({ name: roomName }))}
        />
      </div>

      <Seperator />

      <div
        className={
          getRoom && getRoom.name
            ? "create-room-right-side"
            : "create-room-right-side side-disabled"
        }>
        <Badge number={2} />

        <h2 className="side-title">Invite your roommates</h2>
        <InviteMember />
      </div>

      <div
        onClick={() => handleGoDashboardClicked()}
        className={
          getRoom && getRoom.name
            ? "go-to-dashboard-container"
            : "go-to-dashboard-container side-disabled"
        }>
        <NavigateNextIcon className="next-icon" />
      </div>
    </motion.div>
  );
};

export default CreateRoom;
