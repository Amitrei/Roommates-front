import { combineReducers } from "@reduxjs/toolkit";
import roomReducer from "./roomReducer";
export default combineReducers({
  room: roomReducer,
});
