import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import entitiesReducer from "./entitiesReducer";
import globalsReducer from "./globalsReducer";
export default combineReducers({
  auth: authReducer,
  globals: globalsReducer,
  entities: entitiesReducer,
});
