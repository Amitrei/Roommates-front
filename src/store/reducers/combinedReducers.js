import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import entitiesReducer from "./entitiesReducer";
export default combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
});
