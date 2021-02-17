import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./../constants/api";

const slice = createSlice({
  name: "room",
  initialState: { room: null },
  reducers: {
    roomCreated: (state, action) => {
      state.room = action.payload;
    },

    memberInvited: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const { roomCreated, memberInvited } = slice.actions;
export default slice.reducer;

// Action Creators

export const createRoom = (data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms`,
      method: "post",
      data,
      onSuccess: roomCreated.type,
    })
  );
};

export const inviteMember = (memberEmail) => (dispatch, getState) => {
  console.log(getState());
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms/${
        getState().entities.room.room._id
      }/members/${memberEmail}`,
      method: "post",
      data: {},
      onSuccess: memberInvited.type,
    })
  );
};
