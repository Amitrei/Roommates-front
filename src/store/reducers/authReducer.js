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

    userJoinedRoom: (state, action) => {
      state.user.roomId = action.payload;
    },

    nofiticationReceived: (state, action) => {
      action.payload instanceof Array
        ? state.notifications.push(...action.payload)
        : state.notifications.push(action.payload);
    },

    notificationDeleted: (state, action) => {
      const notificIndex = state.notifications.findIndex((notif) => notif._id === action.payload);
      state.notifications.splice(notificIndex, 1);
    },
  },
});

export const {
  userReceived,
  socketSent,
  nofiticationReceived,
  userJoinedRoom,
  notificationDeleted,
} = slice.actions;
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
  dispatch(socketSent());
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

export const deleteNotification = (notificationId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/notifications/${notificationId}`,
      method: "delete",
      onSuccess: notificationDeleted.type,
    })
  );
};
