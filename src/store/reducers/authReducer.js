import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./../constants/api";

const slice = createSlice({
  name: "Auth",
  initialState: { user: null, notifications: [] },
  reducers: {
    userReceived: (state, action) => {
      state.user = action.payload;
    },

    socketSent: (state, action) => {
      state.user.socketId = action.payload;
    },

    nofiticationReceived: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { userReceived, socketSent, nofiticationReceived } = slice.actions;
export default slice.reducer;

// Action Creators

export const getUser = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/auth/user`,
      method: "get",
      onSuccess: userReceived.type,
    })
  );
};

export const setSocketId = (socketId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/sockets`,
      method: "post",
      data: { socketId },
    })
  );
};
export const getNotifications = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/notifications`,
      method: "get",
      onSuccess: nofiticationReceived.type,
    })
  );
};
