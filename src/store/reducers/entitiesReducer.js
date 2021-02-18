import { combineReducers } from "@reduxjs/toolkit";
import roomReducer from "./roomReducer";
import transactionsReducer from "./transactionsReducer";

export default combineReducers({
  room: roomReducer,
  // transactions: transactionsReducer,
});
