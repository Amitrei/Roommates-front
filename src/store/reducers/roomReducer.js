import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./../constants/api";

const slice = createSlice({
  name: "room",
  initialState: { room: null },
  reducers: {
    roomCreated: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const { roomCreated } = slice.actions;
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
