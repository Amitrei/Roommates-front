import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "globals",
  initialState: { renderBlackOverlay: false },
  reducers: {
    renderBlackOverlay: (state, action) => {
      state.renderBlackOverlay = true;
    },
    unRenderBlackOverlay: (state, action) => {
      state.renderBlackOverlay = false;
    },
  },
});

export default slice.reducer;
export const { renderBlackOverlay, unRenderBlackOverlay } = slice.actions;
