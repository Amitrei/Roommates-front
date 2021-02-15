import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middlewares/api";
import allReducers from "./reducers/combinedReducers";
export default configureStore({
  reducer: allReducers,
  middleware: [...getDefaultMiddleware(), api],
});
