import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./../constants/api";

const slice = createSlice({
  name: "Auth",
  initialState: { user: null },
  reducers: {
    userReceived: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userReceived } = slice.actions;
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
